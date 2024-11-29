using System.Net.Http.Json;
using Commons.ResponseHandler.Responses.Concretes;
using DotNetEnv;
using PaymentService.Application.Dtos.Products;
using PaymentService.Application.Dtos.Store;

namespace PaymentService.Application.Services.Clients;

public class StoreService
{
    private readonly HttpClient _httpClient;
    private readonly string _userServiceRoute;

    public StoreService(HttpClient httpClient)
    {
        Env.Load("../../../../../.env");
        _httpClient = httpClient;
        _userServiceRoute = Env.GetString("USER_SERVICE_ROUTE") ?? 
                                 Environment.GetEnvironmentVariable("USER_SERVICE_ROUTE") ?? 
                                 throw new Exception("USER_SERVICE_ROUTE is not set");
    }
    
    public async Task<StoreDto?> GetProductByIdAsync(Guid storeId)
    {
        var url = $"{_userServiceRoute}stores/{storeId}";
        var response = await _httpClient.GetAsync(url);

        if (!response.IsSuccessStatusCode) 
            return null;
        
        var successResponse = await response.Content.ReadFromJsonAsync<SuccessResponse<StoreDto>>();
        return successResponse?.Data;
    }

}