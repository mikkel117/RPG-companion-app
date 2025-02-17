using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class NoteDTO
    {
        public required string Title { get; set; }
        public required string Content { get; set; }
    }

    public class CreateNoteDTO : NoteDTO
    {
        public DateTime Created { get; set; } = DateTime.Now;
        public int CharacterId { get; set; }
    }

    public class GetNoteDTO : NoteDTO
    {
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime? LastUpdated { get; set; }
        public int NoteId { get; set; }
        public int CharacterId { get; set; }
    }

    public class UpdateNoteDTO : NoteDTO
    {
        public DateTime? LastUpdated { get; set; }
    }
}