using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace nude_solutions_dotnet_react_assignment.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RenterContentsController : ControllerBase
    {
        private static readonly RenterContent[] Contents = new RenterContent[]
        {
            new RenterContent()
                {Id = 1, Description = "TV", Value = 2000.0, Category = "Electronics"},
            new RenterContent() {
                Id = 1, Description = "Playstation", Value = 400.0, Category = "Electronics"
            },
            new RenterContent() {
                Id = 1, Description = "Stereo", Value = 1600.0, Category = "Electronics"
            },
            new RenterContent() {Id = 1, Description = "Shirts", Value = 1100.0, Category = "Clothing"},
            new RenterContent() {Id = 1, Description = "Jeans", Value = 1100.0, Category = "Clothing"},
            new RenterContent() {Id = 1, Description = "Pots and Pans", Value = 3000.0, Category = "Kitchen"},
            new RenterContent() {Id = 1, Description = "Flatware", Value = 500.0, Category = "Kitchen"},
            new RenterContent() {Id = 1, Description = "Knife Set", Value = 500.0, Category = "Kitchen"},
            new RenterContent() {Id = 1, Description = "Misc", Value = 1000.0, Category = "Kitchen"}
        };
        
        private readonly ILogger<RenterContentsController> _logger;

        public RenterContentsController(ILogger<RenterContentsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<RenterContent> Get()
        {
            return Contents;
        }
    }
}