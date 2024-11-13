using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventoryService.Api.Migrations
{
    /// <inheritdoc />
    public partial class Ini : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ParentCategoryId = table.Column<Guid>(type: "uuid", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Category_Category_ParentCategoryId",
                        column: x => x.ParentCategoryId,
                        principalTable: "Category",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StoreId = table.Column<Guid>(type: "uuid", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    BasePrice = table.Column<double>(type: "double precision", nullable: false),
                    Brand = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Variant",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Variant", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CategoryProduct",
                columns: table => new
                {
                    CategoriesId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryProduct", x => new { x.CategoriesId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_CategoryProduct_Category_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryProduct_Product_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId = table.Column<Guid>(type: "uuid", nullable: true),
                    AltText = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Image_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProductReview",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductReview", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductReview_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductVariant",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductId = table.Column<Guid>(type: "uuid", nullable: false),
                    ImageId = table.Column<Guid>(type: "uuid", nullable: true),
                    PriceAdjustment = table.Column<double>(type: "double precision", nullable: false),
                    StockQuantity = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductVariant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductVariant_Image_ImageId",
                        column: x => x.ImageId,
                        principalTable: "Image",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProductVariant_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductAttribute",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ProductVariantId = table.Column<Guid>(type: "uuid", nullable: false),
                    VariantId = table.Column<Guid>(type: "uuid", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DeletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductAttribute", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductAttribute_ProductVariant_ProductVariantId",
                        column: x => x.ProductVariantId,
                        principalTable: "ProductVariant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductAttribute_Variant_VariantId",
                        column: x => x.VariantId,
                        principalTable: "Variant",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "CreatedAt", "DeletedAt", "IsActive", "Name", "ParentCategoryId", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("19025992-3eff-40b9-a007-faf4178680aa"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3210), null, true, "Clothing & Fashion", null, null },
                    { new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3190), null, true, "Electronics", null, null },
                    { new Guid("2bc73de4-162d-44e7-8cf9-c8fb1344ed99"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3392), null, true, "Footwear", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null },
                    { new Guid("3bcb7300-2337-40fe-b336-dd995865bef0"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3406), null, true, "Accessories", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null },
                    { new Guid("4fcbef97-7064-4da5-9af5-ffa2320840bb"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3248), null, true, "Laptops & Computers", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("61a149f3-36a3-42b6-9cf7-e224cee739f1"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3446), null, true, "Watches", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null },
                    { new Guid("6642fc38-2270-4d51-bb72-a1cc54803c4b"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3322), null, true, "Television & Video", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("6b229c58-a110-4a4f-8fa0-4c936ae5c373"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3275), null, true, "Audio Equipment", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("809879f1-f990-4746-a7f4-6c2a556a8c8d"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3365), null, true, "Women's Clothing", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null },
                    { new Guid("85035dba-16d5-45c4-9909-0fb3d153add8"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3261), null, true, "Cameras & Photography", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("91fa97cb-6d0c-405b-828f-73aa42f05ef3"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3350), null, true, "Men's Clothing", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null },
                    { new Guid("a2865462-0af4-490a-97ef-e613050d9439"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3465), null, true, "Handbags & Wallets", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null },
                    { new Guid("b309ea3d-09bd-4d34-8413-ee863bbd8bdf"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3225), null, true, "Mobile Phones", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("b8690753-374d-40e0-86a1-2082b1cfb5d0"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3428), null, true, "Jewelry", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null },
                    { new Guid("c6201759-5c9a-48db-b679-de59670e7d9c"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3335), null, true, "Gaming Consoles", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("c72d66de-9854-4bc1-8b07-be20a1ab826a"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3289), null, true, "Wearable Technology", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("d7985377-1a8a-4aa8-adfb-1c156ea589ab"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3308), null, true, "Smart Home Devices", new Guid("95920a11-05c3-4ab6-987a-3deb415d9519"), null },
                    { new Guid("eb66eec7-2746-4bdc-8af5-57598c7b2a6c"), new DateTime(2024, 11, 12, 13, 56, 6, 354, DateTimeKind.Utc).AddTicks(3379), null, true, "Kids' Clothing", new Guid("19025992-3eff-40b9-a007-faf4178680aa"), null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Category_ParentCategoryId",
                table: "Category",
                column: "ParentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryProduct_ProductsId",
                table: "CategoryProduct",
                column: "ProductsId");

            migrationBuilder.CreateIndex(
                name: "IX_Image_ProductId",
                table: "Image",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttribute_ProductVariantId",
                table: "ProductAttribute",
                column: "ProductVariantId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAttribute_VariantId",
                table: "ProductAttribute",
                column: "VariantId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductReview_ProductId",
                table: "ProductReview",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariant_ImageId",
                table: "ProductVariant",
                column: "ImageId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductVariant_ProductId",
                table: "ProductVariant",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryProduct");

            migrationBuilder.DropTable(
                name: "ProductAttribute");

            migrationBuilder.DropTable(
                name: "ProductReview");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "ProductVariant");

            migrationBuilder.DropTable(
                name: "Variant");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "Product");
        }
    }
}
