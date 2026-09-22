using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RoleplayCharacterGenerator.Services;

namespace RoleplayCharacterGenerator.Pages;

public class IndexModel : PageModel
{
    private readonly ICharacterImageService _imageService;
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ICharacterImageService imageService, ILogger<IndexModel> logger)
    {
        _imageService = imageService;
        _logger = logger;
    }

    [BindProperty]
    public string ChrillemonNamn { get; set; } = "";

    [BindProperty]
    public string ChrillemonBeskrivning { get; set; } = "";

    [BindProperty]
    public string CharacterDescription { get; set; } = "";

    public string? GeneratedImageBase64 { get; set; }
    public string? GeneratedName { get; set; }
    public string? GeneratedPromptDebug { get; set; }
    public string? ErrorMessage { get; set; }
    public bool HasResult => !string.IsNullOrEmpty(GeneratedImageBase64);

    public void OnGet() { }

    public async Task<IActionResult> OnPostGenerateAsync()
    {
        // Stöd både nya och gamla fältnamn
        var namn = (ChrillemonNamn ?? "").Trim();
        var beskrivning = (ChrillemonBeskrivning ?? "").Trim();
        if (string.IsNullOrWhiteSpace(beskrivning) && !string.IsNullOrWhiteSpace(CharacterDescription))
            beskrivning = CharacterDescription.Trim();

        // Validering
        if (string.IsNullOrWhiteSpace(namn))
        {
            ErrorMessage = "Mamma mia! Du måste ge din Chrillemon ett namn som slutar på -ennari! 🤌";
            return Page();
        }
        if (string.IsNullOrWhiteSpace(beskrivning))
        {
            ErrorMessage = "Ay caramba! Beskriv din Chrillemon — typ, attacker, look! 🍝";
            return Page();
        }

        if (!namn.ToLower().EndsWith("ennari"))
        {
            namn = namn.TrimEnd('-', ' ', '_') + "ennari";
        }

        namn = char.ToUpper(namn[0]) + namn[1..];

        var fullBeskrivning = $"{namn}: {beskrivning}";
        GeneratedName = namn;

        try
        {
            GeneratedPromptDebug = _imageService.BuildStylizedPrompt(fullBeskrivning);

            var base64DataUrl = await _imageService.GenerateCharacterImageBase64Async(fullBeskrivning);
            GeneratedImageBase64 = base64DataUrl.StartsWith("data:") ? base64DataUrl : $"data:image/png;base64,{base64DataUrl}";

            ChrillemonNamn = namn;
            ChrillemonBeskrivning = beskrivning;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kunde inte generera Chrillemon {Namn}", namn);
            ErrorMessage = $"Oh mamma! Något gick fel i köket: {ex.Message} 🍕💥 Prova igen, amore!";
        }

        return Page();
    }

    public Task<IActionResult> OnPostGenerateChrillemonAsync() => OnPostGenerateAsync();
}

public class Character
{
    public string namn { get; set; } = "";
    public string yrke { get; set; } = "";
    public List<string>? utrustning { get; set; }
    public string bakgrundshistoria { get; set; } = "";
}

