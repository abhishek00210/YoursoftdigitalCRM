using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrmBackendApi.Migrations
{
    /// <inheritdoc />
    public partial class AddInvoiceTotals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItem_Invoices_InvoiceId",
                table: "InvoiceItem");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Invoices");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "Invoices",
                newName: "Total");

            migrationBuilder.RenameColumn(
                name: "TaxAmount",
                table: "Invoices",
                newName: "SGST");

            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "Invoices",
                newName: "CGST");

            migrationBuilder.RenameColumn(
                name: "UnitPrice",
                table: "InvoiceItem",
                newName: "SGST");

            migrationBuilder.RenameColumn(
                name: "ItemName",
                table: "InvoiceItem",
                newName: "Rate");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "InvoiceItem",
                newName: "Hsn");

            migrationBuilder.AlterColumn<Guid>(
                name: "InvoiceId",
                table: "InvoiceItem",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "TEXT");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "InvoiceItem",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CGST",
                table: "InvoiceItem",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "GstPercent",
                table: "InvoiceItem",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "InvoiceItem",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItem_Invoices_InvoiceId",
                table: "InvoiceItem",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvoiceItem_Invoices_InvoiceId",
                table: "InvoiceItem");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "InvoiceItem");

            migrationBuilder.DropColumn(
                name: "CGST",
                table: "InvoiceItem");

            migrationBuilder.DropColumn(
                name: "GstPercent",
                table: "InvoiceItem");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "InvoiceItem");

            migrationBuilder.RenameColumn(
                name: "Total",
                table: "Invoices",
                newName: "TotalAmount");

            migrationBuilder.RenameColumn(
                name: "SGST",
                table: "Invoices",
                newName: "TaxAmount");

            migrationBuilder.RenameColumn(
                name: "CGST",
                table: "Invoices",
                newName: "Discount");

            migrationBuilder.RenameColumn(
                name: "SGST",
                table: "InvoiceItem",
                newName: "UnitPrice");

            migrationBuilder.RenameColumn(
                name: "Rate",
                table: "InvoiceItem",
                newName: "ItemName");

            migrationBuilder.RenameColumn(
                name: "Hsn",
                table: "InvoiceItem",
                newName: "Description");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Invoices",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "InvoiceId",
                table: "InvoiceItem",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InvoiceItem_Invoices_InvoiceId",
                table: "InvoiceItem",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
