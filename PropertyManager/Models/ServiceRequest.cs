using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PropertyManager.Models
{
    public class ServiceRequest
    {
        public ServiceRequest()
        {
            RequestDate = DateTime.Now.Date;
        }

        public int Id { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public int ServiceId { get; set; }
        public virtual Service Service { get; set; }
    }
}