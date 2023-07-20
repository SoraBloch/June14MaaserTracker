using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;
using ReactMaaserTrackerMUI_Starter.Web.ViewModels;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly string _connectionString;
        public IncomeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getallincomeswithsources")]
        public List<Income> GetAllIncomesWithSources()
        {
            var repo = new IncomeRepo(_connectionString);
            return repo.GetAllIncomesWithSources();
        }
        [HttpGet]
        [Route("getallsources")]
        public List<Source> GetAllSources()
        {
            var repo = new IncomeRepo(_connectionString);
            return repo.GetAllSources();
        }
        [HttpGet]
        [Route("getallsourceswithincomes")]
        public List<Source> GetAllSourcesWithIncomes()
        {
            var repo = new IncomeRepo(_connectionString);
            return repo.GetAllSourcesWithIncomes();
        }
        [HttpPost]
        [Route("addincome")]
        public void AddIncome(AddIncomeViewModel vm)
        {
            var income = new Income
            {
                Amount = vm.Amount,
                Date = vm.Date
            };
            var repo = new IncomeRepo(_connectionString);
            repo.AddIncome(income, vm.SourceName);
        }
        [HttpPost]
        [Route("addsource")]
        public void AddSource(string name)
        {
            var repo = new IncomeRepo(_connectionString);
            repo.AddSource(name);
        }

        [HttpPost]
        [Route("editsource")]
        public void EditSource(Source source)
        {
            var repo = new IncomeRepo(_connectionString);
            repo.EditSource(source);
        }
        [HttpPost]
        [Route("deletesource")]
        public void DeleteSource(Source source)
        {
            var repo = new IncomeRepo(_connectionString);
            repo.DeleteSource(source);
        }
        [HttpGet]
        [Route("gettotalincome")]
        public decimal GetTotalIncome()
        {
            var repo = new IncomeRepo(_connectionString);
            var incomes = repo.GetAllIncomes();
            decimal incomeTotal = 0;
            foreach (var income in incomes)
            {
                incomeTotal += income.Amount;
            }
            return incomeTotal;
        }
    }
}
