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
        [System.Web.Http.Route("api/unitphotos/getall")]
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
            else
            {
                return Ok(o);
            }
        }    

        // POST: api/UnitPhotos

        [System.Web.Http.Route("addUnitPhoto")]
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
            unitphoto.PathName = "/Album/FileUploads/" + originalFileName;
            m.UnitPhotoAdd(unitphoto);


            // Through the request response you can return an object to the Angular controller
            // You will be able to access this in the .success callback through its data attribute
            // If you want to send something to the .error callback, use the HttpStatusCode.BadRequest instead
            var returnData = unitphoto;
            return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
        }

        private MultipartFormDataStreamProvider GetMultipartProvider()
        {
            var uploadFolder = "~/Album/FileUploads"; // you could put this to web.config
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
        [System.Web.Http.Route("editUnitPhoto")]
        public async Task<HttpResponseMessage> PostEdit()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }          

            var uploadFolder = "~/Album/FileUploads";
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);

            var provider = new CustomMultipartFormDataStreamProvider(root);
            var result = await Request.Content.ReadAsMultipartAsync(provider);

            var originalFileName = GetDeserializedFileName(result.FileData.First());

            var uploadedFileInfo = new FileInfo(result.FileData.First().LocalFileName);

            var fileUploadObj = GetFormData<UnitPhotoBase>(result);

            var unitphoto = Mapper.Map<UnitPhotoBase>(fileUploadObj);
            
            var unitphotoEdit = m.UnitPhotoGetById(unitphoto.Id);

            var unitphoto2 = Mapper.Map<UnitPhotoAdd>(unitphotoEdit);

            m.UnitPhotoDelete(unitphotoEdit.Id);

            unitphoto2.PathName = "/Album/FileUploads/" + originalFileName;

            m.UnitPhotoAdd(unitphoto2);

            var returnData = unitphoto;
            return this.Request.CreateResponse(HttpStatusCode.OK, new { returnData });
        }
      

        // DELETE: api/UnitPhotos/5
        public void Delete(int id)
        {
            m.UnitPhotoDelete(id);
        }
    }
}
