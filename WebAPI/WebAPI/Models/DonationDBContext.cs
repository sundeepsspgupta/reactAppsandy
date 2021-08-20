using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class DonationDBContext : DbContext
    {
        public DonationDBContext(DbContextOptions<DonationDBContext> options) : base(options)
        {

        }

        public DbSet<DCandidate> DCandidates { get; set; }
        public DbSet<MortgageInfo> MortgageInfo { get; set; }

        public DbSet<Customer> Customer { get; set; }
    }

    public class Customer
    {
        public int ID { get; set; }
        public string Title { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Smoker { get; set; }

    }


}
