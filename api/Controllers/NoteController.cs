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
    public class NoteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NoteController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Note
        [HttpGet("character/{characterId}")]
        public async Task<ActionResult<IEnumerable<GetNoteDTO>>> GetQuestsForCharacter(int characterId)
        {
            if (_context.Notes == null)
            {
                return NotFound();
            }

            var notes = await _context.Notes.Where(q => q.CharacterId == characterId).ToListAsync();

            if (notes.Count == 0)
            {
                return NotFound($"No notes found for character with ID {characterId}");
            }

            var noteDTOs = notes.Adapt<IEnumerable<GetNoteDTO>>();
            return noteDTOs.ToList();

        }

        // GET: api/Note/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetNoteDTO>> GetNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return NotFound();
            }

            var notes = await _context.Notes.FirstOrDefaultAsync(n => n.NoteId == id);
            if (notes == null)
            {
                return NotFound();
            }
            var noteDTO = notes.Adapt<GetNoteDTO>();
            return noteDTO;

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, UpdateNoteDTO updateNoteDTO)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            note.Title = updateNoteDTO.Title ?? note.Title;
            note.Content = updateNoteDTO.Content ?? note.Content;
            note.LastUpdated = updateNoteDTO.LastUpdated;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
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

        // POST: api/Note
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(CreateNoteDTO noteDto)
        {

            var note = noteDto.Adapt<Note>();
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNote", new { id = note.NoteId }, note);
        }

        // DELETE: api/Note/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NoteExists(int id)
        {
            return _context.Notes.Any(e => e.NoteId == id);
        }
    }
}
