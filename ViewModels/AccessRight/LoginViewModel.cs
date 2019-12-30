using System;
using System.Collections.Generic;
using System.Text;

namespace ViewModels.AccessRight
{
    public class LoginResultViewModel
    {
        public Guid UserId { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
    }

    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
