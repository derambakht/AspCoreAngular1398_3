using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewModels.AccessRight;

namespace FadAPI.Controllers.AccessRight
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserMenuItemController : BaseController
    {
        private IGenericRepository<UserTokens> _userTokenRepo;
        private IGenericRepository<MenuItems> _menuItemRepo;
        private IGenericRepository<UserMenuItems> _userMenuItemRepo;
        public UserMenuItemController(IGenericRepository<UserTokens> userTokenRepo,
            IGenericRepository<MenuItems> menuItemRepo,
            IGenericRepository<UserMenuItems> userMenuItemRepo)
        {
            _userTokenRepo = userTokenRepo;
            _menuItemRepo = menuItemRepo;
            _userMenuItemRepo = userMenuItemRepo;
        }
        [HttpGet("{refreshToken}")]
        public async Task<IActionResult> Get(string refreshToken)
        {
            var userToken = await _userTokenRepo.FindAsync(q => q.RefreshToken == refreshToken
            && q.ExpireDate >= DateTime.Now);
            if (userToken == null)
            {
                return BadRequest();
            }

            var menuItems = await _userMenuItemRepo.
                GetAsQueryable(q => q.UserId == userToken.UserId).Select(q => q.MenuItem).ToListAsync();

            var finalModel = GenerateMenuItems(menuItems);


            return Ok(finalModel);
        }

        private List<MenuItemViewModel> GenerateMenuItems(List<MenuItems> items)
        {
            var model = new List<MenuItemViewModel>();
            var parents = items.Where(q => q.ParentId == null);
            foreach (var item in parents)
            {
                var parentModel = new MenuItemViewModel
                {
                    Id = item.Id,
                    IsActive = item.IsActive,
                    Name = item.MenuTitle,
                    Path = item.Path,
                };
                foreach (var child in items.Where(q => q.ParentId == item.Id))
                {
                    var childModel = new MenuItemViewModel
                    {
                        Id = child.Id,
                        IsActive = child.IsActive,
                        Name = child.MenuTitle,
                        Path = child.Path,
                        ParentId = item.Id,
                    };
                    parentModel.Children.Add(childModel);
                }
                if (parentModel.Path != null || parentModel.Children.Count > 0)
                    model.Add(parentModel);
            }

            return model;
        }
    }
}