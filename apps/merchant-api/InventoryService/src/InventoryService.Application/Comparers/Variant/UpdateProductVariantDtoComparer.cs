﻿using InventoryService.Application.Dtos.ProductVariants;

namespace InventoryService.Application.Comparers.Variant;

public class UpdateProductVariantDtoComparer : IEqualityComparer<UpdateProductVariantDto>
{
    public bool Equals(UpdateProductVariantDto? x, UpdateProductVariantDto? y)
    {
        if (ReferenceEquals(x, y)) return true;
        if (ReferenceEquals(x, null)) return false;
        if (ReferenceEquals(y, null)) return false;
        if (x.GetType() != y.GetType()) return false;
        return x.Id.Equals(y.Id);
    }

    public int GetHashCode(UpdateProductVariantDto obj)
    {
        return obj.Id.GetHashCode();
    }
}