using Microsoft.EntityFrameworkCore;
using AssetFlow.Auth.Models;

namespace AssetFlow.Auth.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Asset> Assets { get; set; }

        public DbSet<AssetTechnicalSpecification> AssetTechnicalSpecifications { get; set; }
        public DbSet<AssetAssignment> AssetAssignments { get; set; }
        public DbSet<AssetMovementHistory> AssetMovementHistories { get; set; }
        public DbSet<AssetMaintenanceHistory> AssetMaintenanceHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Asset>()
                .HasOne(a => a.TechnicalSpecification)
                .WithOne(t => t.Asset)
                .HasForeignKey<AssetTechnicalSpecification>(t => t.AssetId);

            modelBuilder.Entity<Asset>()
                .HasOne(a => a.Assignment)
                .WithOne(a => a.Asset)
                .HasForeignKey<AssetAssignment>(a => a.AssetId);

            modelBuilder.Entity<AssetMovementHistory>()
                .HasOne(m => m.Asset)
                .WithMany(a => a.Movements)
                .HasForeignKey(m => m.AssetId);

            modelBuilder.Entity<AssetMaintenanceHistory>()
                .HasOne(m => m.Asset)
                .WithMany(a => a.MaintenanceHistory)
                .HasForeignKey(m => m.AssetId);
        }
    }
}
