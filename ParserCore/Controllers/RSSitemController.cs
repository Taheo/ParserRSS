using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ParserCore.Controllers
{
    public class RSSitemController : Controller
    {
        public IActionResult Index()
        {
            var engine = new ParsEngine.ParsEngine();
            return View(engine.ParsingMethod());
        }
    }
}