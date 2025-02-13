using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class ItemDTO
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? Quantity { get; set; } = 1;
        public string? Rarity { get; set; }
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

    public class UpdateItemDTO : ItemDTO
    {
        public int? ItemId { get; set; }
    }
}