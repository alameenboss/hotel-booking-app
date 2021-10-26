namespace HotelBooking.API.DTO.Auth
{
    public class ExternalAuthDto
    {
        public string Provider { get; set; }
        public string IdToken { get; set; }
    }
}