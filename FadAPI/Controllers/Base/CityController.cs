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

namespace FadAPI.Controllers.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : BaseController
    {
        private IGenericRepository<Cities> _cityRepo;
        private readonly IMapper _mapper;

        public CityController(IGenericRepository<Cities> cityRepo, IMapper mapper)
        {
            _cityRepo = cityRepo;
            _mapper = mapper;
        }

        /// <summary>
        /// جستحو در جدول مورد نظر و برگرداندن اطلاعات
        /// </summary>
        /// <returns></returns>
        [HttpPost("Search")]
        [ProducesResponseType(typeof(GridQueryModel), 200)]
        public async Task<IActionResult> Search(GridQueryModel model = null)
        {
            Type entity = Type.GetType(model.Entity);

            var _queryService = HttpContext.RequestServices
                .GetService(typeof(IGenericQueryRepository<Cities>)) as IGenericQueryRepository<Cities>;

            //var actionResult = await _queryService.QueryAsync(model, new List<string> { "Id", "FirstName" });
            var actionResult = await _queryService.QueryAsync(model);
            var result = new DataGridModel<Cities>();
            result.Data = actionResult.Data;
            result.Pages = actionResult.TotalCount;
            result.Page = actionResult.CurrentPage;

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> Get(int page = 1, int pageItems = 5)
        {
            var result = await _cityRepo.GetAsQueryable(page:page, pageItemCount:pageItems, includeProperties:"Province").ToListAsync();
            var model = _mapper.Map<List<CityViewModel>>(result);
            
            var actionResult = new FadActionResult<CityViewModel>();
            actionResult.Data = model;
            actionResult.CurrentPage = page;
            actionResult.IsSuccess = true;
            actionResult.TotalCount = await _cityRepo.GetTotalRecordCountAsync();
            actionResult.Pages = Convert.ToInt32(Math.Ceiling((double)actionResult.TotalCount / pageItems));

            return Ok(actionResult);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _cityRepo.GetByIdAsync(id);
            var model = _mapper.Map<CityViewModel>(result);
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CityViewModel model)
        {
            var entity = new Cities
            {
                ProvinceId = model.ProvinceId,
                CityName = model.CityName,
                Body = model.Body,
                SortOrder = model.SortOrder
            };
            await _cityRepo.AddAsync(entity);
            model.Id = entity.Id;
            return Ok(model);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id , [FromBody]CityViewModel model)
        {
            var entity = new Cities
            {
                Id = id,
                ProvinceId = model.ProvinceId,
                CityName = model.CityName,
                Body = model.Body,
                SortOrder = model.SortOrder
            };
            await _cityRepo.UpdateAsync(entity);
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _cityRepo.DeleteAsync(id);
            return Ok();
        }

    };
}