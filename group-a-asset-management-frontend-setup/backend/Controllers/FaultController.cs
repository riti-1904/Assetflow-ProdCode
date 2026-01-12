using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetFlow.Auth.Data;
using AssetFlow.Auth.Models;
using AssetFlow.Auth.DTOs;

namespace AssetFlow.Auth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaultsController : ControllerBase
    {
        private readonly UserDbContext _context;

        public FaultsController(UserDbContext context)
        {
            _context = context;
        }

        // GET: api/faults
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetFaults()
        {
            try
            {
                var faults = await _context.Faults
                    .Include(f => f.Asset)
                    .Include(f => f.Reporter)
                    .Include(f => f.Technician)
                    .OrderByDescending(f => f.ReportedAt)
                    .ToListAsync();

                var response = faults.Select(f => new
                {
                    faultId = f.FaultId,
                    status = f.Status,
                    severity = f.Severity,
                    description = f.Description,
                    reportedAt = f.ReportedAt,
                    resolvedAt = f.ResolvedAt,
                    rootCauseNotes = f.RootCauseNotes,
                    resolution = f.Resolution,
                    asset = f.Asset != null ? new
                    {
                        assetId = f.Asset.AssetId,
                        assetTag = f.Asset.LaptopAssetsTag ?? f.Asset.DasId ?? "N/A",
                        assetName = $"{f.Asset.Make} {f.Asset.Model}".Trim()
                    } : null,
                    reporter = f.Reporter != null ? new
                    {
                        userId = f.Reporter.UserId,
                        name = f.Reporter.Name ?? "Unknown User"
                    } : null,
                    technician = f.Technician != null ? new
                    {
                        userId = f.Technician.UserId,
                        name = f.Technician.Name ?? "Unknown User"
                    } : null
                }).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving faults", error = ex.Message });
            }
        }

        // GET: api/faults/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetFault(int id)
        {
            try
            {
                var fault = await _context.Faults
                    .Include(f => f.Asset)
                    .Include(f => f.Reporter)
                    .Include(f => f.Technician)
                    .FirstOrDefaultAsync(f => f.FaultId == id);

                if (fault == null)
                {
                    return NotFound(new { message = "Fault not found" });
                }

                var response = new
                {
                    faultId = fault.FaultId,
                    status = fault.Status,
                    severity = fault.Severity,
                    description = fault.Description,
                    reportedAt = fault.ReportedAt,
                    resolvedAt = fault.ResolvedAt,
                    rootCauseNotes = fault.RootCauseNotes,
                    resolution = fault.Resolution,
                    asset = fault.Asset != null ? new
                    {
                        assetId = fault.Asset.AssetId,
                        assetTag = fault.Asset.LaptopAssetsTag ?? fault.Asset.DasId ?? "N/A",
                        assetName = $"{fault.Asset.Make} {fault.Asset.Model}".Trim(),
                        location = fault.Asset.AssetsLocation,
                        category = fault.Asset.LaptopCategory
                    } : null,
                    reporter = fault.Reporter != null ? new
                    {
                        userId = fault.Reporter.UserId,
                        name = fault.Reporter.Name ?? "Unknown User",
                        email = fault.Reporter.Email
                    } : null,
                    technician = fault.Technician != null ? new
                    {
                        userId = fault.Technician.UserId,
                        name = fault.Technician.Name ?? "Unknown User",
                        email = fault.Technician.Email
                    } : null
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving fault", error = ex.Message });
            }
        }

        // POST: api/faults
        [HttpPost]
        public async Task<ActionResult<object>> CreateFault([FromBody] FaultCreateDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var asset = await _context.Assets.FindAsync(dto.AssetId);
                if (asset == null)
                {
                    return BadRequest(new { message = "Asset not found" });
                }

                var reporter = await _context.Users.FindAsync(dto.ReportedByUserId);
                if (reporter == null)
                {
                    return BadRequest(new { message = "Reporter not found" });
                }

                var fault = new Fault
                {
                    AssetId = dto.AssetId,
                    ReportedByUserId = dto.ReportedByUserId,
                    Description = dto.Description,
                    Severity = dto.Severity,
                    Status = "Open",
                    ReportedAt = DateTime.UtcNow
                };

                _context.Faults.Add(fault);
                await _context.SaveChangesAsync();

                var response = new
                {
                    faultId = fault.FaultId,
                    status = fault.Status,
                    severity = fault.Severity,
                    description = fault.Description,
                    reportedAt = fault.ReportedAt
                };

                return CreatedAtAction(nameof(GetFault), new { id = fault.FaultId }, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating fault", error = ex.Message });
            }
        }

        // PUT: api/faults/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFault(int id, [FromBody] FaultUpdateDto dto)
        {
            try
            {
                var fault = await _context.Faults.FindAsync(id);
                if (fault == null)
                {
                    return NotFound(new { message = "Fault not found" });
                }

                if (!string.IsNullOrWhiteSpace(dto.Status))
                {
                    fault.Status = dto.Status;
                }

                if (dto.AssignedToUserId.HasValue)
                {
                    var technician = await _context.Users.FindAsync(dto.AssignedToUserId.Value);
                    if (technician == null)
                    {
                        return BadRequest(new { message = "Technician not found" });
                    }
                    fault.AssignedToUserId = dto.AssignedToUserId.Value;
                }

                if (!string.IsNullOrWhiteSpace(dto.RootCauseNotes))
                {
                    fault.RootCauseNotes = dto.RootCauseNotes;
                }

                if (!string.IsNullOrWhiteSpace(dto.Resolution))
                {
                    fault.Resolution = dto.Resolution;
                    fault.Status = "Resolved";
                    fault.ResolvedAt = DateTime.UtcNow;
                }

                _context.Faults.Update(fault);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Fault updated successfully", faultId = fault.FaultId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating fault", error = ex.Message });
            }
        }

        // DELETE: api/faults/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFault(int id)
        {
            try
            {
                var fault = await _context.Faults.FindAsync(id);
                if (fault == null)
                {
                    return NotFound(new { message = "Fault not found" });
                }

                _context.Faults.Remove(fault);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Fault deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting fault", error = ex.Message });
            }
        }
    }
}