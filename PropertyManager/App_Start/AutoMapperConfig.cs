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
            //Announcement
            Mapper.CreateMap<Controllers.AnnouncementAdd, Models.Announcement>();
            Mapper.CreateMap<Models.Announcement, Controllers.AnnouncementBase>();

            //Facility
            Mapper.CreateMap<Controllers.FacilityAdd, Models.Facility>();
            Mapper.CreateMap<Models.Facility, Controllers.FacilityBase>();

            //Service
            Mapper.CreateMap<Controllers.ServiceAdd, Models.Service>();
            Mapper.CreateMap<Models.Service, Controllers.ServiceBase>();

            //Unit
            Mapper.CreateMap<Controllers.UnitAdd, Models.Unit>();
            Mapper.CreateMap<Models.Unit, Controllers.UnitBase>();
            Mapper.CreateMap<Models.Unit, Controllers.UnitWithPhotos>();

            //UnitPhoto
            Mapper.CreateMap<Controllers.UnitPhotoAdd, Models.UnitPhoto>();
            Mapper.CreateMap<Models.UnitPhoto, Controllers.UnitPhotoBase>();

            // Disable AutoMapper v4.2.x warnings
#pragma warning disable CS0618


#pragma warning restore CS0618
        }
    }
}