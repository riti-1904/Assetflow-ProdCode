using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AssetFlow.Auth.Models
{
    public class Asset
    {
        [Key]
        [Column("asset_id")]
        public int AssetId { get; set; }

        [Column("das_id")]
        public string DasId { get; set; }

        [Column("user_name")]
        public string UserName { get; set; }

        [Column("assets_location")]
        public string AssetsLocation { get; set; }

        [Column("make")]
        public string Make { get; set; }

        [Column("model")]
        public string Model { get; set; }

        [Column("laptop_category")]
        public string LaptopCategory { get; set; }

        [Column("laptop_assets_tag")]
        public string LaptopAssetsTag { get; set; }

        [Column("power_adapter_details")]
        public string PowerAdapterDetails { get; set; }

        [Column("assignment_date")]
        public DateTime? AssignmentDate { get; set; }

        [Column("install_status")]
        public string InstallStatus { get; set; }

        [Column("assets_status")]
        public string AssetsStatus { get; set; }

        [Column("additional_16gb_ram_status")]
        public string Additional16GbRamStatus { get; set; }

        [Column("assets_procure_status")]
        public string AssetsProcureStatus { get; set; }

        [Column("warranty_start_date")]
        public DateTime? WarrantyStartDate { get; set; }

        [Column("warranty_expired_date")]
        public DateTime? WarrantyExpiredDate { get; set; }

        [Column("ageing_of_assets")]
        public int? AgeingOfAssets { get; set; }

        public AssetTechnicalSpecification TechnicalSpecification { get; set; }
        public AssetAssignment Assignment { get; set; }
        public List<AssetMovementHistory> Movements { get; set; }
        public List<AssetMaintenanceHistory> MaintenanceHistory { get; set; }
        public List<Fault> Faults { get; set; }

    
    }
}
