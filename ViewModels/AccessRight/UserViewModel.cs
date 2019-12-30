using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace ViewModels.AccessRight
{
    public class UserViewModel
    {
        public Guid? Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public string Thumbnail { get; set; }
        public IFormFile ThumbnailFile { get; set; }
    }
}
