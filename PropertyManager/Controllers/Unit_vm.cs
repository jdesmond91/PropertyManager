using PropertyManager.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PropertyManager.Controllers
{
    public class UnitAdd
    {
        public string Status { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public double SquareFeet { get; set; }
        public int MaxOccupants { get; set; }
        public bool Balcony { get; set; }
        public bool Dishwasher { get; set; }
        public bool Laundry { get; set; }
    }

    public class UnitBase : UnitAdd
    {       
        [Key]
        public int UnitNumber { get; set; }
    }

    public class UnitWithPhotos : UnitBase
    {     
        public ICollection<UnitPhotoBase> UnitPhotos { get; set; }
    }

    public class UnitEdit
    {
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
    }
}