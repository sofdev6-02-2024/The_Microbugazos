using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.Queries;

public class GetAllCategoriesQuery : IRequest<BaseResponse>;