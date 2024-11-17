"use client";

import Product from "@/commons/entities/concretes/Product"
import "@/styles/general/ProductsCarousel.css";
import { ListType } from "@/commons/entities/ListType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { UUID } from "crypto";
import { ProductCard } from "../general/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  categoryId: UUID;
}

export const ProductsCarouselByCategory = ({ title, categoryId }: Props) => {

  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const goCategory = () => {
    router.push(`/product/category/${title}`);
  }

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
        <button className="products-carousel-header-link" onClick={goCategory}>
          More products
        </button>
      </div>
      <div className="products-carousel-section">
        <Swiper
          spaceBetween={20}
          breakpoints={breakpoints}
          className="mySwiper"
        >
          {products && products.length > 0 ? (
            products.map(product => {
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
