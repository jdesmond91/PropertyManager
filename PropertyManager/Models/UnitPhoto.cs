﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManager.Models
{
    public class UnitPhoto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Photo { get; set; }
        public string ContentType { get; set; }
        public int UnitNumber { get; set; }
        public virtual Unit Unit { get; set; }
    }
}