using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Character> Characters { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<User> Users { get; set; }


        /* protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Character>()
                .HasOne(c => c.Inventory)
                .WithOne(i => i.Character)
                .HasForeignKey<Inventory>(i => i.CharacterId);

            modelBuilder.Entity<Character>()
                .HasMany(c => c.Quests)
                .WithOne(q => q.Character)
                .HasForeignKey(q => q.CharacterId);

            modelBuilder.Entity<Character>()
                .HasMany(c => c.Notes)
                .WithOne(n => n.Character)
                .HasForeignKey(n => n.CharacterId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Characters)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);
        } */
    }
}