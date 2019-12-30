using Common;
using Common.DynamicGridModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public interface IGenericQueryRepository<T> where T : class
    {
        Task<FadActionResult<T>> QueryAsync(GridQueryModel args, IList<string> fields = null);
        Task<FadActionResult<DataGridColumn>> GetColumnsAsync(int tableId = 1);
    }

    public class GenericQueryRepository<T> : IGenericQueryRepository<T> where T : class
    {
        private FadContext _context;
        public GenericQueryRepository(FadContext context)
        {
            _context = context;
        }

        public async Task<FadActionResult<T>> QueryAsync(GridQueryModel args = null, IList<string> fields = null)
        {
            var type = System.Reflection.Assembly.GetExecutingAssembly().GetType(nameof(args.Entity));

            var actionResult = new FadActionResult<T>();

            var query = _context.Set<T>().AsQueryable();

            //filter
            if (args != null && args.Filtered != null && args.Filtered.Length > 0)
            {
                var filterExpression = GridQueryUtility.FilterExpression<T>(args.Filtered[0].id, args.Filtered[0].value);
                for (int i = 1; i < args.Filtered.Length; i++)
                {
                    filterExpression = GridQueryUtility.FilterExpression<T>(args.Filtered[i].id, args.Filtered[i].value);
                }
                query = query.Where(filterExpression);
            }

            //total count
            var total = await query.CountAsync();

            //sort
            if (args != null && args.Sorted != null && args.Sorted.Length > 0)
            {
                for (int i = 0; i < args.Sorted.Length; i++)
                {
                    query = query.SortBy(args.Sorted[i].id, args.Sorted[i].desc);
                }
            }


            //projection
            if (fields != null)
                query = query.SelectDynamic(fields);

            var result = await query.Skip(args.Page * args.PageSize)
                .Take(args.PageSize)
                .ToListAsync();

            actionResult.Data = result;
            actionResult.TotalCount = Convert.ToInt32(Math.Ceiling(total / (float)args.PageSize)); ;
            actionResult.CurrentPage = args.Page;

            return actionResult;
        }

        public async Task<FadActionResult<DataGridColumn>> GetColumnsAsync(int tableId = 1)
        {
            //var actionResult = new FadActionResult<DataGridColumn>();

            //var result = await _context.TableColumns.Where(q =>q.TableId == tableId &&  q.IsActive.Value).OrderBy(q => q.SortOrder)
            //    .Select(q => new DataGridColumn
            //    {
            //        Accessor = q.Accessor,
            //        Header = q.Header

            //    }).ToListAsync();

            //actionResult.Data = result;
            //actionResult.TotalCount = 0;

            //return actionResult;
            return null;
        }
    }
}
