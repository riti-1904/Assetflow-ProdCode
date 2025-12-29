using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    public class User
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("role")]
        public string Role { get; set; }

        [Column("azure_ad_id")]
        public string AzureAdId { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
    }
}
