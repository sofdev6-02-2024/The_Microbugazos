namespace MerchantService.Application.Dtos
{
    public class PageDto<T>
    {
        public IEnumerable<T> Data { get; }
        public int Page { get; }
        public int PageSize { get; }
        public int TotalItems { get; }
        public int TotalPages { get; }

        public PageDto(IEnumerable<T> data, int totalItems, int page, int pageSize)
        {
            Data = data ?? throw new ArgumentNullException(nameof(data));
            TotalItems = totalItems;
            Page = page;
            PageSize = data.Count();
            TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        }

        public static PageDto<TK> Create<TK>(List<TK> products, int total, int page, int limit)
        {
            return new PageDto<TK>(products, total, page, limit);
        }
    }
}
