using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class ServicesController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/Services
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Get()
        {
            return Ok(m.ServiceGetAll());
        }

        
        [Route("api/Services/allforrequest")]
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult GetForRequest()
        {
            return Ok(m.ServiceGetAllForRequest());
        }

        // GET: api/Services/5
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.ServiceGetByIdWithServiceRequests(id.GetValueOrDefault());

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

        // POST: api/Services
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Post([FromBody]ServiceAdd newItem)
        {
            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            // Attempt to add the new object
            var addedItem = m.ServiceAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.Id });

            return Created(uri, addedItem);
        }

        // PUT: api/Services/5
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Put(int id, [FromBody]ServiceEdit editedItem)
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
                var changedItem = m.ServiceEdit(editedItem);

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

        // DELETE: api/Services/5
        [Authorize(Roles = "Administrator, Manager")]
        public HttpResponseMessage Delete(int id)
        {
            var response = m.ServiceDelete(id);
            return response;
        }
    }
}
