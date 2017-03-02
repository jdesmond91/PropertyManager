﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PropertyManager.Models
{
    public class Facility
    {
        public int Id { get; set; }
        public string FacilityName { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }

        [DisplayFormat(DataFormatString = "{0:t}")]
        public DateTime? OpenTime { get; set; }

        [DisplayFormat(DataFormatString = "{0:t}")]
        public DateTime? CloseTime { get; set; }
    }
}