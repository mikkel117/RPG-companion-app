using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Quest
    {
        public int QuestId { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public string Reward { get; set; } = "";
        public bool Completed { get; set; } = false;
        public int CharacterId { get; set; }
        public Character Character { get; set; } = null!;
    }
}