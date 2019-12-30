using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities.Models
{
    public partial class FadContext : DbContext
    {
        public FadContext()
        {
        }

        public FadContext(DbContextOptions<FadContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cities> Cities { get; set; }
        public virtual DbSet<MenuItems> MenuItems { get; set; }
        public virtual DbSet<Provinces> Provinces { get; set; }
        public virtual DbSet<UserMenuItems> UserMenuItems { get; set; }
        public virtual DbSet<UserTokens> UserTokens { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=FadSolutionDB;Persist Security Info=True;User ID=sa;Password=123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cities>(entity =>
            {
                entity.HasOne(d => d.Province)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.ProvinceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cities_Provinces");
            });

            modelBuilder.Entity<UserMenuItems>(entity =>
            {
                entity.HasOne(d => d.MenuItem)
                    .WithMany(p => p.UserMenuItems)
                    .HasForeignKey(d => d.MenuItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserMenuItems_MenuItems");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserMenuItems)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserMenuItems_Users");
            });

            modelBuilder.Entity<UserTokens>(entity =>
            {
                entity.Property(e => e.RefreshToken).IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Password).IsUnicode(false);

                entity.Property(e => e.PasswordSalt).IsUnicode(false);

                entity.Property(e => e.Thumbnail).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
