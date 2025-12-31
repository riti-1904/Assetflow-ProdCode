using Microsoft.EntityFrameworkCore;
using SmartChatbot.Models;

namespace SmartChatbot.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) {}

        public DbSet<ChatKnowledge> ChatKnowledgeBase { get; set; }
    }
}
