﻿//Made by Amanda Marques

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace PropertyManager.Models
{
    public class UnitPhoto
    {
        public int Id { get; set; }
        public string PathName { get; set; }
        public string Description { get; set; }       
        public virtual Unit Unit { get; set; }
     
    }

    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public CustomMultipartFormDataStreamProvider(string path) : base(path)
        { }

        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            var name = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName) ? headers.ContentDisposition.FileName : "NoName";
            return name.Replace("\"",string.Empty); 

                //this is here because Chrome submits files in quotation marks which get treated as part of the filename and get escaped
        }
    }
}