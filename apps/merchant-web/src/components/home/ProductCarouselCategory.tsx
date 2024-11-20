"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { UUID } from "crypto";
import Link from "next/link";
import Product from "@/commons/entities/concretes/Product";
import { ListType } from "@/commons/entities/ListType";
import { ProductCard } from "../general/ProductCard";
import axiosInstance from "@/request/AxiosConfig";
import "@/styles/general/products-carousel.css";

interface Props {
  title: string;
  categoryId: UUID;
}

export const ProductsCarouselByCategory = ({ title, categoryId }: Props) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId]);

  const breakpoints = {
    300: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    940: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    },
    1680: {
      slidesPerView: 5,
    },
  };

  return (
    <div className="products-carousel">
      <div className="products-carousel-header">
        <h2 className="products-carousel-header-title">{title}</h2>
        <Link
          className="products-carousel-header-link"
          href={`/product/category/${title}`}
        >
          More products
        </Link>
      </div>
      <div className="products-carousel-section">
        <Swiper
          spaceBetween={20}
          breakpoints={breakpoints}
          className="mySwiper"
        >
          {products && products.length > 0 ? (
            products.map((product) => {
              return (
                <SwiperSlide key={`${product.id}-slide-category`} className="">
                  <ProductCard
                    key={product.id}
                    product={product}
                    type={ListType.Card}
                  />
                </SwiperSlide>
              );
            })
          ) : (
            <p>No products found.</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};
