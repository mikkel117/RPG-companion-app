using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTO
{
    public class ItemDTO
    {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public int Quantity { get; set; } = 0;


        public string? Rarity { get; set; }
        public string? Category { get; set; }


        public int StrengthModifier { get; set; } = 0;
        public int DexterityModifier { get; set; } = 0;
        public int IntelligenceModifier { get; set; } = 0;
        public int WisdomModifier { get; set; } = 0;
        public int CharismaModifier { get; set; } = 0;
        public int ConstitutionModifier { get; set; } = 0;
        public bool IsEquipped { get; set; } = false;
    }

    public class CreateItemDTO : ItemDTO
    {
        public int CharacterId { get; set; }
    }

    public class GetItemDTO : ItemDTO
    {
        public int ItemId { get; set; }
        public int CharacterId { get; set; }
    }

    public class UpdateQuantityDTO
    {
        public int Quantity { get; set; }
    }

    public class UpdateItemStatsDTO
    {
        public int? StrengthModifier { get; set; }
        public int? DexterityModifier { get; set; }
        public int? IntelligenceModifier { get; set; }
        public int? WisdomModifier { get; set; }
        public int? CharismaModifier { get; set; }
        public int? ConstitutionModifier { get; set; }
    }

    public class UpdateItemRarityDTO
    {
        public required string Rarity { get; set; }
    }

    /* not sure if it's neede yet */
    public class UpdateItemCategoryDTO
    {
        public required string Category { get; set; }
        public ItemCategoryEnum? CategoryEnum => Enum.TryParse<ItemCategoryEnum>(Category, out var categoryEnum) ? categoryEnum : null;
    }

    public class UpdateItemEquippedDTO
    {
        public bool IsEquipped { get; set; }
    }
}