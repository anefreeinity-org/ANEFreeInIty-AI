using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace AIBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Vector2DController : ControllerBase
    {
        private IServiceManager _serviceManager;
        public Vector2DController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetVector2D()
        {
            var vectors = await _serviceManager.vector2DService.GetVector2DAsync();
            return Ok(vectors);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVector2D([FromBody] Vector2DDTO vector)
        {
            if (vector == null)
            {
                throw new Exception("lead object is null");
            }
            //if (!ModelState.IsValid)
            //{
            //    throw new BadRequestException("Invalid model object");
            //}

            var Createvector = await _serviceManager.vector2DService.CreateNewVector2DAsync(vector);
            return Ok(Createvector);
        }
    }
}
