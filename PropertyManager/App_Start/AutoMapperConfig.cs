﻿using System;
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
            //Announcement
            Mapper.CreateMap<Controllers.AnnouncementAdd, Models.Announcement>();
            Mapper.CreateMap<Models.Announcement, Controllers.AnnouncementBase>();
            Mapper.CreateMap<Controllers.AnnouncementEdit, Controllers.AnnouncementBase>();

            //Employee
            Mapper.CreateMap<Controllers.EmployeeAdd, Models.Employee>();
            Mapper.CreateMap<Models.Employee, Controllers.EmployeeBase>();
            Mapper.CreateMap<Controllers.EmployeeEdit, Controllers.EmployeeBase>();

            //Inventory
            Mapper.CreateMap<Controllers.InventoryAdd, Models.Inventory>();
            Mapper.CreateMap<Models.Inventory, Controllers.InventoryBase>();
            Mapper.CreateMap<Controllers.InventoryEdit, Controllers.InventoryBase>();

            //Facility
            Mapper.CreateMap<Controllers.FacilityAdd, Models.Facility>();
            Mapper.CreateMap<Models.Facility, Controllers.FacilityBase>();
            Mapper.CreateMap<Controllers.FacilityEdit, Controllers.FacilityBase>();

            //Service
            Mapper.CreateMap<Controllers.ServiceAdd, Models.Service>();
            Mapper.CreateMap<Models.Service, Controllers.ServiceBase>();
            Mapper.CreateMap<Models.Service, Controllers.ServiceWithServiceRequests>();
            Mapper.CreateMap<Controllers.ServiceEdit, Controllers.ServiceBase>();

            //Service Request
            Mapper.CreateMap<Models.ServiceRequest, Controllers.ServiceRequestBase>();
            Mapper.CreateMap<Models.ServiceRequest, Controllers.ServiceRequestWithService>();
            Mapper.CreateMap<Controllers.ServiceRequestAdd, Models.ServiceRequest>();
            Mapper.CreateMap<Controllers.ServiceRequestEdit, Controllers.ServiceRequestBase>();

            //Unit
            Mapper.CreateMap<Controllers.UnitAdd, Models.Unit>();
            Mapper.CreateMap<Models.Unit, Controllers.UnitBase>();
            Mapper.CreateMap<Controllers.UnitEdit, Controllers.UnitBase>();

            //UnitPhoto
            Mapper.CreateMap<Controllers.UnitPhotoAdd, Models.UnitPhoto>();
            Mapper.CreateMap<Models.UnitPhoto, Controllers.UnitPhotoBase>();
            Mapper.CreateMap<Models.UnitPhoto, Controllers.UnitPhotoWithMedia>();

            //Apartment
            Mapper.CreateMap<Controllers.ApartmentAdd, Models.Apartment>();
            Mapper.CreateMap<Models.Apartment, Controllers.ApartmentBase>();
            Mapper.CreateMap<Controllers.ApartmentEdit, Controllers.ApartmentBase>();

            //Tenant
            Mapper.CreateMap<Controllers.TenantAdd, Models.Tenant>();
            Mapper.CreateMap<Models.Tenant, Controllers.TenantBase>();
            Mapper.CreateMap<Controllers.TenantEdit, Controllers.TenantBase>();

            //Lease
            Mapper.CreateMap<Models.Lease, Controllers.LeaseBase>();
            Mapper.CreateMap<Models.Lease, Controllers.LeaseWithInformation>();
            Mapper.CreateMap<Controllers.LeaseAdd, Models.Lease>();
            Mapper.CreateMap<Controllers.LeaseEdit, Controllers.LeaseBase>();

#pragma warning restore CS0618
        }
    }
}