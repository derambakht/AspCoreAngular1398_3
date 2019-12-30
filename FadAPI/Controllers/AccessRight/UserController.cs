using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Common;
using DAL.Repositories;
using Entities.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewModels.AccessRight;

namespace FadAPI.Controllers.AccessRight
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private IGenericRepository<Users> _userRepo;
        private IHostingEnvironment _hostingEnvironment;

        public UserController(IGenericRepository<Users> userRepo, IHostingEnvironment hostingEnvironment)
        {
            _userRepo = userRepo;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
             var imageFolderUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host.Value}/medias/users/";
            var result = await _userRepo.GetAsQueryable().Select(q =>
            new UserViewModel
            {
                UserName = q.UserName,
                Thumbnail = $"{imageFolderUrl}/{q.Thumbnail}"
            }).ToListAsync();
            
             return Ok(result);
        }

        //[HttpPost]
        //public async Task<IActionResult> Post(UserViewModel model)
        //{
        //    return Ok();
        //}

        [HttpPost]
        public async Task<IActionResult> Post([FromForm]UserViewModel model)
        {
            var passwordSalt = EncyrptionUtility.GenerateSalt();
            var hashPassword = EncyrptionUtility.GenerateHashWithSalt(model.Password, passwordSalt);
            string newFileName = "";
            if (model.ThumbnailFile != null && model.ThumbnailFile.Length > 0)
            {
                newFileName = passwordSalt + "_" + model.ThumbnailFile.FileName;

                //save user thumbnail in disk
                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "medias/users");
                var filePath = Path.Combine(uploads, newFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await model.ThumbnailFile.CopyToAsync(fileStream);
                }
            }

            var user = new Users
            {
                Id = Guid.NewGuid(),
                CreateDate = DateTime.Now,
                IsActive = true,
                Password = hashPassword,
                PasswordSalt = passwordSalt,
                UserName = model.UserName,
                Thumbnail = newFileName,
            };

            await _userRepo.AddAsync(user);

            return Ok(user.Id);
        }
    }
}