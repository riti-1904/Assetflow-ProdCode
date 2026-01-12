namespace AssetFlow.Auth.DTOs
{
    public class FaultCreateDto
    {
        public int AssetId { get; set; }
        public int ReportedByUserId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Severity { get; set; } = "Low";
    }
}