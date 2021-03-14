using Microsoft.EntityFrameworkCore.Migrations;

namespace StarWarsBattleArchives.Migrations
{
    public partial class AddedDescriptionToBattleModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Battles",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Battles");
        }
    }
}
