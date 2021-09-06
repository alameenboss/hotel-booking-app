using System;
using System.Collections.Generic;
using System.Text;

namespace HotelBooking.API.DTO.Auth
{
	public class ExternalAuthDto
	{
		public string Provider { get; set; }
		public string IdToken { get; set; }
	}
}
