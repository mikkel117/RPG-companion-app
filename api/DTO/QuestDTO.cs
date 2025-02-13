using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class QuestDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Reward { get; set; }
        public bool Completed { get; set; }
    }

    public class CreateQuestDTO : QuestDTO
    {
        public int CharacterId { get; set; }
    }

    public class GetQuestDTO : QuestDTO
    {
        public int QuestId { get; set; }
        public int CharacterId { get; set; }
    }

    public class UpdateQuestDTO : QuestDTO
    {
        public int QuestId { get; set; }
    }

    public class UpdateQuestCompletedDTO
    {
        public int QuestId { get; set; }
        public bool Completed { get; set; }
    }
}