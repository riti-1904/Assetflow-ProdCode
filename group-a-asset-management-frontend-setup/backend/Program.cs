using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using AssetFlow.Auth.Data;

using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// =======================
// Controllers
// =======================
builder.Services.AddControllers();

// =======================
// Database
// =======================
builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("MySqlConnection")
    );
});

// =======================
// Authentication (DISABLED for development)
// =======================
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

// =======================
// Authorization (DISABLED for development)
// =======================
// builder.Services.AddAuthorization();

// =======================
// CORS (FRONTEND ACCESS)
// =======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:3001")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// =======================
// Middleware Order (VERY IMPORTANT)
// =======================
app.UseCors("AllowFrontend");   // ✅ MUST be before auth

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "AssetFlow API Running");

app.Run();
