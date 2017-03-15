using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManager.Controllers
{
    public class LeaseAdd
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double SecurityDeposit { get; set; }
        public double MonthlyRent { get; set; }
        public int Terms { get; set; }
        public int ApartmentId { get; set; }
        public int TenantId { get; set; }

    }

    public class LeaseBase : LeaseAdd
    {
        public int Id { get; set; }
    }

    public class LeaseEdit
    {
        public int Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double SecurityDeposit { get; set; }
        public double MonthlyRent { get; set; }
        public int Terms { get; set; }
    }

    public class LeaseWithInformation : LeaseBase
    {
        public ApartmentBase Apartment { get; set; }
        public TenantBase Tenant { get; set; }
    }
}