using DotNetEnv;
using Azure;
using OpenAI;
using OpenAI.Images;
using System;
using System.IO;
using System.ClientModel;

#pragma warning disable OPENAI001

Env.Load();
var builder = WebApplication.CreateBuilder(args);
const string endpoint = "https://llmresurs.services.ai.azure.com/openai/v1";
const string deploymentName = "gpt-image-1.5";
string apiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY") 
                ?? throw new InvalidOperationException("AZURE_OPENAI_KEY environment variable is not set.");

// Add services to the container.
builder.Services.AddRazorPages();

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

ImageClient client = new(
    credential: new ApiKeyCredential(apiKey),
    model: deploymentName,
    options: new OpenAIClientOptions()
    {
        Endpoint = new($"{endpoint}"),
    }
);

string prompt = "A cute baby polar bear";

ImageGenerationOptions options = new()
{   
    Size = GeneratedImageSize.W1024xH1024,
};

GeneratedImage image = client.GenerateImage(prompt, options);
BinaryData bytes = image.ImageBytes;

File.WriteAllBytes("output.png", bytes.ToArray());

app.Run();
