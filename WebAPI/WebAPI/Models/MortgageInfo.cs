using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class MortgageInfo
    {
        [Key]
        public int ID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string CustomerID { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string MortgageType { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Amount { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PaymentType { get; set; }

    }
}
