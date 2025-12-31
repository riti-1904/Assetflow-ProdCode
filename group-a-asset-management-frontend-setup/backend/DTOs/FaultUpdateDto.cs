namespace AssetFlow.Auth.DTOs
{
    public class FaultUpdateDto
    {
        public string Status { get; set; } = string.Empty;

        public int? AssignedToUserId { get; set; }

        // ✅ MUST MATCH CONTROLLER
        public string? RootCauseNotes { get; set; }

        public string? Resolution { get; set; }
    }
}
