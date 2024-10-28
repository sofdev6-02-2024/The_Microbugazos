using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api;

[Route("api/inventory/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
            new
            {
                products = new List<string>(){
                "product1",
                "product2",
                "product3"
              }
            }
        );
    }


    [HttpGet("secured")]
    public IActionResult GetSecured()
    {
        return Ok(
            new
            {
                products = new List<string>(){
                "product1",
                "product2",
                "product3"
              }
            }
        );
    }
}