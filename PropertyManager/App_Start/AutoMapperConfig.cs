using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;


namespace PropertyManager.App_Start
{
    public static class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            // Disable AutoMapper v4.2.x warnings
#pragma warning disable CS0618


#pragma warning restore CS0618
        }
    }
}