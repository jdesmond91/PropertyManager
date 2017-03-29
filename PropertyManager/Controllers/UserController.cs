using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PropertyManager.Controllers
{
    public class UserController : ApiController
    {
        private Manager m = new Manager();

        // GET: api/User
        [Authorize(Roles = "Administrator, Manager")]
        public IHttpActionResult Get()
        {
            return Ok(m.UAGetAll());
        }

        [Route("api/user/email/{email}/find")]
        public IHttpActionResult GetByEmail(string email)
        {
            if (email == "") { return NotFound(); }
            // Attempt to fetch the object
            var o = m.getByEmail(email);

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

        // GET: api/User/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }



        // DELETE: api/User/5
        //[Route("api/user/{email}/delete")]
        //[Authorize(Roles = "Administrator, Manager, Tenant")]
        //public HttpResponseMessage Delete(string email)
        //{
        //    //var response = m.UserDelete(email);
        //    //return response;
        //}
    }
}
