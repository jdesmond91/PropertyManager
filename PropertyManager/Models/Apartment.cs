using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PropertyManager.Models
{
    public class Apartment
    {
        [Key]
        public int ApartmentNumber { get; set; }
        public int FloorNumber { get; set; }
        public int UnitId { get; set; }
        public virtual Unit Unit { get; set; }
        public string ApartmentSide { get; set; }
        
    }
}