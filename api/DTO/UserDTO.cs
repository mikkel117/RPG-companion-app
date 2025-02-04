using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class UserDTO
    {
        public string Username { get; set; }
    }

    public class UserRegisterDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    public class UserLoginDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}