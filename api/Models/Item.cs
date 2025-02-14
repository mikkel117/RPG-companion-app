using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public enum RarityEnum
    {
        Common,
        Uncommon,
        Rare,
        VeryRare,
        Legendary,
        Artifact
    }

    public enum ItemCategoryEnum
    {
        Weapon,
        Armor,
        Consumable,
        Tool,
        Miscellaneous
    }




    public class Item
    {
        public int ItemId { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public int Quantity { get; set; } = 1;
        public RarityEnum Rarity { get; set; }
        public ItemCategoryEnum Category { get; set; }

        /* public string RarityString => Rarity.ToString();
        public string CategoryString => Category.ToString(); */


        public int StrengthModifier { get; set; } = 0;
        public int DexterityModifier { get; set; } = 0;
        public int IntelligenceModifier { get; set; } = 0;
        public int WisdomModifier { get; set; } = 0;
        public int CharismaModifier { get; set; } = 0;
        public int ConstitutionModifier { get; set; } = 0;


        public bool IsEquipped { get; set; } = false;
        public int CharacterId { get; set; }
        public Character Character { get; set; } = null!;
    }
}