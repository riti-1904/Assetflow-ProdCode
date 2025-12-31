using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class FaultsBaseline : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ✅ BASELINE MIGRATION
            // Faults table already exists in the database.
            // No schema changes should be applied here.
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // ✅ BASELINE MIGRATION
            // Nothing to rollback.
        }
    }
}
















//----------c1----------------

// using System;
// using Microsoft.EntityFrameworkCore.Migrations;

// #nullable disable

// namespace AssetFlowBackend.Migrations
// {
//     /// <inheritdoc />
//     public partial class FaultsBaseline : Migration
//     {
//         /// <inheritdoc />
//         protected override void Up(MigrationBuilder migrationBuilder)
//         {
//             migrationBuilder.CreateTable(
//                 name: "Faults",
//                 columns: table => new
//                 {
//                     FaultId = table.Column<int>(type: "int", nullable: false)
//                         .Annotation("SqlServer:Identity", "1, 1"),
//                     AssetId = table.Column<int>(type: "int", nullable: false),
//                     ReportedByUserId = table.Column<int>(type: "int", nullable: false),
//                     AssignedToUserId = table.Column<int>(type: "int", nullable: true),
//                     Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                     Severity = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                     Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
//                     ReportedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
//                     ResolvedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
//                     RootCauseNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
//                     Resolution = table.Column<string>(type: "nvarchar(max)", nullable: true)
//                 },
//                 constraints: table =>
//                 {
//                     table.PrimaryKey("PK_Faults", x => x.FaultId);
//                     table.ForeignKey(
//                         name: "FK_Faults_Assets_AssetId",
//                         column: x => x.AssetId,
//                         principalTable: "Assets",
//                         principalColumn: "asset_id",
//                         onDelete: ReferentialAction.Cascade);
//                     table.ForeignKey(
//                         name: "FK_Faults_Users_AssignedToUserId",
//                         column: x => x.AssignedToUserId,
//                         principalTable: "Users",
//                         principalColumn: "user_id",
//                         onDelete: ReferentialAction.SetNull);
//                     table.ForeignKey(
//                         name: "FK_Faults_Users_ReportedByUserId",
//                         column: x => x.ReportedByUserId,
//                         principalTable: "Users",
//                         principalColumn: "user_id",
//                         onDelete: ReferentialAction.Restrict);
//                 });

//             migrationBuilder.CreateIndex(
//                 name: "IX_Faults_AssetId",
//                 table: "Faults",
//                 column: "AssetId");

//             migrationBuilder.CreateIndex(
//                 name: "IX_Faults_AssignedToUserId",
//                 table: "Faults",
//                 column: "AssignedToUserId");

//             migrationBuilder.CreateIndex(
//                 name: "IX_Faults_ReportedByUserId",
//                 table: "Faults",
//                 column: "ReportedByUserId");
//         }

//         /// <inheritdoc />
//         protected override void Down(MigrationBuilder migrationBuilder)
//         {
//             migrationBuilder.DropTable(
//                 name: "Faults");
//         }
//     }
// }
