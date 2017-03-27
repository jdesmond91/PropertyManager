using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class ApartmentsController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/Apartments
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get()
        {
            return Ok(m.ApartmentGetAll());
        }

        // GET: api/Apartments/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.ApartmentGetById(id.GetValueOrDefault());

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

        // POST: api/Apartments
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Post([FromBody]ApartmentAdd newItem)
        {          

            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var leaseInfo = m.LeaseGetByAptNumber(newItem.ApartmentNumber);
            if(leaseInfo != null)
            {
                return Content(HttpStatusCode.Conflict, "Apartment Already Exists");
            }

            // Attempt to add the new object
            var addedItem = m.ApartmentAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }            

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.ApartmentNumber });

            return Created(uri, addedItem);
        }

        // PUT: api/Apartments/5
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Put(int id, [FromBody]ApartmentEdit editedItem)
        {
            if (editedItem == null)
            {
                return BadRequest("Must send an entity body with the request");
            }

            if (id != editedItem.ApartmentNumber)
            {
                return BadRequest("Invalid data in the entity body");
            }

            if (ModelState.IsValid)
            {
                var changedItem = m.ApartmentEdit(editedItem);

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

        // DELETE: api/Apartments/5
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Delete(int id)
        {
            var leaseInfo = m.LeaseGetByAptNumber(id);
            if (leaseInfo != null)
            {
                return Content(HttpStatusCode.Conflict, "Lease associated");
            }

            m.ApartmentDelete(id);
            return Ok();
        }
    }
}
