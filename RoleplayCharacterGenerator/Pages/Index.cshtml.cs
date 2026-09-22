using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RoleplayCharacterGenerator.Services;

namespace RoleplayCharacterGenerator.Pages;

public class IndexModel : PageModel
{
    private readonly ICharacterImageService _imageService;

    public IndexModel(ICharacterImageService imageService)
    {
        _imageService = imageService;
    }

    [BindProperty]
    public string CharacterDescription { get; set; } = "";

    public string? GeneratedImageBase64 { get; set; }

    public void OnGet()
    {
    }
    public async Task<IActionResult> OnPostGenerateAsync()
    {
        if (string.IsNullOrWhiteSpace(CharacterDescription))
        {
            ModelState.AddModelError(string.Empty, "Beskrivningen får inte vara tom.");
            return Page();
        }

        // Anropar tjänstens metod som bygger stilprompt + LLM-anrop
        GeneratedImageBase64 = await _imageService.GenerateCharacterImageBase64Async(CharacterDescription);
        return Page();
    }
}

public class Character
{
    public string namn { get; set; } = "";
    public string yrke { get; set; } = "";
    public List<string>? utrustning { get; set; }
    public string bakgrundshistoria { get; set; } = "";
}

