using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTO
{
    public class CharacterDTO
    {
        public string Name { get; set; }
        public CharacterClassEnum CharacterClass { get; set; }
        public CharacterRaceEnum CharacterRace { get; set; }
        public int Level { get; set; } = 1;
        public int Health { get; set; }
        public int Strength { get; set; } = 0;
        public int Dexterity { get; set; } = 0;
        public int Intelligence { get; set; } = 0;
        public int Wisdom { get; set; } = 0;
        public int Charisma { get; set; } = 0;
    }

    public class CreateCharacterDTO : CharacterDTO
    {
        public int UserId { get; set; }
    }

    public class getCharacterDTO : CharacterDTO
    {
        public int CharacterId { get; set; }
        public int UserId { get; set; }
        public ICollection<GetItemDTO> Items { get; set; } = [];
        public ICollection<GetQuestDTO> Quests { get; set; } = [];
        public ICollection<GetNoteDTO> Notes { get; set; } = [];
    }
    public class UpdateCharacterHealthDTO
    {
        public int Health { get; set; }
    }

    public class UpdateCharacterLevelDTO
    {
        public int Level { get; set; }
    }

    public class UpdateCharacterStatsDTO
    {
        public int? Strength { get; set; }
        public int? Dexterity { get; set; }
        public int? Intelligence { get; set; }
        public int? Wisdom { get; set; }
        public int? Charisma { get; set; }
    }
}