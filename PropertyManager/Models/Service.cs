﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManager.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}