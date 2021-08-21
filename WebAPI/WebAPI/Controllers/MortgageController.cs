using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MortgageController : ControllerBase
    {
        private readonly DonationDBContext _context;

        public MortgageController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/DCandidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MortgageInfo>>> GetDCandidates()
        {
            return await _context.MortgageInfo.ToListAsync();
        }

        // GET: api/DCandidate/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MortgageInfo>> GetDCandidate(int id)
        {
            var dCandidate = await _context.MortgageInfo.FindAsync(id);

            if (dCandidate == null)
            {
                return NotFound();
            }

            return dCandidate;
        }

        // PUT: api/DCandidate/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDCandidate(int id, MortgageInfo mortgageInfo)
        {
            mortgageInfo.ID = id;

            _context.Entry(mortgageInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DCandidateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DCandidate
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<MortgageInfo>> PostDCandidate(MortgageInfo mortgageInfo)
        {
            _context.MortgageInfo.Add(mortgageInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDCandidate", new { id = mortgageInfo.ID }, mortgageInfo);
        }

        // DELETE: api/DCandidate/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MortgageInfo>> DeleteDCandidate(int id)
        {
            var dCandidate = await _context.MortgageInfo.FindAsync(id);
            if (dCandidate == null)
            {
                return NotFound();
            }

            _context.MortgageInfo.Remove(dCandidate);
            await _context.SaveChangesAsync();

            return dCandidate;
        }

        private bool DCandidateExists(int id)
        {
            return _context.MortgageInfo.Any(e => e.ID == id);
        }
    }
}
