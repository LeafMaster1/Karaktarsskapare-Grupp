using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RoleplayCharacterGenerator.Pages;

public class IndexModel : PageModel
{
    public void OnGet()
    {

    }
}
     public class Character
    {
        public string namn { get; set; }
        public string yrke { get; set; }
        public List<string> utrustning { get; set; }
        public string bakgrundshistoria { get; set; }
    }

