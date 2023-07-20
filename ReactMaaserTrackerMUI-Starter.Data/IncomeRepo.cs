using Microsoft.EntityFrameworkCore;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class IncomeRepo
    {
        private readonly string _connectionString;
        public IncomeRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddIncome(Income income, string sourceName)
        {
            using var context = new MaaserDataContext(_connectionString);
            var sourceId = context.Sources.FirstOrDefault(s => s.Name == sourceName).Id;
            income.SourceId = sourceId;
            context.Add(income);
            context.SaveChanges();
        }
        public List<Income> GetAllIncomesWithSources()
        {
            using var context = new MaaserDataContext(_connectionString);
            var incomesWithSources = context.Incomes.Select(i => new Income
            {
                Id = i.Id,
                Amount = i.Amount,
                Date = i.Date,
                Source = context.Sources.FirstOrDefault(s => s.Id == i.SourceId)
            }).ToList();

            return incomesWithSources;
        }
        public void AddSource(string name)
        {
            using var context = new MaaserDataContext(_connectionString);
            var source = new Source{ Name =  name};
            context.Add(source);
            context.SaveChanges();
        }
        public void EditSource(Source s)
        {
            using var context = new MaaserDataContext(_connectionString);
            var source = context.Sources.FirstOrDefault(source => source.Id == s.Id);
            if (source != null)
            {
                source.Name = s.Name;
                context.SaveChanges();
            }
        }
        public void DeleteSource(Source s)
        {
            using var context = new MaaserDataContext(_connectionString);
            var source = context.Sources.FirstOrDefault(source => source.Id == s.Id);
            if (source != null)
            {
                context.Remove(source);
                context.SaveChanges();
            }
        }
        public List<Source> GetAllSources()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Sources.ToList();
        }
        public List<Source> GetAllSourcesWithIncomes()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Sources.Include(s => s.Incomes).Where(s => s.Incomes.Any()).ToList();
        }
        public List<Income> GetAllIncomes()
        {
            using var context = new MaaserDataContext(_connectionString);
            return context.Incomes.ToList();
        }
    }
}
