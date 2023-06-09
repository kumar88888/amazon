import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Product from "./Product.jsx";
import LoadingCard from "./LoadingCard.jsx";

const Slider = ({ category }) => {
  const initialState = [];
  const [products, setProducts] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts(category);
  }, [category]);

  const getProducts = async (category) => {
    setLoading(true);

    const link = `https://fakestoreapi.com/products/category/${category.toLowerCase()}`;

    await fetch(link)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Swiper
        className="swiper-slider"
        breakpoints={{
          // when window width is >= 300px
          300: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          // when window width is >= 600px
          600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          // when window width is >= 750px
          750: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          // when window width is >= 1000px
          1000: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          // when window width is >= 1200px
          1200: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
        initialSlide={1}
        loop={true}
        //loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {loading
          ? Array(10)
              .fill()
              .map((el, id) => {
                return (
                  <SwiperSlide key={id}>
                    <LoadingCard />
                  </SwiperSlide>
                );
              })
          : products.map((product, i) => {
              return (
                <SwiperSlide key={i}>
                  <Product product={product} />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </>
  );
};

export default Slider;
