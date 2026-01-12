using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    [Table("Faults")]
    public class Fault
    {
        [Key]
        [Column("FaultId")]
        public int FaultId { get; set; }

        [Column("AssetId")]
        public int AssetId { get; set; }
        public virtual Asset? Asset { get; set; }

        [Column("ReportedByUserId")]
        public int ReportedByUserId { get; set; }
        public virtual User? Reporter { get; set; }

        [Column("AssignedToUserId")]
        public int? AssignedToUserId { get; set; }
        public virtual User? Technician { get; set; }

        [Column("Description")]
        public string Description { get; set; } = string.Empty;

        [Column("Severity")]
        public string Severity { get; set; } = "Low";

        [Column("Status")]
        public string Status { get; set; } = "Open";

        [Column("RootCauseNotes")]
        public string? RootCauseNotes { get; set; }

        [Column("Resolution")]
        public string? Resolution { get; set; }

        [Column("ReportedAt")]
        public DateTime ReportedAt { get; set; }

        [Column("ResolvedAt")]
        public DateTime? ResolvedAt { get; set; }
    }
}