using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrmBackendApi.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_EventTypes_EventTypeId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "BookingId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "CustomerEmail",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "CustomerName",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "HostUserId",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "StartAt",
                table: "Bookings",
                newName: "StartTime");

            migrationBuilder.RenameColumn(
                name: "PaymentStatus",
                table: "Bookings",
                newName: "Notes");

            migrationBuilder.RenameColumn(
                name: "EventTypeId",
                table: "Bookings",
                newName: "ServiceId");

            migrationBuilder.RenameColumn(
                name: "EndAt",
                table: "Bookings",
                newName: "EndTime");

            migrationBuilder.RenameColumn(
                name: "CustomerPhone",
                table: "Bookings",
                newName: "AppointmentDate");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_EventTypeId",
                table: "Bookings",
                newName: "IX_Bookings_ServiceId");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Bookings",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Bookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "InvoiceId",
                table: "Bookings",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProviderId",
                table: "Bookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Providers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Specialization = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Phone = table.Column<string>(type: "TEXT", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Providers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    DurationMinutes = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_ProviderId",
                table: "Bookings",
                column: "ProviderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Providers_ProviderId",
                table: "Bookings",
                column: "ProviderId",
                principalTable: "Providers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_Services_ServiceId",
                table: "Bookings",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Providers_ProviderId",
                table: "Bookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Bookings_Services_ServiceId",
                table: "Bookings");

            migrationBuilder.DropTable(
                name: "Providers");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Bookings_ProviderId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "ProviderId",
                table: "Bookings");

            migrationBuilder.RenameColumn(
                name: "StartTime",
                table: "Bookings",
                newName: "StartAt");

            migrationBuilder.RenameColumn(
                name: "ServiceId",
                table: "Bookings",
                newName: "EventTypeId");

            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "Bookings",
                newName: "PaymentStatus");

            migrationBuilder.RenameColumn(
                name: "EndTime",
                table: "Bookings",
                newName: "EndAt");

            migrationBuilder.RenameColumn(
                name: "AppointmentDate",
                table: "Bookings",
                newName: "CustomerPhone");

            migrationBuilder.RenameIndex(
                name: "IX_Bookings_ServiceId",
                table: "Bookings",
                newName: "IX_Bookings_EventTypeId");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Bookings",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "BookingId",
                table: "Bookings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CustomerEmail",
                table: "Bookings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CustomerName",
                table: "Bookings",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "HostUserId",
                table: "Bookings",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Bookings_EventTypes_EventTypeId",
                table: "Bookings",
                column: "EventTypeId",
                principalTable: "EventTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
