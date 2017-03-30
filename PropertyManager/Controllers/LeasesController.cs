﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class LeasesController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/Leases
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get()
        {
            return Ok(m.LeaseGetAllWithInformation());
        }

        // GET: api/Leases/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.LeaseGetByIdWithInformation(id.GetValueOrDefault());

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

        [Route("api/leases/id/{id}/find")]
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult GetByEmail(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.LeaseGetByTenantId(id);

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

        // POST: api/Leases
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Post([FromBody]LeaseAdd newItem)
        {
            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var apartment = m.ApartmentGetById(newItem.ApartmentNumber);
            if(apartment == null)
            {
                return Content(HttpStatusCode.NotFound, "Apartment Number not found");
            }

            var lease = m.LeaseGetByAptNumber(newItem.ApartmentNumber);
            if(lease != null)
            {
                return Content(HttpStatusCode.Conflict, "Apartment already associated with a lease");
            }
        
            // Attempt to add the new object
            var addedItem = m.LeaseAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.Id });

            return Created(uri, addedItem);
        }

        // PUT: api/Leases/5
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Put(int id, [FromBody]LeaseEdit editedItem)
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
                var changedItem = m.LeaseEdit(editedItem);

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

        // DELETE: api/Leases/5
        [Authorize(Roles = "Administrator, Manager")]
        public void Delete(int id)
        {
            m.LeaseDelete(id);
        }
    }
}
