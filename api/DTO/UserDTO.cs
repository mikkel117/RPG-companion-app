using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public ICollection<GetCharacterWithOutRelationsDTO> Characters { get; set; } = [];

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

    public class TokenRequestDTO
    {
        public string Token { get; set; } = string.Empty;
    }
}