using System.Text.Json;
using System.Text.Json.Serialization;

namespace InventoryService.Application.Services;

public class HttpStockThresholdService(HttpClient httpClient)
{

    public async Task<int> GetStockThreshold(Guid storeId )
    {
        var userServiceRoute = Environment.GetEnvironmentVariable("API_GATEWAY_ROUTE");
        var response = await httpClient.GetAsync($"{userServiceRoute}/stores/threshold/{storeId}");
        if (!response.IsSuccessStatusCode)
        {
            Console.WriteLine($"Error al obtener el threshold del Store ID {storeId}");
        }

        var responseContent = await response.Content.ReadAsStringAsync();

        StoreThresholdResponse? storeThreshold = null;
        try
        {
            storeThreshold = JsonSerializer.Deserialize<StoreThresholdResponse>(responseContent);
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"Error deserializando la respuesta del Store ID {storeId}: {ex.Message}");
        }

        if (storeThreshold == null)
        {
            Console.WriteLine($"Error al obtener el threshold del Store ID {storeId}");
        }

        return storeThreshold!.Data;
    }

    private class StoreThresholdResponse
    {
        [JsonPropertyName("data")]
        public int Data { get; set; }
        [JsonPropertyName("isSuccess")]
        public bool IsSuccess { get; set; }
        [JsonPropertyName("statusCode")]
        public int StatusCode { get; set; }
        [JsonPropertyName("message")]
        public string? Message { get; set; }
    }
}

