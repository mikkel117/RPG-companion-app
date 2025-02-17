using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Note
    {
        public int NoteId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public DateTime? LastUpdated { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public int CharacterId { get; set; }
        public Character Character { get; set; } = null!;
    }
}