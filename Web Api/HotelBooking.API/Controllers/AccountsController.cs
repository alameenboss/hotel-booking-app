using AutoMapper;
using HotelBooking.API.DTO.Auth;
using HotelBooking.API.JwtFeatures;
using HotelBooking.EmailService.Interface;
using HotelBooking.EmailService.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.API.Controllers
{
    [Route("api/accounts")]
	[ApiController]
	public class AccountsController : ControllerBase
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly IMapper _mapper;
		private readonly JwtHandler _jwtHandler;
		private readonly IEmailSender _emailSender;

		public AccountsController(UserManager<IdentityUser> userManager, IMapper mapper, JwtHandler jwtHandler, IEmailSender emailSender)
		{
			_userManager = userManager;
			_mapper = mapper;
			_jwtHandler = jwtHandler;
			_emailSender = emailSender;
		}

		[HttpPost("Registration")]
		public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
		{
			if (userForRegistration == null || !ModelState.IsValid)
				return BadRequest();

			var user = _mapper.Map<IdentityUser>(userForRegistration);

			var result = await _userManager.CreateAsync(user, userForRegistration.Password);
			if (!result.Succeeded)
			{
				var errors = result.Errors.Select(e => e.Description);

				return BadRequest(new RegistrationResponseDto { Errors = errors });
			}
			await _userManager.AddToRoleAsync(user, "Member");
			var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
			var param = new Dictionary<string, string>
			{
				{"token", token },
				{"email", user.Email }
			};

			var callback = QueryHelpers.AddQueryString(userForRegistration.ClientURI, param);

			var message = new Message(new string[] { "" }, "Email Confirmation token", callback, null);
			await _emailSender.SendEmailAsync(message);

			

			return StatusCode(201);
		}

		[HttpPost("Login")]
		public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
		{
			var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
			if (user == null)
				return BadRequest("Invalid Request");

			if (!await _userManager.IsEmailConfirmedAsync(user))
				return Unauthorized(new AuthResponseDto { ErrorMessage = "Email is not confirmed" });

			//you can check here if the account is locked out in case the user enters valid credentials after locking the account.

			if (!await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
			{
				await _userManager.AccessFailedAsync(user);

				if (await _userManager.IsLockedOutAsync(user))
				{
					var content = $"Your account is locked out. To reset the password click this link: {userForAuthentication.ClientURI}";
					var message = new Message(new string[] { userForAuthentication.Email }, "Locked out account information", content, null);
					await _emailSender.SendEmailAsync(message);

					return Unauthorized(new AuthResponseDto { ErrorMessage = "The account is locked out" });
				}

				return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
			}

			if (await _userManager.GetTwoFactorEnabledAsync(user))
				return await GenerateOTPFor2StepVerification(user);

			var token = await _jwtHandler.GenerateToken(user);

			await _userManager.ResetAccessFailedCountAsync(user);

			return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
		}

		private async Task<IActionResult> GenerateOTPFor2StepVerification(IdentityUser user)
		{
			var providers = await _userManager.GetValidTwoFactorProvidersAsync(user);
			if (!providers.Contains("Email"))
			{
				return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid 2-Step Verification Provider." });
			}

			var token = await _userManager.GenerateTwoFactorTokenAsync(user, "Email");
			var message = new Message(new string[] { user.Email }, "Authentication token", token, null);
			await _emailSender.SendEmailAsync(message);

			return Ok(new AuthResponseDto { Is2StepVerificationRequired = true, Provider = "Email" });
		}

		[HttpPost("TwoStepVerification")]
		public async Task<IActionResult> TwoStepVerification([FromBody] TwoFactorDto twoFactorDto)
		{
			if (!ModelState.IsValid)
				return BadRequest();

			var user = await _userManager.FindByEmailAsync(twoFactorDto.Email);
			if (user == null)
				return BadRequest("Invalid Request");

			var validVerification = await _userManager.VerifyTwoFactorTokenAsync(user, twoFactorDto.Provider, twoFactorDto.Token);
			if (!validVerification)
				return BadRequest("Invalid Token Verification");

			var token = await _jwtHandler.GenerateToken(user);
			return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
		}

		[HttpPost("ForgotPassword")]
		public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
		{
			if (!ModelState.IsValid)
				return BadRequest();

			var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
			if (user == null)
				return BadRequest("Invalid Request");

			var token = await _userManager.GeneratePasswordResetTokenAsync(user);
			var param = new Dictionary<string, string>
			{
				{"token", token },
				{"email", forgotPasswordDto.Email }
			};

			var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);

			var message = new Message(new string[] { "" }, "Reset password token", callback, null);
			await _emailSender.SendEmailAsync(message);

			return Ok();
		}

		[HttpPost("ResetPassword")]
		public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
		{
			if (!ModelState.IsValid)
				return BadRequest();

			var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
			if (user == null)
				return BadRequest("Invalid Request");

			var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
			if (!resetPassResult.Succeeded)
			{
				var errors = resetPassResult.Errors.Select(e => e.Description);

				return BadRequest(new { Errors = errors });
			}

			await _userManager.SetLockoutEndDateAsync(user, new DateTime(2000, 1, 1));

			return Ok();
		}

		[HttpGet("EmailConfirmation")]
		public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
		{
			var user = await _userManager.FindByEmailAsync(email);
			if (user == null)
				return BadRequest("Invalid Email Confirmation Request");

			var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
			if (!confirmResult.Succeeded)
				return BadRequest("Invalid Email Confirmation Request");

			return Ok();
		}

		[HttpPost("ExternalLogin")]
		public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
		{
			var payload = await _jwtHandler.VerifyGoogleToken(externalAuth);
			if (payload == null)
				return BadRequest("Invalid External Authentication.");

			var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

			var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
			if (user == null)
			{
				user = await _userManager.FindByEmailAsync(payload.Email);

				if (user == null)
				{
					user = new IdentityUser { Email = payload.Email, UserName = payload.Email };
					await _userManager.CreateAsync(user);

					//prepare and send an email for the email confirmation

					await _userManager.AddToRoleAsync(user, "Member");
					await _userManager.AddLoginAsync(user, info);
				}
				else
				{
					await _userManager.AddLoginAsync(user, info);
				}
			}

			if (user == null)
				return BadRequest("Invalid External Authentication.");

			//check for the Locked out account

			var token = await _jwtHandler.GenerateToken(user);
			return Ok(new AuthResponseDto { Token = token, IsAuthSuccessful = true });
		}


		}
}
