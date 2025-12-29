using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    [Table("AssetAssignments")]
    public class AssetAssignment
    {
        [Key]
        [Column("assignment_id")]
        public int AssignmentId { get; set; }

        [Column("asset_id")]
        public int AssetId { get; set; }

        [Column("current_location")]
        public string CurrentLocation { get; set; }

        [Column("department")]
        public string Department { get; set; }

        [Column("owner")]
        public string Owner { get; set; }

        [Column("custodian")]
        public string Custodian { get; set; }

        public Asset Asset { get; set; }
    }
}
