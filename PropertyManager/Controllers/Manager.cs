using AutoMapper;
using PropertyManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class Manager
    {
        private ApplicationDbContext ds = new ApplicationDbContext();

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

        //************************************************UNIT SECTION****************************************************

        public IEnumerable<UnitBase> UnitGetAll()
        {
            var c = ds.Units.OrderBy(a => a.Id);

            return Mapper.Map<IEnumerable<UnitBase>>(c);
        }

        public UnitBase UnitGetById(int id)
        {
            var c = ds.Units.Include("UnitPhotos").SingleOrDefault(a => a.Id == id);

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

    }
}