﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManager.Controllers
{
    public class ServiceAdd
    {
        public string ServiceName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }

    public class ServiceBase : ServiceAdd
    {
        public int Id { get; set; }
    }

    public class ServiceEdit
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}