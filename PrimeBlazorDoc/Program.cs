using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using PrimeBlazorDoc;
using PrimeBlazor;
using PrimeBlazorDoc.Service;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");
builder.Services.AddPrimeBlazor();
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<PrimeBlazorDoc.Service.EventService>();
builder.Services.AddScoped<PrimeBlazorDoc.Service.CountryService>();
builder.Services.AddScoped<PrimeBlazorDoc.Service.CarService>();
builder.Services.AddSingleton<EventBus>();
builder.Services.AddSingleton<AppState>();
await builder.Build().RunAsync();
