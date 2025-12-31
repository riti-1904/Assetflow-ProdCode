using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    public class Fault
    {
        [Key]
        public int FaultId { get; set; }

        [Required]
        public int AssetId { get; set; }

        [Required]
        public int ReportedByUserId { get; set; }

        public int? AssignedToUserId { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string Severity { get; set; } = "Low";

        [Required]
        public string Status { get; set; } = "New";

        public DateTime ReportedAt { get; set; } = DateTime.UtcNow;

        public DateTime? ResolvedAt { get; set; }

        public string? RootCauseNotes { get; set; }

        public string? Resolution { get; set; }

        // Navigation
        public Asset Asset { get; set; }
        public User Reporter { get; set; }
        public User? Technician { get; set; }
    }
}
