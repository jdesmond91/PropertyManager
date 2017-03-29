using AutoMapper;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using PropertyManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
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

        public IEnumerable<UserBase> UAGetAll()
        {
            // Get a reference to the application's user manager
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();

            // Return the entire user account collection, mapped
            return Mapper.Map<IEnumerable<UserBase>>(userManager.Users);
        }

        public HttpResponseMessage UserRemoveClaim(string email)
        {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();

            // Return the entire user account collection, mapped
            var user = userManager.FindByEmailAsync(email).Result;

            var response = new HttpResponseMessage();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    user.Role = "Deactivated";
                    userManager.UpdateAsync(user);
                    ds.SaveChanges();

                    //var removed = new List<Claim>();

                    //foreach (IdentityUserClaim claim in user.Claims)
                    //{
                    //    removed.Add(new Claim(claim.ClaimType, claim.ClaimValue));              
                    //}
                    //foreach (Claim claim in removed)
                    //{
                    //    userManager.RemoveClaimAsync(user.Id, claim);
                    //}

                    response.Headers.Add("RemoveClaimMessage", "Claim Removed");
                }
                catch (Exception)
                {

                    response.Headers.Add("RemoveClaimMessage", "Could not remove claim");
                }
            }
            return response;
        }

        public HttpResponseMessage UserAddClaim(string email)
        {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();

            var user = userManager.FindByEmailAsync(email).Result;

            var response = new HttpResponseMessage();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                user.Role = "Tenant";
                userManager.UpdateAsync(user);
                ds.SaveChanges();
                response.Headers.Add("AddClaimMessage", "Claim Added");
            }
            
            return response;
        }

        public HttpResponseMessage UserDelete(string email)
        {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();

            // Return the entire user account collection, mapped
            var user = userManager.FindByEmailAsync(email).Result;

            var response = new HttpResponseMessage();
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else              
            {
                try
                {
                    userManager.DeleteAsync(user);
                    response.Headers.Add("DeleteUserMessage", "Delete user successful");
                }
                catch (Exception)
                {

                    response.Headers.Add("DeleteUserMessage", "Could not delete user");
                }
            }
            return response;
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

        public HttpResponseMessage AnnouncementDelete(int id)
        {
            var storedItem = ds.Announcements.Find(id);

            var response = new HttpResponseMessage();
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
                    response.Headers.Add("DeleteMessage", "Delete successful");
                }
                catch (Exception) {
                    
                    response.Headers.Add("DeleteMessage", "Could not delete");                   
                }
            }
            return response;
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

        public HttpResponseMessage EmployeeDelete(int id)
        {
            var storedItem = ds.Employees.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {                   
                    response.Headers.Add("DeleteMessage", "Delete employee successful");

                    ds.Employees.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete employee");
                }
            }
            return response;
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

        public HttpResponseMessage InventoryDelete(int id)
        {
            var storedItem = ds.Inventory.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {              
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete inventory successful");
                    ds.Inventory.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete inventory");
                }
            }
            return response;
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
        public HttpResponseMessage FacilityDelete(int id)
        {
            var storedItem = ds.Facilities.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete facility successful");
                    ds.Facilities.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete facility");
                }
            }
            return response;
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

        public IEnumerable<FacilityBookingBase> FacilityBookingGetByDate(FacilityBookingAdd newItem)
        {
            var o = ds.FacilityBookings.Where(j => j.BookedDate == newItem.BookedDate && j.Facility.Id == newItem.FacilityId);
            return (o == null) ? null : Mapper.Map<IEnumerable<FacilityBookingBase>>(o);
        }

        public IEnumerable<FacilityBookingBase> FacilityBookingGetByDateEdit(FacilityBookingEdit newItem)
        {
            var o = ds.FacilityBookings.Where(j => j.BookedDate == newItem.BookedDate && j.Facility.Id == newItem.FacilityId);
            return (o == null) ? null : Mapper.Map<IEnumerable<FacilityBookingBase>>(o);
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

                var associatedTenant = ds.Tenants.Find(newItem.TenantId);
                if (associatedTenant == null)
                {
                    return null;
                }

                // Add the new object

                // Build the FacilityBooking object
                FacilityBooking addedItem = Mapper.Map<FacilityBooking>(newItem);

                // Set its associated item identifier
                addedItem.Facility = associatedItem;
                addedItem.Tenant = associatedTenant;

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

        public HttpResponseMessage FacilityBookingDelete(int id)
        {      
            var storedItem = ds.FacilityBookings.Find(id);
            var response = new HttpResponseMessage();  

            if (storedItem == null)
            {
                // Throw an exception
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {              
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete facility booking successful");
                    ds.FacilityBookings.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete facility booking");
                }
            }
            return response;
        }

        //**************************************** SERVICE SECTION ******************************************************

        public IEnumerable<ServiceBase> ServiceGetAll()
        {
            var c = ds.Services.OrderBy(a => a.ServiceName);

            return Mapper.Map<IEnumerable<ServiceBase>>(c);
        }

        public IEnumerable<ServiceForServiceRequest> ServiceGetAllForRequest()
        {
            var c = ds.Services.OrderBy(a => a.ServiceName);

            return Mapper.Map<IEnumerable<ServiceForServiceRequest>>(c);
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

        public HttpResponseMessage ServiceDelete(int id)
        {
            var storedItem = ds.Services.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    ds.Services.Remove(storedItem);
                    response.Headers.Add("DeleteMessage", "Delete service successful");
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete service");
                }
            }
            return response;
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

        public ServiceRequestWithService ServiceRequestAdd(ServiceRequestAdd newItem)
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
                return Mapper.Map<ServiceRequestWithService>(addedItem);
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

        public HttpResponseMessage ServiceRequestDelete(int id)
        {
            // Attempt to fetch the existing item
            var storedItem = ds.ServiceRequests.Find(id);
            var response = new HttpResponseMessage();

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
                    response.Headers.Add("DeleteMessage", "Delete service request successful");
                    ds.ServiceRequests.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete service request");
                }
            }
            return response;
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
        public HttpResponseMessage UnitDelete(int id)
        {
            var storedItem = ds.Units.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete unit successful");
                    ds.Units.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete unit");
                }
            }
            return response;
        }

        //***********************************************UNITPHOTO SECTION ***********************************************
        public IEnumerable<UnitPhotoBase> UnitPhotoGetAll()
        {
            var c = ds.UnitPhotos.OrderBy(a => a.Id);

            return Mapper.Map<IEnumerable<UnitPhotoBase>>(c);
        }

        public UnitPhotoBase UnitPhotoGetByUnitId(int unitId)
        {
            var c = ds.UnitPhotos.FirstOrDefault(a => a.Unit.Id == unitId);

            return Mapper.Map<UnitPhotoBase>(c);
        }

        public UnitPhotoBase UnitPhotoGetById(int id)
        {
            var c = ds.UnitPhotos.FirstOrDefault(a => a.Id == id);

            return Mapper.Map<UnitPhotoBase>(c);
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
            addedItem.Unit = associatedItem;

            ds.UnitPhotos.Add(addedItem);
            ds.SaveChanges();

            return Mapper.Map<UnitPhotoBase>(addedItem);

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
                    var filePath = "~" + storedItem.PathName;
                    if (System.IO.File.Exists(HttpContext.Current.Server.MapPath(filePath)))
                    {
                        System.IO.File.Delete(HttpContext.Current.Server.MapPath(filePath));
                    }

                    ds.UnitPhotos.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        // ********************************************** APARTMENT SECTION***************************************************
        public IEnumerable<ApartmentWithUnit> ApartmentGetAll()
        {
            var c = ds.Apartments.Include("Unit").OrderBy(a => a.ApartmentNumber);

            return Mapper.Map<IEnumerable<ApartmentWithUnit>>(c);
        }

        public ApartmentWithUnit ApartmentGetById(int id)
        {
            var c = ds.Apartments.Include("Unit").SingleOrDefault(a => a.ApartmentNumber == id);

            return (c == null) ? null : Mapper.Map<ApartmentWithUnit>(c);
        }
        public ApartmentWithUnit ApartmentAdd(ApartmentAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }         

            else
            {
                var apartment = ds.Apartments.Find(newItem.ApartmentNumber);
                if(apartment != null)
                {
                    return null;
                }

                // Must validate the associated object
                var associatedUnit = ds.Units.Find(newItem.UnitId);
                if (associatedUnit == null)
                {
                    return null;
                }
               
                Apartment addedItem = Mapper.Map<Apartment>(newItem);

                // Set its associated item identifier
                addedItem.Unit = associatedUnit;

                ds.Apartments.Add(addedItem);
                ds.SaveChanges();

                // Return the object
                return Mapper.Map<ApartmentWithUnit>(addedItem);
            }
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

        public HttpResponseMessage ApartmentDelete(int id)
        {
            var storedItem = ds.Apartments.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete apartment successful");
                    ds.Apartments.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not apartment user");
                }
            }
            return response;
        }

        //************************************** TENANT SECTION ***********************************************************

        public IEnumerable<TenantBase> TenantGetAll()
        {
            var c = ds.Tenants.OrderBy(a => a.LastName);

            var tenants = Mapper.Map<IEnumerable<TenantBase>>(c);

            foreach(TenantBase tenant in tenants)
            {
                var leaseInfo = ds.Leases.Include("Apartment").SingleOrDefault(a => a.Tenant.Id == tenant.Id);
                var leaseMap = Mapper.Map<LeaseForTenant>(leaseInfo);
                if(leaseInfo != null)
                {
                    tenant.Lease = leaseMap;
                }               
            }

            return tenants;
        }

        public IEnumerable<TenantBase> TenantGetAllNotLease()
        {
            var leases = ds.Leases.OrderBy(a => a.Id);

            var c = ds.Tenants.Where(p => leases.All(p2 => p2.Tenant.Id != p.Id));

            return (c == null) ? null : Mapper.Map<IEnumerable<TenantBase>>(c);

        }

        public TenantBase TenantGetById(int id)
        {
            var c = ds.Tenants.SingleOrDefault(a => a.Id == id);  
            
            var leaseInfo = ds.Leases.Include("Apartment").SingleOrDefault(a => a.Tenant.Id == id);
            var leaseMap = Mapper.Map<LeaseForTenant>(leaseInfo);

            var newTenant = Mapper.Map<TenantBase>(c);
            newTenant.Lease = leaseMap;

            return (c == null) ? null : newTenant;
        }

        public TenantBase TenantGetByEmail(string email)
        {
            var c = ds.Tenants.SingleOrDefault(a => a.Email == email);

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

        public HttpResponseMessage TenantDelete(int id)
        {
            var storedItem = ds.Tenants.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete tenant successful");
                    ds.Tenants.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete tenant");
                }
            }
            return response;
        }

        //************************************** LEASE SECTION ***********************************************************

        public IEnumerable<LeaseWithBasicInformation> LeaseGetAllWithInformation()
        {
            var s = ds.Leases.Include("Tenant").Include("Apartment").OrderBy(j => j.Id);    

            return Mapper.Map<IEnumerable<LeaseWithBasicInformation>>(s);
        }

        public LeaseWithBasicInformation LeaseGetByIdWithInformation(int id)
        {
            var o = ds.Leases.Include("Tenant").Include("Apartment").SingleOrDefault(j => j.Id == id);
            return (o == null) ? null : Mapper.Map<LeaseWithBasicInformation>(o);
        }

        public LeaseBase LeaseGetByAptNumber(int id)
        {
            var o = ds.Leases.SingleOrDefault(j => j.Apartment.ApartmentNumber == id);
            return (o == null) ? null : Mapper.Map<LeaseBase>(o);
        }

        public LeaseWithInformation LeaseGetByTenantId(int? id)
        {
            var o = ds.Leases.Include("Tenant").SingleOrDefault(j => j.Tenant.Id == id);
            return (o == null) ? null : Mapper.Map<LeaseWithInformation>(o);
        }

        public LeaseBase LeaseAdd(LeaseAdd newItem)
        {    
            if (newItem == null)
            {
                return null;
            }
            else
            {
      
                var associatedApartment = ds.Apartments.Find(newItem.ApartmentNumber);
                if (associatedApartment == null)
                {
                    return null;
                }

                var associatedTenant = ds.Tenants.Find(newItem.TenantId);
                if (associatedTenant == null)
                {
                    return null;
                }
       
                Lease addedItem = Mapper.Map<Lease>(newItem);

                addedItem.Apartment = associatedApartment;               
                addedItem.Tenant = associatedTenant;
                ds.Leases.Add(addedItem);

                var editedApt = Mapper.Map<ApartmentBase>(associatedApartment);
                editedApt.Status = "Occupied";
                ds.Entry(associatedApartment).CurrentValues.SetValues(editedApt);

                UserBase user = new UserBase();
                user = getByEmail(associatedTenant.Email);
                if (user != null)
                {
                    UserAddClaim(user.UserName);
                }

                ds.SaveChanges();

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
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<LeaseBase>(storedItem);
            }
        }

        public HttpResponseMessage LeaseDelete(int id)
        {
            // Attempt to fetch the existing item
            var storedItem = ds.Leases.Find(id);
            var response = new HttpResponseMessage();       
            if (storedItem == null)
            {
                // Throw an exception
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                UserBase user = new UserBase();
                user = getByEmail(storedItem.Tenant.Email);
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete lease successful");
                    var associatedApartment = ds.Apartments.Find(storedItem.Apartment.ApartmentNumber);
                    var editedApt = Mapper.Map<ApartmentBase>(associatedApartment);
                    editedApt.Status = "Vacant";
                    ds.Entry(associatedApartment).CurrentValues.SetValues(editedApt);

                    ds.Leases.Remove(storedItem);

                   
                    if (user != null)
                    {
                        UserRemoveClaim(user.UserName);
                    }

                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete lease");
                }
            }
            return response;
        }

        //****************************** WORK ORDER SECTION *******************************************************************

        public IEnumerable<WorkOrderWithTenant> WorkOrderGetAll()
        {
            var c = ds.WorkOrders.Include("Tenant").OrderBy(a => a.RequestDate);

            var workOrders = Mapper.Map<IEnumerable<WorkOrderWithTenant>>(c);

            foreach (WorkOrderWithTenant workOrder in workOrders)
            {
                var leaseInfo = ds.Leases.Include("Apartment").SingleOrDefault(a => a.Tenant.Id == workOrder.Tenant.Id);
                var leaseMap = Mapper.Map<LeaseForTenant>(leaseInfo);
                if(leaseInfo != null)
                {
                    workOrder.Tenant.Lease = leaseMap;
                }
                
            }

            return workOrders;
        }

        public WorkOrderBase WorkOrderGetById(int id)
        {
            var c = ds.WorkOrders.SingleOrDefault(a => a.Id == id);

            return (c == null) ? null : Mapper.Map<WorkOrderBase>(c);
        }

        public IEnumerable<WorkOrderBase> WorkOrderGetByTenantId(int id)
        {
            var c = ds.WorkOrders.Where(a => a.Tenant.Id == id);

            return (c == null) ? null : Mapper.Map<IEnumerable<WorkOrderBase>>(c);
        }

        public WorkOrderBase WorkOrderAdd(WorkOrderAdd newItem)
        {
            if (newItem == null)
            {
                return null;
            }

            var associatedTenant = ds.Tenants.Find(newItem.TenantId);
            if (associatedTenant == null)
            {
                return null;
            }

            WorkOrder addedItem = Mapper.Map<WorkOrder>(newItem);  
            
            var today = DateTime.Now;

            addedItem.Tenant = associatedTenant;
            addedItem.RequestDate = today;

            ds.WorkOrders.Add(addedItem);
            ds.SaveChanges();

            // Return the object
            return Mapper.Map<WorkOrderBase>(addedItem);
        }

        public WorkOrderBase WorkOrderEdit(WorkOrderEdit editedItem)
        {
            if (editedItem == null)
            {
                return null;
            }
            var storedItem = ds.WorkOrders.SingleOrDefault(e => e.Id == editedItem.Id);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                ds.SaveChanges();

                return Mapper.Map<WorkOrderBase>(storedItem);
            }
        }

        public HttpResponseMessage WorkOrderDelete(int id)
        {
            var storedItem = ds.WorkOrders.Find(id);
            var response = new HttpResponseMessage();
            if (storedItem == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                try
                {
                    response.Headers.Add("DeleteMessage", "Delete work order successful");
                    ds.WorkOrders.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) {
                    response.Headers.Add("DeleteMessage", "Could not delete work order");
                }
            }
            return response;
        }

    }
}