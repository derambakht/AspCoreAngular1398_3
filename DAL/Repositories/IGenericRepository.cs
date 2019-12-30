using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public interface IGenericRepository<T> where T : class
    {

        IQueryable<T>  GetAsQueryable(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "", int page = 1, int pageItemCount = 15);

        Task<T> FindAsync(Expression<Func<T, bool>> filter);
        Task<IReadOnlyList<T>> GetAllAsync(string includeProperties = "");
        Task<int> GetTotalRecordCountAsync(Expression<Func<T, bool>> filter = null);

        Task<T> GetByIdAsync(int id, string includeProperties = "");
        Task<IReadOnlyList<T>> ListAllAsync();
        IReadOnlyList<T> ListForCombo(string fields, Expression<Func<T, bool>> criteria = null);
        Task<T> AddAsync(T entity);
        T Add(T entity);
        Task<List<T>> BulkInsertAsync(List<T> entity);
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task DeleteAsync(int id);
        Task<int> CountAsync(Expression<Func<T, bool>> filter = null);
    }
}
