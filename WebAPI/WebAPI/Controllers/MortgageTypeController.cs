using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MortgageTypeController : Controller
    {
        private readonly DonationDBContext _context;

        public MortgageTypeController(DonationDBContext context)
        {
            _context = context;
        }

        // GET: api/DCandidate
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MortgageType>>> GetMortgageType()
        {
            return await _context.MortgageType.ToListAsync();
        }
    }
}
