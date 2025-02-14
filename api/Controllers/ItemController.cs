using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.DTO;
using Mapster;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ItemController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Item
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItem()
        {
            var items = await _context.Item.ToListAsync();
            var itemDto = items.Select(item => new GetItemDTO
            {
                ItemId = item.ItemId,
                Name = item.Name,
                Description = item.Description,
                Quantity = item.Quantity,
                Rarity = item.Rarity.ToString(),
                Category = item.Category.ToString(),
                StrengthModifier = item.StrengthModifier,
                DexterityModifier = item.DexterityModifier,
                IntelligenceModifier = item.IntelligenceModifier,
                WisdomModifier = item.WisdomModifier,
                CharismaModifier = item.CharismaModifier,
                ConstitutionModifier = item.ConstitutionModifier,
                IsEquipped = item.IsEquipped,
                CharacterId = item.CharacterId
            }).ToList();

            return Ok(itemDto);
        }

        // GET: api/Item/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDTO>> GetItem(int id)
        {
            var item = await _context.Item.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            var itemDto = new GetItemDTO
            {
                ItemId = item.ItemId,
                Name = item.Name,
                Description = item.Description,
                Quantity = item.Quantity,
                Rarity = item.Rarity.ToString(),
                Category = item.Category.ToString(),
                StrengthModifier = item.StrengthModifier,
                DexterityModifier = item.DexterityModifier,
                IntelligenceModifier = item.IntelligenceModifier,
                WisdomModifier = item.WisdomModifier,
                CharismaModifier = item.CharismaModifier,
                ConstitutionModifier = item.ConstitutionModifier,
                IsEquipped = item.IsEquipped,
                CharacterId = item.CharacterId
            };

            return itemDto;
        }

        [HttpPut("{id}/quantity")]
        public async Task<ActionResult<UpdateQuantityDTO>> UpdateItemQuantity(int id, UpdateQuantityDTO updateQuantityDTO)
        {
            var item = await _context.Item.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            item.Quantity = updateQuantityDTO.Quantity;

            await _context.SaveChangesAsync();

            return updateQuantityDTO;
        }

        [HttpPut("{id}/stats")]
        public async Task<ActionResult<UpdateItemStatsDTO>> UpdateItemStats(int id, UpdateItemStatsDTO updateItemStatsDTO)
        {
            var item = await _context.Item.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            item.StrengthModifier = updateItemStatsDTO.StrengthModifier ?? item.StrengthModifier;
            item.DexterityModifier = updateItemStatsDTO.DexterityModifier ?? item.DexterityModifier;
            item.IntelligenceModifier = updateItemStatsDTO.IntelligenceModifier ?? item.IntelligenceModifier;
            item.WisdomModifier = updateItemStatsDTO.WisdomModifier ?? item.WisdomModifier;
            item.CharismaModifier = updateItemStatsDTO.CharismaModifier ?? item.CharismaModifier;
            item.ConstitutionModifier = updateItemStatsDTO.ConstitutionModifier ?? item.ConstitutionModifier;

            await _context.SaveChangesAsync();

            return updateItemStatsDTO;
        }

        [HttpPut("{id}/rarity")]
        public async Task<ActionResult<UpdateItemRarityDTO>> UpdateItemRarity(int id, UpdateItemRarityDTO updateItemRarityDTO)
        {
            var item = await _context.Item.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            var RarityCheck = Enum.TryParse(updateItemRarityDTO.Rarity, out RarityEnum rarityEnum);

            if (!RarityCheck)
            {
                return BadRequest("Invalid Rarity");
            }

            item.Rarity = rarityEnum;

            await _context.SaveChangesAsync();

            return updateItemRarityDTO;
        }

        [HttpPut("{id}/Equipped")]
        public async Task<ActionResult<UpdateItemEquippedDTO>> UpdateItemEquipped(int id, UpdateItemEquippedDTO updateItemEquippedDTO)
        {
            var item = await _context.Item.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            item.IsEquipped = updateItemEquippedDTO.IsEquipped;

            await _context.SaveChangesAsync();

            return updateItemEquippedDTO;
        }

        // POST: api/Item
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CreateItemDTO>> PostItem(CreateItemDTO itemDto)
        {
            var RarityCheck = Enum.TryParse(itemDto.Rarity, out RarityEnum rarityEnum);
            var CategoryCheck = Enum.TryParse(itemDto.Category, out ItemCategoryEnum categoryEnum);

            if (!RarityCheck || !CategoryCheck)
            {
                return BadRequest("Invalid Rarity or Category");
            }

            var newItem = new Item
            {
                Name = itemDto.Name ?? "Unknown",
                Description = itemDto.Description ?? "",
                Quantity = itemDto.Quantity,
                Rarity = rarityEnum,
                Category = categoryEnum,
                StrengthModifier = itemDto.StrengthModifier,
                DexterityModifier = itemDto.DexterityModifier,
                IntelligenceModifier = itemDto.IntelligenceModifier,
                WisdomModifier = itemDto.WisdomModifier,
                CharismaModifier = itemDto.CharismaModifier,
                ConstitutionModifier = itemDto.ConstitutionModifier,
                IsEquipped = itemDto.IsEquipped,
                CharacterId = itemDto.CharacterId
            };

            var item = newItem.Adapt<Item>();
            _context.Item.Add(item);
            await _context.SaveChangesAsync();

            /* var item = itemDto.Adapt<Item>();
            _context.Item.Add(item);
            await _context.SaveChangesAsync(); */

            return CreatedAtAction("GetItem", new { id = item.ItemId }, item);
            /* return Ok("okay"); */
        }

        // DELETE: api/Item/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Item.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Item.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Item.Any(e => e.ItemId == id);
        }
    }
}
