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

        public DbSet<Fault> Faults { get; set; }

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

            // 🔴 FAULT RELATIONSHIPS (FIXED)
            modelBuilder.Entity<Fault>()
                .HasOne(f => f.Asset)
                .WithMany(a => a.Faults)
                .HasForeignKey(f => f.AssetId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Fault>()
                .HasOne(f => f.Reporter)
                .WithMany()
                .HasForeignKey(f => f.ReportedByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Fault>()
                .HasOne(f => f.Technician)
                .WithMany()
                .HasForeignKey(f => f.AssignedToUserId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}










//----------c1---------------

// using Microsoft.EntityFrameworkCore;
// using AssetFlow.Auth.Models;

// namespace AssetFlow.Auth.Data
// {
//     public class UserDbContext : DbContext
//     {
//         public UserDbContext(DbContextOptions<UserDbContext> options)
//             : base(options) { }

//         public DbSet<User> Users { get; set; }
//         public DbSet<Asset> Assets { get; set; }

//         public DbSet<AssetTechnicalSpecification> AssetTechnicalSpecifications { get; set; }
//         public DbSet<AssetAssignment> AssetAssignments { get; set; }
//         public DbSet<AssetMovementHistory> AssetMovementHistories { get; set; }
//         public DbSet<AssetMaintenanceHistory> AssetMaintenanceHistories { get; set; }

//         public DbSet<Fault> Faults { get; set; }

//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             modelBuilder.Entity<Asset>()
//                 .HasOne(a => a.TechnicalSpecification)
//                 .WithOne(t => t.Asset)
//                 .HasForeignKey<AssetTechnicalSpecification>(t => t.AssetId);

//             modelBuilder.Entity<Asset>()
//                 .HasOne(a => a.Assignment)
//                 .WithOne(a => a.Asset)
//                 .HasForeignKey<AssetAssignment>(a => a.AssetId);

//             modelBuilder.Entity<AssetMovementHistory>()
//                 .HasOne(m => m.Asset)
//                 .WithMany(a => a.Movements)
//                 .HasForeignKey(m => m.AssetId);

//             modelBuilder.Entity<AssetMaintenanceHistory>()
//                 .HasOne(m => m.Asset)
//                 .WithMany(a => a.MaintenanceHistory)
//                 .HasForeignKey(m => m.AssetId);

//             modelBuilder.Entity<Fault>()
//                 .HasOne(f => f.Asset)
//                 .WithMany(a => a.MaintenanceHistory)   // or create Faults collection later
//                 .HasForeignKey(f => f.AssetId);

//             modelBuilder.Entity<Fault>()
//                 .HasOne(f => f.Reporter)
//                 .WithMany()
//                 .HasForeignKey(f => f.ReportedByUserId);

//             modelBuilder.Entity<Fault>()
//                 .HasOne(f => f.Technician)
//                 .WithMany()
//                 .HasForeignKey(f => f.TechnicianId);

//         }
//     }
// }
