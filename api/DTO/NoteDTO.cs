using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class NoteDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
    }

    public class CreateNoteDTO : NoteDTO
    {
        public int CharacterId { get; set; }
    }

    public class GetNoteDTO : NoteDTO
    {
        public int NoteId { get; set; }
        public int CharacterId { get; set; }
    }

    public class UpdateNoteDTO : NoteDTO
    {
        public int NoteId { get; set; }
    }
}