using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Inventory
    {
        public int InventoryId { get; set; }
        public List<Item>? Items { get; set; }
        public int CharacterId { get; set; }
        public Character Character { get; set; }
    }
}