﻿using AutoMapper;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using PropertyManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class Manager
    {
        private ApplicationDbContext ds = new ApplicationDbContext();

        public UserBase getByEmail(string email)
        {
            // Attempt to fetch the object
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();

            // Attempt to locate the object
            var user = userManager.FindByEmailAsync(email).Result;

            return (user == null) ? null : Mapper.Map<UserBase>(user);

        }

        // ****************************************** ANNOUNCEMENT SECTION *****************************************

        public IEnumerable<AnnouncementBase> AnnouncementGetAll()
        {
            var c = ds.Announcements.OrderBy(a => a.Title);

            return Mapper.Map<IEnumerable<AnnouncementBase>>(c);
        }

        public AnnouncementBase AnnouncementGetById(int id)
        {
            var c = ds.Announcements.SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<AnnouncementBase>(c);
        }

        public AnnouncementBase AnnouncementAdd(AnnouncementAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }            
            var addedItem = ds.Announcements.Add(Mapper.Map<Announcement>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<AnnouncementBase>(addedItem);
        }

        public AnnouncementBase AnnouncementEdit(AnnouncementEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Announcements.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<AnnouncementBase>(storedItem);
            }
        }

        public void AnnouncementDelete(int id)
        {
            var storedItem = ds.Announcements.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Announcements.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        // ****************************************** EMPLOYEEE SECTION *****************************************

        public IEnumerable<EmployeeBase> EmployeeGetAll()
        {
            var c = ds.Employees.OrderBy(a => a.Title);

            return Mapper.Map<IEnumerable<EmployeeBase>>(c);
        }

        public EmployeeBase EmployeeGetById(int id)
        {
            var c = ds.Employees.SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<EmployeeBase>(c);
        }

        public EmployeeBase EmployeeAdd(EmployeeAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            var addedItem = ds.Employees.Add(Mapper.Map<Employee>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<EmployeeBase>(addedItem);
        }

        public EmployeeBase EmployeeEdit(EmployeeEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Employees.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<EmployeeBase>(storedItem);
            }
        }

        public void EmployeeDelete(int id)
        {
            var storedItem = ds.Employees.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Employees.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        // *************************************************** INVENTORY SECTION *****************************************
        public IEnumerable<InventoryBase> InventoryGetAll()
        {
            var c = ds.Inventory.OrderBy(a => a.Id);

            return Mapper.Map<IEnumerable<InventoryBase>>(c);
        }

        public InventoryBase InventoryGetById(int id)
        {
            var c = ds.Inventory.SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<InventoryBase>(c);
        }

        public InventoryBase InventoryAdd(InventoryAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            var addedItem = ds.Inventory.Add(Mapper.Map<Inventory>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<InventoryBase>(addedItem);
        }

        public InventoryBase InventoryEdit(InventoryEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Inventory.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<InventoryBase>(storedItem);
            }
        }

        public void InventoryDelete(int id)
        {
            var storedItem = ds.Inventory.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Inventory.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        // *************************************************** FACILITY SECTION *****************************************

        public IEnumerable<FacilityBase> FacilityGetAll()
        {
            var c = ds.Facilities.OrderBy(a => a.FacilityName);

            return Mapper.Map<IEnumerable<FacilityBase>>(c);
        }

        public FacilityBase FacilityGetById(int id)
        {
            var c = ds.Facilities.SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<FacilityBase>(c);
        }

        public FacilityBase FacilityAdd(FacilityAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }          
            var addedItem = ds.Facilities.Add(Mapper.Map<Facility>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<FacilityBase>(addedItem);
        }

        public FacilityBase FacilityEdit(FacilityEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Facilities.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<FacilityBase>(storedItem);
            }
        }
        public void FacilityDelete(int id)
        {
            var storedItem = ds.Facilities.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Facilities.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        //**************************************** FACILITY BOOKING *****************************************************

        public IEnumerable<FacilityBookingBase> FacilityBookingGetAllWithFacility()
        {
            var s = ds.FacilityBookings.Include("Facility").OrderBy(j => j.Id);
            return Mapper.Map<IEnumerable<FacilityBookingBase>>(s);
        }

        public FacilityBookingBase FacilityBookingGetByIdWithFacility(int id)
        {
            var o = ds.FacilityBookings.Include("Facility").SingleOrDefault(j => j.Id == id);
            return (o == null) ? null : Mapper.Map<FacilityBookingBase>(o);
        }

        public FacilityBookingBase FacilityBookingAdd(FacilityBookingAdd newItem)
        {
            // Ensure that we can continue
            if (newItem == null)
            {
                return null;
            }
            else
            {
                // Must validate the associated object
                var associatedItem = ds.Facilities.Find(newItem.FacilityId);
                if (associatedItem == null)
                {
                    return null;
                }

                // Add the new object

                // Build the FacilityBooking object
                FacilityBooking addedItem = Mapper.Map<FacilityBooking>(newItem);

                // Set its associated item identifier
                addedItem.Facility = associatedItem;

                ds.FacilityBookings.Add(addedItem);
                ds.SaveChanges();

                // Return the object
                return Mapper.Map<FacilityBookingBase>(addedItem);
            }
        }

        public FacilityBookingBase FacilityBookingEdit(FacilityBookingEdit editedItem)
        {
            // Ensure that we can continue
            if (editedItem == null)
            {
                return null;
            }

            // Attempt to fetch the underlying object
            var storedItem = ds.FacilityBookings.Find(editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                // Fetch the object from the data store - ds.Entry(storedItem)
                // Get its current values collection - .CurrentValues
                // Set those to the edited values - .SetValues(editedItem)
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                // The SetValues() method ignores missing properties and navigation properties
                ds.SaveChanges();

                return Mapper.Map<FacilityBookingBase>(storedItem);
            }
        }

        public void FacilityBookingDelete(int id)
        {
            // Attempt to fetch the existing item
            var storedItem = ds.FacilityBookings.Find(id);

            // Interim coding strategy...

            if (storedItem == null)
            {
                // Throw an exception
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    // If this fails, throw an exception (as above)
                    // This implementation just prevents an error from bubbling up

                    ds.FacilityBookings.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        //**************************************** SERVICE SECTION ******************************************************

        public IEnumerable<ServiceBase> ServiceGetAll()
        {
            var c = ds.Services.OrderBy(a => a.ServiceName);

            return Mapper.Map<IEnumerable<ServiceBase>>(c);
        }

        public ServiceBase ServiceGetById(int id)
        {
            var c = ds.Services.SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<ServiceBase>(c);
        }

        public ServiceWithServiceRequests ServiceGetByIdWithServiceRequests(int id)
        {
            var o = ds.Services.Include("ServiceRequests").SingleOrDefault(j => j.Id == id);

            return (o == null) ? null : Mapper.Map<ServiceWithServiceRequests>(o);
        }

        public ServiceBase ServiceAdd(ServiceAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            var addedItem = ds.Services.Add(Mapper.Map<Service>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<ServiceBase>(addedItem);
        }
        public ServiceBase ServiceEdit(ServiceEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Services.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<ServiceBase>(storedItem);
            }
        }

        public void ServiceDelete(int id)
        {
            var storedItem = ds.Services.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Services.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        //**************************************** SERVICE REQUEST SECTION ***********************************************

        public IEnumerable<ServiceRequestBase> ServiceRequestGetAll()
        {
            var s = ds.ServiceRequests.OrderBy(a => a.Id);
            return Mapper.Map<IEnumerable<ServiceRequestBase>>(s);
        }

        public IEnumerable<ServiceRequestWithService> ServiceRequestGetAllWithService()
        {
            var s = ds.ServiceRequests.Include("Service").OrderBy(j => j.Id);
            return Mapper.Map<IEnumerable<ServiceRequestWithService>>(s);
        }

        public ServiceRequestWithService ServiceRequestGetByIdWithService(int id)
        {
            var o = ds.ServiceRequests.Include("Service").SingleOrDefault(j => j.Id == id);
            return (o == null) ? null : Mapper.Map<ServiceRequestWithService>(o);
        }

        public ServiceRequestBase ServiceRequestAdd(ServiceRequestAdd newItem)
        {
            // Ensure that we can continue
            if (newItem == null)
            {
                return null;
            }
            else
            {
                // Must validate the associated object
                var associatedItem = ds.Services.Find(newItem.ServiceId);
                if (associatedItem == null)
                {
                    return null;
                }

                // Add the new object

                // Build the ServiceRequest object
                ServiceRequest addedItem = Mapper.Map<ServiceRequest>(newItem);

                // Set its associated item identifier
                addedItem.Service = associatedItem;

                ds.ServiceRequests.Add(addedItem);
                ds.SaveChanges();

                // Return the object
                return Mapper.Map<ServiceRequestBase>(addedItem);
            }
        }

        public ServiceRequestBase ServiceRequestEdit(ServiceRequestEdit editedItem)
        {
            // Ensure that we can continue
            if (editedItem == null)
            {
                return null;
            }

            // Attempt to fetch the underlying object
            var storedItem = ds.ServiceRequests.Find(editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                // Fetch the object from the data store - ds.Entry(storedItem)
                // Get its current values collection - .CurrentValues
                // Set those to the edited values - .SetValues(editedItem)
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                // The SetValues() method ignores missing properties and navigation properties
                ds.SaveChanges();

                return Mapper.Map<ServiceRequestBase>(storedItem);
            }
        }

        public void ServiceRequestDelete(int id)
        {
            // Attempt to fetch the existing item
            var storedItem = ds.ServiceRequests.Find(id);

            // Interim coding strategy...

            if (storedItem == null)
            {
                // Throw an exception
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    // If this fails, throw an exception (as above)
                    // This implementation just prevents an error from bubbling up

                    ds.ServiceRequests.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        //************************************************UNIT SECTION****************************************************

        public IEnumerable<UnitBase> UnitGetAll()
        {
            var c = ds.Units.OrderBy(a => a.Id);

            return Mapper.Map<IEnumerable<UnitBase>>(c);
        }

        public UnitBase UnitGetById(int id)
        {
            var c = ds.Units.Include("UnitPhotos").Include("Apartments").SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<UnitBase>(c);
        }

        public UnitBase UnitAdd(UnitAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            var addedItem = ds.Units.Add(Mapper.Map<Unit>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<UnitBase>(addedItem);
        }

        public UnitBase UnitEdit(UnitEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Units.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<UnitBase>(storedItem);
            }
        }
        public void UnitDelete(int id)
        {
            var storedItem = ds.Units.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Units.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        //***********************************************UNITPHOTO SECTION ***********************************************
        public IEnumerable<UnitPhotoBase> UnitPhotoGetAll()
        {
            var c = ds.UnitPhotos.Include("Unit").OrderBy(a => a.Id);

            return Mapper.Map<IEnumerable<UnitPhotoBase>>(c);
        }

        public UnitPhotoWithMedia UnitPhotoGetById(int id)
        {
            var c = ds.UnitPhotos.Include("Unit").SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<UnitPhotoWithMedia>(c);
        }

        public UnitPhotoWithMedia UnitPhotoGetByAptNumber(int unitId)
        {
            var c = ds.UnitPhotos.SingleOrDefault(a => a.UnitId == unitId);

            return (c == null) ? null : Mapper.Map<UnitPhotoWithMedia>(c);
        }
        public UnitPhotoBase UnitPhotoAdd(UnitPhotoAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            var associatedItem = ds.Units.Find(newItem.UnitId);
            if (associatedItem == null)
            {
                return null;
            }
            var addedItem = Mapper.Map<UnitPhoto>(newItem);
            addedItem.UnitId = newItem.UnitId;

            ds.UnitPhotos.Add(addedItem);
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<UnitPhotoBase>(addedItem);
        }

        public UnitPhotoBase UnitPhotoEdit(UnitPhotoEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.UnitPhotos.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<UnitPhotoBase>(storedItem);
            }
        }

        public bool UnitPhotoSetPhoto(int id, string contentType, byte[] photo)
        {
            if (string.IsNullOrEmpty(contentType) | photo == null) { return false; }

            var storedItem = ds.UnitPhotos.Include("Unit").SingleOrDefault(m => m.Id == id);

            if (storedItem == null) { return false; }

            storedItem.ContentType = contentType;
            storedItem.Photo = photo;

            return (ds.SaveChanges() > 0) ? true : false;
        }

        public void UnitPhotoDelete(int id)
        {
            var storedItem = ds.UnitPhotos.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {              
                    ds.UnitPhotos.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        // ********************************************** APARTMENT SECTION***************************************************
        public IEnumerable<ApartmentBase> ApartmentGetAll()
        {
            var c = ds.Apartments.OrderBy(a => a.ApartmentNumber);

            return Mapper.Map<IEnumerable<ApartmentBase>>(c);
        }

        public ApartmentBase ApartmentGetById(int id)
        {
            var c = ds.Apartments.SingleOrDefault(a => a.ApartmentNumber == id);

            return (c == null) ? null : Mapper.Map<ApartmentBase>(c);
        }
        public ApartmentBase ApartmentAdd(ApartmentAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            var addedItem = ds.Apartments.Add(Mapper.Map<Apartment>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<ApartmentBase>(addedItem);
        }

        public ApartmentBase ApartmentEdit(ApartmentEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Apartments.SingleOrDefault(e => e.ApartmentNumber == editedItem.ApartmentNumber);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<ApartmentBase>(storedItem);
            }
        }

        public void ApartmentDelete(int id)
        {
            var storedItem = ds.Apartments.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Apartments.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        //************************************** TENANT SECTION ***********************************************************

        public IEnumerable<TenantBase> TenantGetAll()
        {
            var c = ds.Tenants.OrderBy(a => a.LastName);

            return Mapper.Map<IEnumerable<TenantBase>>(c);
        }

        public TenantBase TenantGetById(int id)
        {
            var c = ds.Tenants.SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<TenantBase>(c);
        }

        public TenantBase TenantAdd(TenantAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }
            var addedItem = ds.Tenants.Add(Mapper.Map<Tenant>(newItem));
            ds.SaveChanges();

            return (addedItem == null) ? null : Mapper.Map<TenantBase>(addedItem);
        }

        public TenantBase TenantEdit(TenantEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.Tenants.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<TenantBase>(storedItem);
            }
        }

        public void TenantDelete(int id)
        {
            var storedItem = ds.Tenants.Find(id);
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Tenants.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        //************************************** LEASE SECTION ***********************************************************

        public IEnumerable<LeaseWithInformation> LeaseGetAllWithInformation()
        {
            var s = ds.Leases.Include("Tenant").Include("Apartment").OrderBy(j => j.Id);
            return Mapper.Map<IEnumerable<LeaseWithInformation>>(s);
        }

        public LeaseWithInformation LeaseGetByIdWithInformation(int id)
        {
            var o = ds.Leases.Include("Tenant").Include("Apartment").SingleOrDefault(j => j.Id == id);
            return (o == null) ? null : Mapper.Map<LeaseWithInformation>(o);
        }

        public LeaseBase LeaseAdd(LeaseAdd newItem)
        {
            // Ensure that we can continue
            if (newItem == null)
            {
                return null;
            }
            else
            {
                // Must validate the associated object
                var associatedApartment = ds.Apartments.Find(newItem.ApartmentId);
                if (associatedApartment == null)
                {
                    return null;
                }

                // Must validate the associated object
                var associatedTenant = ds.Tenants.Find(newItem.TenantId);
                if (associatedTenant == null)
                {
                    return null;
                }

                // Add the new object

                // Build the Lease object
                Lease addedItem = Mapper.Map<Lease>(newItem);

                // Set its associated item identifier
                addedItem.Apartment = associatedApartment;
                addedItem.Tenant = associatedTenant;

                ds.Leases.Add(addedItem);
                ds.SaveChanges();

                // Return the object
                return Mapper.Map<LeaseBase>(addedItem);
            }
        }

        public LeaseBase LeaseEdit(LeaseEdit editedItem)
        {
            // Ensure that we can continue
            if (editedItem == null)
            {
                return null;
            }

            // Attempt to fetch the underlying object
            var storedItem = ds.Leases.Find(editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                // Fetch the object from the data store - ds.Entry(storedItem)
                // Get its current values collection - .CurrentValues
                // Set those to the edited values - .SetValues(editedItem)
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                // The SetValues() method ignores missing properties and navigation properties
                ds.SaveChanges();

                return Mapper.Map<LeaseBase>(storedItem);
            }
        }

        public void LeaseDelete(int id)
        {
            // Attempt to fetch the existing item
            var storedItem = ds.Leases.Find(id);

            // Interim coding strategy...

            if (storedItem == null)
            {
                // Throw an exception
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    // If this fails, throw an exception (as above)
                    // This implementation just prevents an error from bubbling up

                    ds.Leases.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

    }
}