using HotelBooking.API.DTO.Company;
using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Web.Common.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HotelBooking.API.Controllers
{
    [Authorize]
    public class CompanyController : DefaultBaseController
    {
        private readonly IRepositoryManager _repository;

        public CompanyController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        //[Authorize]
        [HttpGet]
        public IActionResult GetCompanies()
        {
            try
            {
                //var claims = User.Claims;

                var companies = _repository.Company.GetAllCompanies(trackChanges: false);

                var companiesDto = _mapper.Map<IEnumerable<CompanyDto>>(companies);

                return Ok(companiesDto);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong in the {nameof(GetCompanies)} action {ex}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("Privacy")]
        [Authorize(Roles = "Administrator")]
        public IActionResult Privacy()
        {
            var claims = User.Claims
                .Select(c => new { c.Type, c.Value })
                .ToList();

            return Ok(claims);
        }
    }
}