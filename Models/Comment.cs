using System;

namespace StarWarsBattleArchives.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;
        public int BattleId { get; set; }
    }
}