using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetFlowBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    asset_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    das_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    user_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    assets_location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    make = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    laptop_category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    laptop_assets_tag = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    power_adapter_details = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    assignment_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    install_status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    assets_status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    additional_16gb_ram_status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    assets_procure_status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    warranty_start_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    warranty_expired_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ageing_of_assets = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.asset_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    azure_ad_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "AssetAssignments",
                columns: table => new
                {
                    assignment_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    asset_id = table.Column<int>(type: "int", nullable: false),
                    current_location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    owner = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    custodian = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetAssignments", x => x.assignment_id);
                    table.ForeignKey(
                        name: "FK_AssetAssignments_Assets_asset_id",
                        column: x => x.asset_id,
                        principalTable: "Assets",
                        principalColumn: "asset_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetMaintenanceHistories",
                columns: table => new
                {
                    maintenance_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    asset_id = table.Column<int>(type: "int", nullable: false),
                    maintenance_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    technician = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    maintenance_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetMaintenanceHistories", x => x.maintenance_id);
                    table.ForeignKey(
                        name: "FK_AssetMaintenanceHistories_Assets_asset_id",
                        column: x => x.asset_id,
                        principalTable: "Assets",
                        principalColumn: "asset_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetMovementHistories",
                columns: table => new
                {
                    movement_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    asset_id = table.Column<int>(type: "int", nullable: false),
                    movement_type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    from_location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    to_location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    moved_by = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    movement_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetMovementHistories", x => x.movement_id);
                    table.ForeignKey(
                        name: "FK_AssetMovementHistories_Assets_asset_id",
                        column: x => x.asset_id,
                        principalTable: "Assets",
                        principalColumn: "asset_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetTechnicalSpecifications",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    asset_id = table.Column<int>(type: "int", nullable: false),
                    processor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ram = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    storage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    display = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    gpu = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetTechnicalSpecifications", x => x.id);
                    table.ForeignKey(
                        name: "FK_AssetTechnicalSpecifications_Assets_asset_id",
                        column: x => x.asset_id,
                        principalTable: "Assets",
                        principalColumn: "asset_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetAssignments_asset_id",
                table: "AssetAssignments",
                column: "asset_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AssetMaintenanceHistories_asset_id",
                table: "AssetMaintenanceHistories",
                column: "asset_id");

            migrationBuilder.CreateIndex(
                name: "IX_AssetMovementHistories_asset_id",
                table: "AssetMovementHistories",
                column: "asset_id");

            migrationBuilder.CreateIndex(
                name: "IX_AssetTechnicalSpecifications_asset_id",
                table: "AssetTechnicalSpecifications",
                column: "asset_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetAssignments");

            migrationBuilder.DropTable(
                name: "AssetMaintenanceHistories");

            migrationBuilder.DropTable(
                name: "AssetMovementHistories");

            migrationBuilder.DropTable(
                name: "AssetTechnicalSpecifications");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Assets");
        }
    }
}
