using AssetFlow.Auth.Data;
using AssetFlow.Auth.DTOs;
using AssetFlow.Auth.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AssetFlow.Auth.Controllers
{
    [ApiController]
    [Route("api/faults")]
    public class FaultsController : ControllerBase
    {
        private readonly UserDbContext _context;

        public FaultsController(UserDbContext context)
        {
            _context = context;
        }

        // GET ALL
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var faults = await _context.Faults
                .Include(f => f.Asset)
                .Include(f => f.Reporter)
                .Include(f => f.Technician)
                .OrderByDescending(f => f.ReportedAt)
                .ToListAsync();

            return Ok(faults);
        }

        // GET BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var fault = await _context.Faults
                .Include(f => f.Asset)
                .Include(f => f.Reporter)
                .Include(f => f.Technician)
                .FirstOrDefaultAsync(f => f.FaultId == id);

            if (fault == null) return NotFound();
            return Ok(fault);
        }

        // CREATE
        [HttpPost]
        public async Task<IActionResult> Create(FaultCreateDto dto)
        {
            var fault = new Fault
            {
                AssetId = dto.AssetId,
                ReportedByUserId = dto.ReportedByUserId,
                Description = dto.Description,
                Severity = dto.Severity,
                Status = "New"
            };

            _context.Faults.Add(fault);
            await _context.SaveChangesAsync();

            return Ok(fault);
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, FaultUpdateDto dto)
        {
            var fault = await _context.Faults.FindAsync(id);
            if (fault == null) return NotFound();

            fault.Status = dto.Status;
            fault.AssignedToUserId = dto.AssignedToUserId;
            fault.RootCauseNotes = dto.RootCauseNotes;
            fault.Resolution = dto.Resolution;

            if (dto.Status == "Resolved")
                fault.ResolvedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(fault);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var fault = await _context.Faults.FindAsync(id);
            if (fault == null) return NotFound();

            _context.Faults.Remove(fault);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
