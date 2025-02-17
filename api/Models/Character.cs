using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public enum CharacterClassEnum
{
    Barbarian,
    Fighter,
    Sorcerer,
}

public enum CharacterRaceEnum
{
    Human,
    Elf,
}

namespace api.Models
{
    public class Character
    {
        public int CharacterId { get; set; }
        public required string Name { get; set; }
        public CharacterClassEnum CharacterClass { get; set; }
        public CharacterRaceEnum CharacterRace { get; set; }
        public int Level
        { get; set; } = 1;
        public int Health { get; set; }

        public int Strength { get; set; } = 0;
        public int Dexterity { get; set; } = 0;
        public int Intelligence { get; set; } = 0;
        public int Wisdom { get; set; } = 0;
        public int Charisma { get; set; } = 0;

        public ICollection<Item>? Items { get; set; }
        public ICollection<Quest>? Quests { get; set; }
        public ICollection<Note>? Notes { get; set; }


        public int UserId { get; set; }
        public User User { get; set; } = null!;

    }
}