using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class UnitPhotosController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/UnitPhotos
        public IHttpActionResult Get()
        {
            return Ok(m.UnitPhotoGetAll());
        }

        // GET: api/UnitPhotos/5
        public IHttpActionResult Get(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.UnitPhotoGetById(id.GetValueOrDefault());

            // Continue?
            if (o == null)
            {
                return NotFound();
            }
            var isRequestForMediaItem = Utility.IsRequestForMediaItem(Request.Headers);

            if (isRequestForMediaItem)
            {
                // Return media item
                return Ok(o.Photo);
            }
            else
            {                
                return Ok(o);
            }
        }

        // GET: api/UnitPhotos/5
        [Route("api/unitphotos/unitnumber/{id}")]
        [HttpGet]
        public IHttpActionResult GetByUnitNumber(int? id)
        {
            if (!id.HasValue) { return NotFound(); }
            // Attempt to fetch the object
            var o = m.UnitPhotoGetByAptNumber(id.GetValueOrDefault());

            // Continue?
            if (o == null)
            {
                return NotFound();
            }
            var isRequestForMediaItem = Utility.IsRequestForMediaItem(Request.Headers);

            if (isRequestForMediaItem)
            {
                // Return media item
                return Ok(o.Photo);
            }
            else
            {
                return Ok(o);
            }
        }

        // POST: api/UnitPhotos
        public IHttpActionResult Post([FromBody]UnitPhotoAdd newItem)
        {
            if (Request.GetRouteData().Values["id"] != null) { return BadRequest("Invalid request URI"); }

            // Ensure that a "newItem" is in the entity body
            if (newItem == null) { return BadRequest("Must send an entity body with the request"); }

            // Ensure that we can use the incoming data
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            // Attempt to add the new object
            var addedItem = m.UnitPhotoAdd(newItem);

            // Continue?
            if (addedItem == null) { return BadRequest("Cannot add the object"); }

            // HTTP 201 with the new object in the entity body
            // Notice how to create the URI for the Location header
            var uri = Url.Link("DefaultApi", new { id = addedItem.Id });

            return Created(uri, addedItem);
        }

        // PUT: api/UnitPhotos/5
        public IHttpActionResult Put(int id, [FromBody]UnitPhotoEdit editedItem)
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
                var changedItem = m.UnitPhotoEdit(editedItem);

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

        [Route("api/unitphotos/{id}/setphoto")]
        [HttpPut]
        public IHttpActionResult UnitPhotoPut(int id, [FromBody]byte[] photo)
        {
            // Get the Content-Type header from the request
            var contentType = Request.Content.Headers.ContentType.MediaType;

            var contentLength = Request.Content.Headers.ContentLength;

            //if (contentLength > 200000)
            //{
                //return StatusCode(HttpStatusCode.RequestEntityTooLarge);
            //}

            // Attempt to save
            if (m.UnitPhotoSetPhoto(id, contentType, photo))
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                return BadRequest("Unable to set the photo");
            }
        }

        // DELETE: api/UnitPhotos/5
        public void Delete(int id)
        {
            m.UnitPhotoDelete(id);
        }
    }
}
