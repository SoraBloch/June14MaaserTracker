using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactMaaserTrackerMUI_Starter.Data
{
    public class MaaserDataContextFactory : IDesignTimeDbContextFactory<MaaserDataContext>
    {
        public MaaserDataContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactMaaserTrackerMUI-Starter.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new MaaserDataContext(config.GetConnectionString("ConStr"));
        }
    }
}