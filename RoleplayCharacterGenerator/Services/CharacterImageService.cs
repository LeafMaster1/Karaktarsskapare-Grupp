using System.ClientModel;
using OpenAI;
using OpenAI.Images;

#pragma warning disable OPENAI001

namespace RoleplayCharacterGenerator.Services;


public interface ICharacterImageService
{

    Task<byte[]> GenerateCharacterImageAsync(string characterDescription, CancellationToken cancellationToken = default);
    
    byte[] GenerateCharacterImage(string characterDescription);
    
    Task<string> GenerateCharacterImageBase64Async(string characterDescription, CancellationToken cancellationToken = default);
    
    string BuildStylizedPrompt(string characterDescription);
}

public class CharacterImageService : ICharacterImageService
{
    private readonly ImageClient _imageClient;

    private const string StylePrefix =
        """
        Du är en spelkonstnär som skapar konceptkonst för ett nytt kortspel som liknar Pokemon, men den nya tjänsten
        heter Chrillemon.
        Du ska skapa ett nytt spelkort. Det får inte vara en redan existerande pokemon. Bilden ska vara 
        semirealistisk, den ska ha en tydlig type (t.ex. eld, vatten, gräs, elektrisk, etc.) och en unik design.
        Men befintliga attacker som matchar typen. Bilden får inte innehålla copyrightat innehåll, utan du ska tweaka 
        innehåll som kan liknas med Pokemon-franchisen till snarlika element.
        Alla skapade 'Chrillemons' ska sluta på "-ennari" och ha italienska element.
        Här kommer användarens beskrivning av spelkortet:
        """;

    private const string StyleSuffix =
        """
        neutral soft gradient background, no text, no watermark, no logo, no extra characters,
        full sharp detail, 8k, ultra-detailed, professional character concept art
        """;

    private static readonly ImageGenerationOptions DefaultOptions = new()
    {
        Size = GeneratedImageSize.W1024xH1024,
        Quality = GeneratedImageQuality.High,
        Style = GeneratedImageStyle.Vivid,
    };

    public CharacterImageService(ImageClient imageClient)
    {
        _imageClient = imageClient ?? throw new ArgumentNullException(nameof(imageClient));
    }
    
    public CharacterImageService(string apiKey, string endpoint = "https://llmresurs.services.ai.azure.com/openai/v1", string deploymentName = "gpt-image-1.5")
    {
        if (string.IsNullOrWhiteSpace(apiKey))
            throw new ArgumentException("API-nyckel får inte vara tom.", nameof(apiKey));

        _imageClient = new ImageClient(
            credential: new ApiKeyCredential(apiKey),
            model: deploymentName,
            options: new OpenAIClientOptions { Endpoint = new Uri(endpoint) }
        );
    }

    public string BuildStylizedPrompt(string characterDescription)
    {
        if (string.IsNullOrWhiteSpace(characterDescription))
            throw new ArgumentException("Beskrivningen får inte vara tom.", nameof(characterDescription));

        string clean = characterDescription.Trim();
        if (clean.Length > 1000)
            clean = clean[..1000];
        
        return $"{StylePrefix}, {clean}, {StyleSuffix}";
    }

    public async Task<byte[]> GenerateCharacterImageAsync(string characterDescription, CancellationToken cancellationToken = default)
    {
        string prompt = BuildStylizedPrompt(characterDescription);

        GeneratedImage image = await _imageClient.GenerateImageAsync(prompt, DefaultOptions, cancellationToken);
        BinaryData bytes = image.ImageBytes;

        if (bytes == null || bytes.ToArray().Length == 0)
            throw new InvalidOperationException("Bildgenereringen returnerade ingen data.");

        return bytes.ToArray();
    }

    public byte[] GenerateCharacterImage(string characterDescription)
    {
        string prompt = BuildStylizedPrompt(characterDescription);

        GeneratedImage image = _imageClient.GenerateImage(prompt, DefaultOptions);
        BinaryData bytes = image.ImageBytes;

        if (bytes == null || bytes.ToArray().Length == 0)
            throw new InvalidOperationException("Bildgenereringen returnerade ingen data.");

        return bytes.ToArray();
    }

    public async Task<string> GenerateCharacterImageBase64Async(string characterDescription, CancellationToken cancellationToken = default)
    {
        byte[] pngBytes = await GenerateCharacterImageAsync(characterDescription, cancellationToken);
        string base64 = Convert.ToBase64String(pngBytes);
        return $"data:image/png;base64,{base64}";
    }
}
