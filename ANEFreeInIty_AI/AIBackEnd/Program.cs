//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

//app.Run();


using System.Runtime.InteropServices;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

[DllImport("LinearALGEBRA.dll")]
static extern IntPtr CreateVector2D(double param1, double param2, bool isCartesian);

[DllImport("LinearALGEBRA.dll")]
static extern double Vector2DGetX(IntPtr vector);

IntPtr test = CreateVector2D(109, 2, true);
double val = Vector2DGetX(test);
app.MapGet("/", () => $"hi, {val}, {test.ToString()}");

app.Run();