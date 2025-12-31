using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using AssetFlow.Auth.Data;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// =======================
// Controllers + JSON
// =======================
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Prevent circular reference crashes (Asset ↔ Fault ↔ User)
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

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
// Authentication (Azure AD)
// =======================
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddAuthorization();

// =======================
// CORS (Frontend Integration)
// =======================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173", // Vite
                    "http://localhost:3000", // CRA
                    "http://localhost:3001"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// =======================
// Middleware Order (CRITICAL)
// =======================
app.UseCors("AllowFrontend");     // ✅ MUST be first
app.UseAuthentication();          // Azure AD
app.UseAuthorization();

app.MapControllers();

// Simple health check
app.MapGet("/", () => "AssetFlow API Running");

app.Run();














//-----------------c2--------------------

// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Identity.Web;
// using AssetFlow.Auth.Data;
// using System.Text.Json.Serialization;

// var builder = WebApplication.CreateBuilder(args);

// // Controllers + JSON cycle handling
// builder.Services.AddControllers()
//     .AddJsonOptions(options =>
//     {
//         options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//     });

// // Database (Local SQL Server / LocalDB)
// builder.Services.AddDbContext<UserDbContext>(options =>
// {
//     options.UseSqlServer(
//         builder.Configuration.GetConnectionString("MySqlConnection")
//     );
// });

// // Authentication → Azure AD SSO (Enabled)
// builder.Services.AddAuthentication()
//     .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

// builder.Services.AddAuthorization();

// // CORS for frontend access
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend",
//         policy =>
//         {
//             policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:3001")
//                   .AllowAnyHeader()
//                   .AllowAnyMethod();
//         });
// });

// var app = builder.Build();

// // Middleware Order (VERY IMPORTANT)
// app.UseCors("AllowFrontend");   // Must be before auth
// app.UseAuthentication();        // Now enabled
// app.UseAuthorization();         // Now enabled

// app.MapControllers();
// app.MapGet("/", () => "AssetFlow API Running");

// app.Run();






















//----GUPTA---------


// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Identity.Web;
// using AssetFlow.Auth.Data;

// using System.Text.Json.Serialization;


// var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddControllers()
//     .AddJsonOptions(options =>
//     {
//         options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
//     });

// // =======================
// // Controllers
// // =======================
// builder.Services.AddControllers();

// // =======================
// // Database
// // =======================
// builder.Services.AddDbContext<UserDbContext>(options =>
// {
//     options.UseSqlServer(
//         builder.Configuration.GetConnectionString("MySqlConnection")
//     );
// });

// // =======================
// // Authentication (DISABLED for development)
// // =======================
// // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
// //     .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

// // =======================
// // Authorization (DISABLED for development)
// // =======================
// // builder.Services.AddAuthorization();

// // =======================
// // CORS (FRONTEND ACCESS)
// // =======================
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend",
//         policy =>
//         {
//             policy.WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:3001")
//                   .AllowAnyHeader()
//                   .AllowAnyMethod();
//         });
// });

// var app = builder.Build();

// // =======================
// // Middleware Order (VERY IMPORTANT)
// // =======================
// app.UseCors("AllowFrontend");   // ✅ MUST be before auth

// // app.UseAuthentication();
// // app.UseAuthorization();

// app.MapControllers();
// app.MapGet("/", () => "AssetFlow API Running");

// app.Run();
