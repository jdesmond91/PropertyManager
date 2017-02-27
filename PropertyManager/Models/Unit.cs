using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PropertyManager.Models
{
    public class Unit
    {
        public Unit()
        {
            UnitPhotos = new List<UnitPhoto>();
        }
        
        [Key]
        public int UnitNumber { get; set; }
        public string Status { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public double SquareFeet { get; set; }
        public int MaxOccupants { get; set; }
        public bool Balcony { get; set; }
        public bool Dishwasher { get; set; }
        public bool Laundry { get; set; }
        public virtual ICollection<UnitPhoto> UnitPhotos { get; set; }

    }
}