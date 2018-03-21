﻿using ParserRSS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using ParsEngine;

namespace ParserRSS.Controllers
{
    public class RSSitemController : Controller
    {
        public ActionResult Index()
        {
            var engine = new ParsEngine.ParsEngine();
            return View(engine.ParsingMethod());
        }
    }
}