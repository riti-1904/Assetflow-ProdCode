namespace SmartChatbot.Models
{
    public class ChatKnowledge
    {
        public int Id { get; set; }

        // User question pattern
        public string QuestionPattern { get; set; } = string.Empty;

        // Chatbot final response
        public string Answer { get; set; } = string.Empty;

        // Category / Intent (optional)
        public string Intent { get; set; } = string.Empty;
    }
}
