using AutoMapper;
using HotelBooking.LoggerService.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace HotelBooking.Web.Common.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultBaseController : ControllerBase
    {
        private IMapper _mapperInstance;
        private ILoggerManager _loggerInstance;
        protected IMapper _mapper => _mapperInstance ??= HttpContext.RequestServices.GetService<IMapper>();
        protected ILoggerManager _logger => _loggerInstance ??= HttpContext.RequestServices.GetService<ILoggerManager>();
    }
}
