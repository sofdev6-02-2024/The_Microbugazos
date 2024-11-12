import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import "./page.css";
import { CoverCarousel } from "@/components/home/CoverCarousel";

export default function Home() {
  const productsExample = [
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
    {
      id: "652b23a6-713a-4b1b-bd0c-56ea5db24a43",
      storeId: "96051414-2c6e-478a-8868-83f623c49eae",
      name: "Product 1",
      description: "Lorem Ipsum is Lorem Ipsum",
      price: 19.99,
      rating: 4.5,
      images: [
        {
          url: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
          altText: "Product 1",
        },
      ],
      brand: "Pepsi",
      variants: new Map(),
    },
  ];

  return (
    <>
      <CoverCarousel />
      <ProductsCarousel
        title="Recommendations"
        products={productsExample}
        url="http://localhost:3000/products"
      />
      <ProductsCarousel
        title="Refrescos"
        products={productsExample}
        url="http://localhost:3000/products"
      />
      <ProductsCarousel
        title="Ni idea"
        products={productsExample}
        url="http://localhost:3000/products"
      />
      <ProductsCarousel
        title="More Test"
        products={productsExample}
        url="http://localhost:3000/products"
      />
    </>
  );
}
