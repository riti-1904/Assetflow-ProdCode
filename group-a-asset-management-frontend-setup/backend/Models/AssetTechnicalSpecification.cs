using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    [Table("AssetTechnicalSpecifications")]
    public class AssetTechnicalSpecification
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("asset_id")]
        public int AssetId { get; set; }

        [Column("processor")]
        public string Processor { get; set; }

        [Column("ram")]
        public string Ram { get; set; }

        [Column("storage")]
        public string Storage { get; set; }

        [Column("display")]
        public string Display { get; set; }

        [Column("gpu")]
        public string Gpu { get; set; }

        public Asset Asset { get; set; }
    }
}
