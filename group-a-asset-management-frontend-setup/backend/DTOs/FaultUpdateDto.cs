namespace AssetFlow.Auth.DTOs
{
    public class FaultUpdateDto
    {
        public string? Status { get; set; }
        public int? AssignedToUserId { get; set; }
        public string? RootCauseNotes { get; set; }
        public string? Resolution { get; set; }
    }
}