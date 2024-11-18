using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.CommandHandlers;

public class CreateCategoryCommandHandler(
    IRepository<Category> categoryRepository, 
    IResponseHandlingHelper responseHandlingHelper,
    IValidator<CreateCategoryDto> validator) : 
    IRequestHandler<CreateCategoryCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryDto = request.CreateCategoryDto;
        
        var response = await validator.ValidateAsync(categoryDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateCategoryDto>(
            "The operation to create a category was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());
        
        var category = new Category
        {
            Name = categoryDto.Name,
            ParentCategoryId = categoryDto.ParentCategoryId
        };
        
        category = await categoryRepository.AddAsync(category);
        return responseHandlingHelper.Created("The category was added successfully.", category.Id);
    }
}