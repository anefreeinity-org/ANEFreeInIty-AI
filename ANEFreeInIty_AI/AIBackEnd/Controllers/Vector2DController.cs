using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

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

        [HttpGet("{vector2DId}", Name = "Vector2DDetailsById")]
        public async Task<IActionResult> GetVector2DById(int vector2DId)
        {
            var vector = await _serviceManager.vector2DService.GetVector2DByIdAsync(vector2DId);
            return Ok(vector);
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

        [HttpPut("{vector2DId}")]

        public async Task<IActionResult> UpdateVector2D(int vector2DId, [FromBody] Vector2DDTO vector)
        {
            if (vector == null)
            {
                throw new Exception("vector2d object is null");
            }
            if (!ModelState.IsValid)
            {
                throw new Exception("Invalid model object");
            }

            await _serviceManager.vector2DService.UpdateVector2DAsync(vector2DId, vector);
            return Accepted();
        }

        [HttpDelete("vector2DId")]
        public async Task<IActionResult> DeleteVector2D(int vector2DId)
        {
            var vectorById = await _serviceManager.vector2DService.GetVector2DByIdAsync(vector2DId);
            await _serviceManager.vector2DService.DeleteVector2DAsync(vectorById);
            return Ok("Sucessfully Deleted");
        }

        [HttpPost("/api/Vector2D/Add")]
        public async Task<ActionResult<Vector2DDTO>> AddVector2D([FromBody] Vector2DDTO[] vectors)
        {
            if (vectors == null)
            {
                throw new Exception("lead object is null");
            }
            //if (!ModelState.IsValid)
            //{
            //    throw new BadRequestException("Invalid model object");
            //}

            var Createvector = await _serviceManager.vector2DService.AddVectors(vectors);
            return Createvector;
        }
    }
}
//[FromQuery(Name = "vector2DId")]