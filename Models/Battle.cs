using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StarWarsBattleArchives.Models
{
    public class Battle
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Conflict { get; set; }

        [Required]
        public string Era { get; set; }

        [Required]
        public string Date { get; set; }

        [Required]
        public string Location { get; set; }

        [MinLength(1, ErrorMessage = "The Combatants 1 field is required.")]
        public List<string> Combatants1 { get; set; }

        [MinLength(1, ErrorMessage = "The Combatants 2 field is required.")]
        public List<string> Combatants2 { get; set; }
        
        [Required]
        public string Outcome { get; set; }

        [Required]
        public string Description { get; set; }

        
    }
}