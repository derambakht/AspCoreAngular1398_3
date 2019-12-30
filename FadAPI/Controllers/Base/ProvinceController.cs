using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Common;
using DAL.Repositories;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViewModels.Base;
using ViewModels.Common;

namespace FadAPI.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvinceController : BaseController
    {
        private IGenericRepository<Provinces> _provinceRepo;
        private readonly IMapper _mapper;

        public ProvinceController(IGenericRepository<Provinces> cityRepo, IMapper mapper)
        {
            _provinceRepo = cityRepo;
            _mapper = mapper;
        }

      
        [HttpGet("GetForCombo")]
        public async Task<IActionResult> GetForCombo()
        {
            var result = await _provinceRepo.GetAsQueryable().Select(q => new ComboViewModel
            {
                Id = q.Id,
                Title = q.ProvinceName,
            }).ToListAsync();

            return Ok(result);
        }
    };
}