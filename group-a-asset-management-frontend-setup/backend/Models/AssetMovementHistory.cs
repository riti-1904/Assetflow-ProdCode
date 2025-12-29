using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    [Table("AssetMovementHistories")]
    public class AssetMovementHistory
    {
        [Key]
        [Column("movement_id")]
        public int MovementId { get; set; }

        [Column("asset_id")]
        public int AssetId { get; set; }

        [Column("movement_type")]
        public string MovementType { get; set; }

        [Column("from_location")]
        public string FromLocation { get; set; }

        [Column("to_location")]
        public string ToLocation { get; set; }

        [Column("moved_by")]
        public string MovedBy { get; set; }

        [Column("movement_date")]
        public DateTime? MovementDate { get; set; }

        public Asset Asset { get; set; }
    }
}
