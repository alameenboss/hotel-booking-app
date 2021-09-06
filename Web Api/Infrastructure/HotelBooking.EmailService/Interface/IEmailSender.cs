using HotelBooking.EmailService.Model;
using System.Threading.Tasks;

namespace HotelBooking.EmailService.Interface
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
        Task SendEmailAsync(Message message);
    }
}
