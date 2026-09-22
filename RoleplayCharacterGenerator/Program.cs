using DotNetEnv;
using OpenAI;
using OpenAI.Images;
using System.ClientModel;
using RoleplayCharacterGenerator.Services;

#pragma warning disable OPENAI001

Env.Load();
var builder = WebApplication.CreateBuilder(args);
const string endpoint = "https://llmresurs.services.ai.azure.com/openai/v1";
const string deploymentName = "gpt-image-1.5";
string apiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY") 
                ?? throw new InvalidOperationException("AZURE_OPENAI_KEY environment variable is not set.");

// Add services to the container.
builder.Services.AddRazorPages();

// Registrera ImageClient och bildtjänsten för DI.
// Metoden GenerateCharacterImageAsync(string) tar sedan hand om
// prompt-bygge + LLM-anrop.
builder.Services.AddSingleton(_ => new ImageClient(
    credential: new ApiKeyCredential(apiKey),
    model: deploymentName,
    options: new OpenAIClientOptions { Endpoint = new Uri(endpoint) }
));
builder.Services.AddScoped<ICharacterImageService, CharacterImageService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

// Exempel på användning av den nya metoden (avkommentera för att testa lokalt):
// using var scope = app.Services.CreateScope();
// var imageService = scope.ServiceProvider.GetRequiredService<ICharacterImageService>();
// byte[] png = await imageService.GenerateCharacterImageAsync("en kvinnlig alv med silverhår, jägare, läderarmor och båge, ärr över kinden");
// await File.WriteAllBytesAsync("output.png", png);

app.Run();
