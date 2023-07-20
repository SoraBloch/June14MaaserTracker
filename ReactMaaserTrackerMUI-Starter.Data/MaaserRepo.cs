using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class MaaserRepo
    {
        private readonly string _connectionString;
        public MaaserRepo(string connectionString)
        {
            _connectionString = connectionString;   
        }
        public void AddMaaser(Maaser maaser)
        {
            using var context = new MaaserDataContext(_connectionString);
            context.Add(maaser);
            context.SaveChanges();
        }
        public List<Maaser> GetAllMaaser()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Maaser.ToList();
        }
    }
}
