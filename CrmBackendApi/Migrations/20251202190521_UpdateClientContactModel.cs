using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrmBackendApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateClientContactModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ClientContacts",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ClientContacts");
        }
    }
}
