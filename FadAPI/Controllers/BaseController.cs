using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FadAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("APIPolicy")]
    [Authorize]
    public class BaseController : ControllerBase
    {
    }
}