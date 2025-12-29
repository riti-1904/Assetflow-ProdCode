using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    [Table("AssetMaintenanceHistories")]
    public class AssetMaintenanceHistory
    {
        [Key]
        [Column("maintenance_id")]
        public int MaintenanceId { get; set; }

        [Column("asset_id")]
        public int AssetId { get; set; }

        [Column("maintenance_type")]
        public string MaintenanceType { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("technician")]
        public string Technician { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("maintenance_date")]
        public DateTime? MaintenanceDate { get; set; }

        public Asset Asset { get; set; }
    }
}
