using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Mapster;
using api.DTO;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CharacterController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Character
        [HttpGet]
        public async Task<ActionResult<IEnumerable<getCharacterDTO>>> GetCharacters()
        {
            if (_context.Characters == null)
            {
                return NotFound();
            }

            var characters = await _context.Characters.Include(c => c.Items).Include(c => c.Quests).Include(c => c.Notes).ToListAsync();
            var characterDTOs = characters.Adapt<IEnumerable<getCharacterDTO>>();
            return characterDTOs.ToList();
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<getCharacterDTO>>> GetCharactersForUser(int userId)
        {
            if (_context.Quests == null)
            {
                return NotFound();
            }

            var character = await _context.Characters.Where(q => q.UserId == userId).ToListAsync();

            if (character.Count == 0)
            {
                return NotFound($"No character found for user with ID {userId}");
            }

            var characterDTOs = character.Adapt<IEnumerable<getCharacterDTO>>();
            return characterDTOs.ToList();

        }

        // GET: api/Character/5
        [HttpGet("{id}")]
        public async Task<ActionResult<getCharacterDTO>> GetCharacter(int id)
        {
            if (_context.Characters == null)
            {
                return NotFound();
            }

            var character = await _context.Characters.Include(c => c.Items).Include(c => c.Quests).Include(c => c.Notes).FirstOrDefaultAsync(c => c.CharacterId == id);
            if (character == null)
            {
                return NotFound();
            }

            var characterDTO = character.Adapt<getCharacterDTO>();
            return characterDTO;
        }

        [HttpPut("{id}/health")]
        public async Task<IActionResult> UpdateCharacterHealth(int id, UpdateCharacterHealthDTO updateCharacterHealthDTO)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            character.Health = updateCharacterHealthDTO.Health;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
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

        [HttpPut("{id}/level")]
        public async Task<IActionResult> UpdateCharacterLevel(int id, UpdateCharacterLevelDTO updateCharacterLevelDTO)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            character.Level = updateCharacterLevelDTO.Level;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
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

        [HttpPut("{id}/stats")]
        public async Task<IActionResult> UpdateCharacterStats(int id, UpdateCharacterStatsDTO updateCharacterStatsDTO)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            if (updateCharacterStatsDTO.Strength != null)
            {
                character.Strength = (int)updateCharacterStatsDTO.Strength;
            }
            if (updateCharacterStatsDTO.Dexterity != null)
            {
                character.Dexterity = (int)updateCharacterStatsDTO.Dexterity;
            }
            if (updateCharacterStatsDTO.Intelligence != null)
            {
                character.Intelligence = (int)updateCharacterStatsDTO.Intelligence;
            }
            if (updateCharacterStatsDTO.Wisdom != null)
            {
                character.Wisdom = (int)updateCharacterStatsDTO.Wisdom;
            }
            if (updateCharacterStatsDTO.Charisma != null)
            {
                character.Charisma = (int)updateCharacterStatsDTO.Charisma;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Stats updated successfully" });
        }


        // POST: api/Character
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CreateCharacterDTO>> PostCharacter(CreateCharacterDTO characterDTO)
        {
            var user = await _context.Users.FindAsync(characterDTO.UserId);
            if (user == null)
            {
                return NotFound();
            }
            var character = characterDTO.Adapt<Character>();
            _context.Characters.Add(character);


            try
            {


                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.InnerException.Message);
            }

            return CreatedAtAction("GetCharacter", new { id = character.CharacterId }, characterDTO);
        }

        // DELETE: api/Character/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            var character = await _context.Characters.FindAsync(id);
            if (character == null)
            {
                return NotFound();
            }

            _context.Characters.Remove(character);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CharacterExists(int id)
        {
            return _context.Characters.Any(e => e.CharacterId == id);
        }
    }
}
