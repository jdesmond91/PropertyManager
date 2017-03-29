using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class FacilityBookingsController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/FacilityBookings
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get()
        {
            return Ok(m.FacilityBookingGetAllWithFacility());
        }

        // GET: api/FacilityBookings/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.FacilityBookingGetByIdWithFacility(id.GetValueOrDefault());

            // Continue?
            if (o == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(o);
            }
        }

        // POST: api/FacilityBookings
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Post([FromBody]FacilityBookingAdd newItem)
        {
            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var facility = m.FacilityGetById(newItem.FacilityId);
            if(facility != null)
            {
                var facilityOpenHour = facility.OpenTime.Value.Hour;
                var facilityOpenMin = facility.OpenTime.Value.Minute;
                var facilityCloseHour = facility.CloseTime.Value.Hour;
                var facilityCloseMin = facility.CloseTime.Value.Minute;

                var startTimeHour = newItem.StartTime.Value.Hour;
                var startTimeMin = newItem.StartTime.Value.Minute;

                var endTimeHour = newItem.EndTime.Value.Hour;
                var endTimeMin = newItem.EndTime.Value.Minute;

                if(startTimeHour < facilityOpenHour || startTimeHour > facilityCloseHour)
                {
                    return Content(HttpStatusCode.Conflict, "The facility is closed at this start time");
                }
                else if(startTimeHour == facilityOpenHour && startTimeMin < facilityOpenMin){
                    return Content(HttpStatusCode.Conflict, "The facility is closed at this start time");
                }    
                else if(endTimeHour > facilityCloseHour)
                {
                    return Content(HttpStatusCode.Conflict, "The facility is closed at this end time");
                }
                else if(endTimeHour == facilityCloseHour && endTimeMin > facilityCloseMin)
                {
                    return Content(HttpStatusCode.Conflict, "The facility is closed at this end time");
                }               
            }            

            var booking = m.FacilityBookingGetByDate(newItem);
            if(booking != null)
            {
                foreach(FacilityBookingBase book in booking)
                {
                    if(newItem.StartTime >= book.StartTime && newItem.StartTime <= book.EndTime)
                    {
                        return Content(HttpStatusCode.Conflict, "There's a booking at this time");
                    }
                    else if(newItem.StartTime < book.StartTime && newItem.EndTime >= book.StartTime)
                    {
                        return Content(HttpStatusCode.Conflict, "There's a booking at this time");
                    }
                }
            }

            // Attempt to add the new object
            var addedItem = m.FacilityBookingAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.Id });

            return Created(uri, addedItem);
        }

        // PUT: api/FacilityBookings/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Put(int id, [FromBody]FacilityBookingEdit editedItem)
        {
            if (editedItem == null)
            {
                return BadRequest("Must send an entity body with the request");
            }

            if (id != editedItem.Id)
            {
                return BadRequest("Invalid data in the entity body");
            }

            if (ModelState.IsValid)
            {
                var booking = m.FacilityBookingGetByDateEdit(editedItem);
                if (booking != null)
                {
                    foreach (FacilityBookingBase book in booking)
                    {
                        if (editedItem.StartTime >= book.StartTime && editedItem.StartTime <= book.EndTime)
                        {
                            return Content(HttpStatusCode.Conflict, "There's a booking at this time");
                        }
                        else if (editedItem.StartTime < book.StartTime && editedItem.EndTime >= book.StartTime)
                        {
                            return Content(HttpStatusCode.Conflict, "There's a booking at this time");
                        }
                    }
                }

                var changedItem = m.FacilityBookingEdit(editedItem);

                if (changedItem == null)
                {
                    // HTTP 400
                    return BadRequest("Cannot edit the object");
                }
                else
                {
                    // HTTP 200 with the changed item in the entity body
                    return Ok(changedItem);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/FacilityBookings/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public void Delete(int id)
        {
            m.FacilityBookingDelete(id);
        }
    }
}
