using HotelBooking.Data.Repository.Contracts;
using HotelBooking.Web.Common.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace HotelBooking.API.Controllers
{
    [Authorize]
    public class WeatherForecastController : DefaultBaseController
    {
        private readonly IRepositoryManager _repository;

        public WeatherForecastController(IRepositoryManager repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            //_repository.Company.AnyMethodFromCompanyRepository();
            //_repository.Employee.AnyMethodFromEmployeeRepository();

            return new string[] { "value1", "value2" };
        }
    }
}