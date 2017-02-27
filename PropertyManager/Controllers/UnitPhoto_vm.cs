﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManager.Controllers
{
    public class UnitPhotoAdd
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int UnitNumber { get; set; }
    }

    public class UnitPhotoBase : UnitPhotoAdd
    {
        public int Id { get; set; }
        public byte[] Photo { get; set; }
        public string ContentType { get; set; }
    }

    public class UnitPhotoEdit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UnitNumber { get; set; }
    }
}