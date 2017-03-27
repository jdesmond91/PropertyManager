using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class WorkOrdersController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/WorkOrders
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get()
        {
            return Ok(m.WorkOrderGetAll());
        }

        // GET: api/WorkOrders/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.WorkOrderGetById(id.GetValueOrDefault());

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

        [Route("api/workorders/tenant/{id}/find")]
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult GetByTenantId(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.WorkOrderGetByTenantId(id.GetValueOrDefault());

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

        // POST: api/WorkOrders
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Post([FromBody]WorkOrderAdd newItem)
        {
            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            // Attempt to add the new object
            var addedItem = m.WorkOrderAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.Id });

            return Created(uri, addedItem);
        }

        // PUT: api/WorkOrders/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public IHttpActionResult Put(int id, [FromBody]WorkOrderEdit editedItem)
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
                var changedItem = m.WorkOrderEdit(editedItem);

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

        // DELETE: api/WorkOrders/5
        [Authorize(Roles = "Administrator, Manager, Tenant")]
        public HttpResponseMessage Delete(int id)
        {
            var response = m.WorkOrderDelete(id);
            return response;
        }
    }
}
