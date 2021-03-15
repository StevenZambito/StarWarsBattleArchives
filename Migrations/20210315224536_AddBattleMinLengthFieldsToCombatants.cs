using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StarWarsBattleArchives.Migrations
{
    public partial class AddBattleMinLengthFieldsToCombatants : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<string>>(
                name: "Combatants2",
                table: "Battles",
                type: "text[]",
                nullable: true,
                oldClrType: typeof(string[]),
                oldType: "text[]");

            migrationBuilder.AlterColumn<List<string>>(
                name: "Combatants1",
                table: "Battles",
                type: "text[]",
                nullable: true,
                oldClrType: typeof(string[]),
                oldType: "text[]");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string[]>(
                name: "Combatants2",
                table: "Battles",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0],
                oldClrType: typeof(List<string>),
                oldType: "text[]",
                oldNullable: true);

            migrationBuilder.AlterColumn<string[]>(
                name: "Combatants1",
                table: "Battles",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0],
                oldClrType: typeof(List<string>),
                oldType: "text[]",
                oldNullable: true);
        }
    }
}
