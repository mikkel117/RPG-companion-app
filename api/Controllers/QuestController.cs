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
    public class QuestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuestController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Quest
        [HttpGet("character/{characterId}")]
        public async Task<ActionResult<IEnumerable<GetQuestDTO>>> GetQuestsForCharacter(int characterId)
        {
            if (_context.Quests == null)
            {
                return NotFound();
            }

            var quests = await _context.Quests.Where(q => q.CharacterId == characterId).ToListAsync();

            if (quests.Count == 0)
            {
                return NotFound($"No quests found for character with ID {characterId}");
            }

            var questDTOs = quests.Adapt<IEnumerable<GetQuestDTO>>();
            return questDTOs.ToList();

        }

        // GET: api/Quest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetQuestDTO>> GetQuest(int id)
        {
            var quest = await _context.Quests.FindAsync(id);

            if (quest == null)
            {
                return NotFound();
            }

            var quests = await _context.Quests.Include(q => q.Character).FirstOrDefaultAsync(q => q.QuestId == id);
            if (quests == null)
            {
                return NotFound();
            }

            var questDTO = quests.Adapt<GetQuestDTO>();
            return questDTO;
        }

        // PUT: api/Quest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuest(int id, UpdateQuestDTO updateQuestDto)
        {
            var quest = await _context.Quests.FindAsync(id);
            if (quest == null)
            {
                return NotFound();
            }

            quest.Name = updateQuestDto.Name ?? quest.Name;
            quest.Description = updateQuestDto.Description ?? quest.Description;
            quest.Reward = updateQuestDto.Reward ?? quest.Reward;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPut("{id}/completed")]
        public async Task<IActionResult> UpdateQuestCompleted(int id, UpdateQuestCompletedDTO updateQuestCompletedDto)
        {
            var quest = await _context.Quests.FindAsync(id);
            if (quest == null)
            {
                return NotFound();
            }

            quest.Completed = updateQuestCompletedDto.Completed;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Quest>> PostQuest(CreateQuestDTO createQuestDto)
        {
            var quest = createQuestDto.Adapt<Quest>();
            _context.Quests.Add(quest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuest", new { id = quest.QuestId }, quest);
        }

        // DELETE: api/Quest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuest(int id)
        {
            var quest = await _context.Quests.FindAsync(id);
            if (quest == null)
            {
                return NotFound();
            }

            _context.Quests.Remove(quest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestExists(int id)
        {
            return _context.Quests.Any(e => e.QuestId == id);
        }
    }
}
