using InventoryService.Application.Dtos.Images;

namespace InventoryService.Application.Comparers.Image;

public class ImageEntityComparer : IEqualityComparer<UpdateImageDto>
{
    public bool Equals(UpdateImageDto x, UpdateImageDto y)
    {
        if (ReferenceEquals(x, y)) return true;
        if (ReferenceEquals(x, null)) return false;
        if (ReferenceEquals(y, null)) return false;
        if (x.GetType() != y.GetType()) return false;
        return x.AltText == y.AltText && x.Url == y.Url;
    }

    public int GetHashCode(UpdateImageDto obj)
    {
        return HashCode.Combine(obj.AltText, obj.Url);
    }
}