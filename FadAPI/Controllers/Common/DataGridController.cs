//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Common;
//using DAL.Repositories;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace FadAPI.Controllers.Common
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DataGridController : BaseController
//    {
//        private IGenericQueryRepository<Personel> _queryService;
//        public DataGridController(IGenericQueryRepository<Personel> queryService)
//        {
//            _queryService = queryService;
//        }

//        /// <summary>
//        /// جستحو در جدول مورد نظر و برگرداندن اطلاعات
//        /// </summary>
//        /// <returns></returns>
//        [HttpPost("Search")]
//        [ProducesResponseType(typeof(GridQueryModel), 200)]
//        public async Task<IActionResult> Search(GridQueryModel model = null)
//        {
//            Type entity = Type.GetType(model.Entity);

//            var _queryService = HttpContext.RequestServices
//                .GetService(typeof(IGenericQueryRepository<Type>)) as IGenericQueryRepository<>;

//            //var actionResult = await _queryService.QueryAsync(model, new List<string> { "Id", "FirstName" });
//            var actionResult = await _queryService.QueryAsync(model);
//            var result = new DataGridModel<Personel>();
//            result.Data = actionResult.Data;
//            result.Pages = actionResult.TotalCount;
//            result.Page = actionResult.CurrentPage;

//            return Ok(result);
//        }

//        /// <summary>
//        /// ستون های جدول
//        /// </summary>
//        /// <returns></returns>
//        [HttpPost("GetColumns")]
//        public async Task<IActionResult> GetColumns()
//        {
//            var actionResult = await _queryService.GetColumnsAsync();
//            var result = new DataGridModel<Personel>();
//            result.Columns = actionResult.Data;
//            return Ok(result);
//        }
//    }
//}