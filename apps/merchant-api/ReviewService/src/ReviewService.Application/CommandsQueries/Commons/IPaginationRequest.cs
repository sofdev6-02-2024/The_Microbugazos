namespace ReviewService.Application.CommandsQueries.Commons;

public class PaginationRequest(int page, int pageSize)
{
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}