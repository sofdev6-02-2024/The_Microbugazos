import Product from "@/commons/entities/concretes/Product";
import "@/styles/general/ProductsCarousel.css";
import { ProductCard } from "./ProductCard";
import { ListType } from "@/commons/entities/ListType";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface Props {
  title: string;
  products: Array<Product>;
  url: string;
}

export const ProductsCarousel = ({ title, products, url }: Props) => {
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
        <a className="products-carousel-header-link" href={url}>
          More products
        </a>
      </div>
      <div className="products-carousel-section">
        <Swiper
          slidesPerView={Math.min(products.length, 5)}
          spaceBetween={20}
          breakpoints={breakpoints}
          className="mySwiper"
        >
          {products && products.length > 0 ? (
            products.map((product, index) => {
              return (
                <SwiperSlide key={`${product.id}-slide-recommended-${index}`}>
                  <ProductCard
                    key={`product.id-card`}
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
