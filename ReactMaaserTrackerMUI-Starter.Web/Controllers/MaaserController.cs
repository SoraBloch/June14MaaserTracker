using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactMaaserTrackerMUI_Starter.Data;

namespace ReactMaaserTrackerMUI_Starter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaaserController : ControllerBase
    {
        private readonly string _connectionString;
        public MaaserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getallmaaser")]
        public List<Maaser> GetAllMaaser()
        {
            var repo = new MaaserRepo(_connectionString);
            return repo.GetAllMaaser();
        }
        [HttpPost]
        [Route("addmaaser")]
        public void AddMaaser(Maaser maaser)
        {
            var repo = new MaaserRepo(_connectionString);
            repo.AddMaaser(maaser);
        }
        [HttpGet]
        [Route("gettotalmaaser")]
        public decimal GetTotalMaaser()
        {
            var repo = new MaaserRepo(_connectionString);
            var maaser = repo.GetAllMaaser();
            decimal maaserTotal = 0;
            foreach (var item in maaser)
            {
                maaserTotal += item.Amount;
            }
            return maaserTotal;
        }
    }
}
