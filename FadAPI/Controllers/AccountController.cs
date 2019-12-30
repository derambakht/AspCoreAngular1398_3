using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Common;
using DAL.Repositories;
using Entities.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ViewModels.AccessRight;

namespace FadAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("APIPolicy")]
    public class AccountController : ControllerBase
    {
        private IConfiguration _configuration;
        private IGenericRepository<Users> _userRepo;
        private IGenericRepository<UserTokens> _userTokenRepo;
        private int _tokenTimeOut = 20;
        public AccountController(IConfiguration configuration, 
            IGenericRepository<Users> userRepo,
            IGenericRepository<UserTokens> userTokenRepo)
        {
            _configuration = configuration;
            _userRepo = userRepo;
            _userTokenRepo = userTokenRepo;
        }
        /// <summary>
        /// سرویس لاگین با نام کاربری و رمز عبور و دریافت توکن
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel loginInfo)
        {
            var user = await _userRepo.FindAsync(q => q.UserName == loginInfo.UserName);
            if (user == null)
            {
                return BadRequest("invalid username & password");
            }

            var hashPassword = EncyrptionUtility.GenerateHashWithSalt(loginInfo.Password, user.PasswordSalt);
            if (user.Password != hashPassword)
            {
                return BadRequest("invalid username & password");
            }

            var refreshToken = GenerateNewRefreshToken();
            //step 1 : invalid user refresh token
            //step 2 : insert new refreshtoken in db
            var userToken = new UserTokens
            {
                CreateDate = DateTime.Now,
                ExpireDate = DateTime.Now.AddMinutes(_tokenTimeOut),
                IsValid = true,
                RefreshToken = refreshToken,
                UserId = user.Id
            };
            await _userTokenRepo.AddAsync(userToken);

            var model = new LoginResultViewModel
            {
                UserId = user.Id,
                FirstName = user.UserName,
                LastName = "Rezaei",
                Token = GenerateNewToken(user.Id.ToString()),
                RefreshToken = refreshToken
            };
            return Ok(model);

        }


        [HttpGet("GetNewToken")]
        public async Task<IActionResult> GetNewToken(string refreshToken)
        {
            //check refreshToken from db
            var userToken = await _userTokenRepo.FindAsync(q => q.RefreshToken == refreshToken
            && q.IsValid && q.ExpireDate >= DateTime.Now);

            if (userToken != null)
            {
                var newToken = GenerateNewToken(userToken.UserId.ToString());
                var newRefreshToken = GenerateNewRefreshToken();

                //step 1 : invalid(remove) user refresh token
                await _userTokenRepo.DeleteAsync(userToken);

                //step 2 : insert new refreshtoken in db
                var newUserToken = new UserTokens
                {
                    CreateDate = DateTime.Now,
                    ExpireDate = DateTime.Now.AddMinutes(_tokenTimeOut),
                    IsValid = true,
                    RefreshToken = newRefreshToken,
                    UserId = userToken.UserId
                };
                await _userTokenRepo.AddAsync(newUserToken);


                var model = new { token = newToken, refreshToken = newRefreshToken };
                return Ok(model);

            }
            else
            {
                return BadRequest("Invalid Refresh Token");
            }


        }

        private string GenerateNewRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }

        private string GenerateNewToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("TokenKey"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.Name, userId),
                        new Claim("TimeOut-Minute", _tokenTimeOut.ToString()),
                }),

                Expires = DateTime.UtcNow.AddMinutes(_tokenTimeOut),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}