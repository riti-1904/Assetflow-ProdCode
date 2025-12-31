using SmartChatbot.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace SmartChatbot.Services
{
    public class ChatbotService
    {
        private readonly AppDbContext _db;

        public ChatbotService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<string> GetResponse(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
                return "Please type something — I am Assetbot and I am here to help 🙂";

            message = message.ToLower().Trim();

            // Try to match question pattern from DB
            var result = await _db.ChatKnowledgeBase
                .Where(x => message.Contains(x.QuestionPattern.ToLower()))
                .FirstOrDefaultAsync();

            if (result != null)
                return result.Answer;

            // Fallback response
            return "I am still learning. Please try asking about Assetflow modules, asset lifecycle, allocation, maintenance, or project details.";
        }
    }
}
