using Microsoft.EntityFrameworkCore.Migrations;

namespace StarWarsBattleArchives.Migrations
{
    public partial class AddPhotoURLToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoURL",
                table: "Users",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoURL",
                table: "Users");
        }
    }
}
