using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using PropertyManager.Models;
using AutoMapper;

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
        //[Route("api/unitphotos/unitnumber/{id}")]
        //[HttpGet]
        //public IHttpActionResult GetByUnitNumber(int? id)
        //{
        //    if (!id.HasValue) { return NotFound(); }
        //    // Attempt to fetch the object
        //    var o = m.UnitPhotoGetByAptNumber(id.GetValueOrDefault());

        //    // Continue?
        //    if (o == null)
        //    {
        //        return NotFound();
        //    }
        //    var isRequestForMediaItem = Utility.IsRequestForMediaItem(Request.Headers);

        //    if (isRequestForMediaItem)
        //    {
        //        // Return media item
        //        return Ok(o.Photo);
        //    }
        //    else
        //    {
        //        return Ok(o);
        //    }
        //}

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
            var uri = Url.Link("DefaultApi", new { id = addedItem.PathName });

            return Created(uri, addedItem);
        }

        [System.Web.Http.Route("PostFileWithData")]
        public async Task<HttpResponseMessage> Post()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            // var uploadFolder = "~/App_Data/Tmp/FileUploads";
             var uploadFolder = "~/Album/FileUploads";// you could put this to web.config
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);

            //var provider = GetMultipartProvider();
            var provider = new CustomMultipartFormDataStreamProvider(root);
            var result = await Request.Content.ReadAsMultipartAsync(provider);

            var originalFileName = GetDeserializedFileName(result.FileData.First());

            // uploadedFileInfo object will give you some additional stuff like file length,
            // creation time, directory name, a few filesystem methods etc..
            var uploadedFileInfo = new FileInfo(result.FileData.First().LocalFileName);

            // Remove this line as well as GetFormData method if you're not 
            // sending any form data with your upload request
            var fileUploadObj = GetFormData<UnitPhotoBase>(result);
            var unitphoto = Mapper.Map<UnitPhotoAdd>(fileUploadObj);
            unitphoto.PathName = "~/Album/FileUploads/" + originalFileName;
            m.UnitPhotoAdd(unitphoto);


            // Through the request response you can return an object to the Angular controller
            // You will be able to access this in the .success callback through its data attribute
            // If you want to send something to the .error callback, use the HttpStatusCode.BadRequest instead
            var returnData = "ReturnTest";
            return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
        }

        private MultipartFormDataStreamProvider GetMultipartProvider()
        {
            var uploadFolder = "~/App_Data/Tmp/FileUploads"; // you could put this to web.config
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);
            return new MultipartFormDataStreamProvider(root);
        }

        // Extracts Request FormatData as a strongly typed model
        private object GetFormData<T>(MultipartFormDataStreamProvider result)
        {
            if (result.FormData.HasKeys())
            {
                var unescapedFormData = Uri.UnescapeDataString(result.FormData.GetValues(0).FirstOrDefault() ?? String.Empty);
                if (!String.IsNullOrEmpty(unescapedFormData))
                    return JsonConvert.DeserializeObject<T>(unescapedFormData);
            }

            return null;
        }

        private string GetDeserializedFileName(MultipartFileData fileData)
        {
            var fileName = GetFileName(fileData);
            return JsonConvert.DeserializeObject(fileName).ToString();
        }

        public string GetFileName(MultipartFileData fileData)
        {
            return fileData.Headers.ContentDisposition.FileName;
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

        //[Route("api/unitphotos/{id}/setphoto")]
        //[HttpPut]
        //public IHttpActionResult UnitPhotoPut(int id, [FromBody]byte[] photo)
        //{
        //    // Get the Content-Type header from the request
        //    var contentType = Request.Content.Headers.ContentType.MediaType;

        //    var contentLength = Request.Content.Headers.ContentLength;

        //    //if (contentLength > 200000)
        //    //{
        //        //return StatusCode(HttpStatusCode.RequestEntityTooLarge);
        //    //}

        //    // Attempt to save
        //    if (m.UnitPhotoSetPhoto(id, contentType, photo))
        //    {
        //        return StatusCode(HttpStatusCode.NoContent);
        //    }
        //    else
        //    {
        //        return BadRequest("Unable to set the photo");
        //    }
        //}

        // DELETE: api/UnitPhotos/5
        public void Delete(int id)
        {
            m.UnitPhotoDelete(id);
        }
    }
}
