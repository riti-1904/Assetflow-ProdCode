using Microsoft.AspNetCore.Mvc;
using SmartChatbot.Models;
using SmartChatbot.Services;
using System.Threading.Tasks;

namespace SmartChatbot.Controllers
{
    [ApiController]
    [Route("api/chatbot")]
    public class ChatbotController : ControllerBase
    {
        private readonly ChatbotService _chatbot;

        public ChatbotController(ChatbotService chatbot)
        {
            _chatbot = chatbot;
        }

        // Make the action async
        [HttpPost("ask")]
        public async Task<ActionResult<ChatResponse>> Ask(ChatRequest request)
        {
            // Await the async service method
            var reply = await _chatbot.GetResponse(request.Message);

            return Ok(new ChatResponse
            {
                Reply = reply,
                BotName = "Assetbot"
            });
        }
    }
}
