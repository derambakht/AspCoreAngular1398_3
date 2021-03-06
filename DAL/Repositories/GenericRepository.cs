﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly FadContext _dbContext;

        public GenericRepository(FadContext dbContext)
        {
            _dbContext = dbContext;
        }
     

        public async Task<(IReadOnlyList<T> List, int Count)> GetAsync(
          Expression<Func<T, bool>> filter = null,
          Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
          string includeProperties = "", int page = 1, int pageItemCount = 15)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            try
            {
                if (filter != null)
                {
                    query = query.Where(filter);
                }

                if (!string.IsNullOrEmpty(includeProperties))
                {
                    foreach (var includeProperty in includeProperties.Split
                    (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                    {
                        query = query.Include(includeProperty);
                    }
                }

                if (orderBy != null)
                {
                    query = orderBy(query);
                }

                int count = query.Count();

                if (page == 0)
                {
                    return (await query.ToListAsync(), count);
                }
                else
                {
                    query = query.Skip((page - 1) * pageItemCount).Take(pageItemCount);

                    var result = await query.ToListAsync();

                    return (result, count);
                }
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }

        public IQueryable<T> GetAsQueryable(
          Expression<Func<T, bool>> filter = null,
          Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
          string includeProperties = "", int page = 1, int pageItemCount = 15)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (!string.IsNullOrEmpty(includeProperties))
            {
                foreach (var includeProperty in includeProperties.Split
                               (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            int count = 0;

            try
            {
                count = query.Count();

                if (page != 0)
                {
                    query = query.Skip((page - 1) * pageItemCount).Take(pageItemCount);
                }

                return query;
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }


        public async Task<T> FindAsync(Expression<Func<T, bool>> filter)
        {
           return await _dbContext.Set<T>().FirstOrDefaultAsync(filter);
        }


        public async Task<int> GetTotalRecordCountAsync(Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            if (filter != null)
            {
                query = query.Where(filter);
            }
            var totalRecordCount = await query.CountAsync();
            return totalRecordCount;
        }

        public async Task<IReadOnlyList<T>> GetAllAsync(string includeProperties = "")
        {
            if (!string.IsNullOrEmpty(includeProperties))
                return await _dbContext.Set<T>().Include(includeProperties).ToListAsync();
            else
                return await _dbContext.Set<T>().ToListAsync();

        }

        public virtual async Task<T> GetByIdAsync(int id, string includeProperties = "")
        {
            try
            {
                var model = await _dbContext.Set<T>().FindAsync(id);
                if (!string.IsNullOrEmpty(includeProperties))
                {
                    foreach (var includeProperty in includeProperties.Split
                                   (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                    {
                        _dbContext.Entry(model).Reference(includeProperty).Load();
                    }
                }

                return model;
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }


        public IReadOnlyList<T> ListForCombo(string fields = "ID,Title", Expression<Func<T, bool>> criteria = null)
        {
            try
            {
                if (criteria is null)
                    return _dbContext.Set<T>().Select(CreateSelectStatement(fields)).ToList();
                else
                    return _dbContext.Set<T>().Where(criteria).Select(CreateSelectStatement(fields)).ToList();
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.CountAsync();
        }


        public async Task<T> AddAsync(T entity)
        {
            try
            {
                await _dbContext.Set<T>().AddAsync(entity);
                await _dbContext.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }

        public T Add(T entity)
        {
            try
            {
                _dbContext.Set<T>().Add(entity);
                _dbContext.SaveChanges();
                return entity;
            }
         
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }

        public async Task<List<T>> BulkInsertAsync(List<T> entities)
        {
            //await _dbContext.BulkInsertAsync(entities);
            //return entities;
            return null;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            try
            {
                _dbContext.Entry(entity).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }

        public async Task DeleteAsync(T entity)
        {
            try
            {
                _dbContext.Set<T>().Remove(entity);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var entity = await GetByIdAsync(id);
                await DeleteAsync(entity);
            }
            catch (Exception ex)
            {
                //LogError(MethodBase.GetCurrentMethod().Name, ex);
                throw ex;
            }
        }
        Func<T, T> CreateSelectStatement(string fields)
        {
            // input parameter "o"
            var xParameter = Expression.Parameter(typeof(T), "o");

            // new statement "new Data()"
            var xNew = Expression.New(typeof(T));

            // create initializers
            var bindings = fields.Split(',').Select(o => o.Trim())
                .Select(o =>
                {

                    // property "Field1"
                    var mi = typeof(T).GetProperty(o);

                    // original value "o.Field1"
                    var xOriginal = Expression.Property(xParameter, mi);

                    // set value "Field1 = o.Field1"
                    return Expression.Bind(mi, xOriginal);
                }
            );

            // initialization "new Data { Field1 = o.Field1, Field2 = o.Field2 }"
            var xInit = Expression.MemberInit(xNew, bindings);

            // expression "o => new Data { Field1 = o.Field1, Field2 = o.Field2 }"
            var lambda = Expression.Lambda<Func<T, T>>(xInit, xParameter);

            // compile to Func<Data, Data>
            return lambda.Compile();
        }
    }
}
