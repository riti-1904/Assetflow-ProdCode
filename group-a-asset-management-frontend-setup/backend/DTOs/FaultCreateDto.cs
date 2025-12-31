namespace AssetFlow.Auth.DTOs
{
    public class FaultCreateDto
    {
        public int AssetId { get; set; }
        public int ReportedByUserId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Severity { get; set; } = "Low";
        public string Type { get; set; } = "Other";
        public string Location { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public DateTime SlaDueAt { get; set; }
        public int? AssignedToUserId { get; set; }
    }
}
