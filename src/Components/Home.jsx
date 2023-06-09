import { useEffect } from "react";
import Carousel from "./Carousel.jsx";
import Catagories from "../Data/ProductCatagories.json";
import Card from "./Card.jsx";
import Slider from "./Slider.jsx";

const Home = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="home-container main-container">
      <Carousel />

      <div className="home-product-container">
        {Catagories.map((el, id) => {
          return <Card category={el.category} image={el.image} key={id} />;
        })}
      </div>

      {Catagories.map((category, id) => {
        return (
          <div
            className="home-product-container"
            style={{ display: "flex", flexDirection: "column" }}
            key={id}
          >
            <h2 className="mr-2" style={{ fontWeight: "lighter" }}>
              {category.category}
            </h2>
            <Slider category={category.category} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
