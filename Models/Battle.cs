using System.Collections.Generic;

namespace StarWarsBattleArchives.Models
{
    public class Battle
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Conflict { get; set; }

        public string Era { get; set; }

        public string Date { get; set; }

        public string Location { get; set; }

        public List<string> Combatants1 { get; set; }

        public List<string> Combatants2 { get; set; }

        public string Outcome { get; set; }

        public string Description { get; set; }

        
    }
}