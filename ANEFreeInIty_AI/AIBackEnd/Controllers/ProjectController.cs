using AIBackEnd.Data.Entity;
using AIBackEnd.DTO;
using AIBackEnd.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace AIBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private IServiceManager _serviceManager;
        public ProjectController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetProject()
        {
            var project = await _serviceManager.projectService.GetProjectsAsync();
            return Ok(project);
        }

        [HttpGet("{projectId}", Name = "ProjectDetailsById")]
        public async Task<IActionResult> GetProjectById(int projectId)
        {
            var project = await _serviceManager.projectService.GetProjectByIdAsync(projectId);
            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] ProjectDTO project)
        {
            if (project == null)
            {
                throw new Exception("lead object is null");
            }
            //if (!ModelState.IsValid)
            //{
            //    throw new BadRequestException("Invalid model object");
            //}

            var Createproject = await _serviceManager.projectService.CreateNewProjectAsync(project);
            return Ok(Createproject);
        }

        [HttpPut("{projectId}")]

        public async Task<IActionResult> UpdateProject(int projectId, [FromBody] ProjectDTO project)
        {
            if (project == null)
            {
                throw new Exception("project object is null");
            }
            if (!ModelState.IsValid)
            {
                throw new Exception("Invalid model object");
            }

            await _serviceManager.projectService.UpdateProjectAsync(projectId, project);
            return Accepted();
        }

        [HttpDelete("projectId")]
        public async Task<IActionResult> DeleteProject(int projectId)
        {
            var projectById = await _serviceManager.projectService.GetProjectByIdAsync(projectId);
            await _serviceManager.projectService.DeleteProjectAsync(projectById);
            return Ok("Sucessfully Deleted");
        }
    }
}
