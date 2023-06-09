import React, { useState, useEffect, useRef } from "react";
import img1 from "../Icons&Images/amazon-img-1.jpg";
import img2 from "../Icons&Images/amazon-img-2.jpg";
import img3 from "../Icons&Images/amazon-img-3.jpg";
import img1Small from "../Icons&Images/amazon-img-1-small.jpg";
import img2Small from "../Icons&Images/amazon-img-2-small.jpg";
import img3Small from "../Icons&Images/amazon-img-3-small.jpg";

const Carousel = () => {
  const carousalBtn_ref = useRef();

  const [images, setImages] = useState({
    image1: img1,
    image2: img2,
    image3: img3,
  });

  useEffect(() => {
    const buttons = document.querySelectorAll("[data-carousel-button]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const offset = btn.dataset.carouselButton === "next" ? 1 : -1;

        const slides = btn
          .closest("[data-carousel]")
          .querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");

        const lowerBtn = btn
          .closest("[data-carousel]")
          .querySelector(".pg-button-holder");

        const activeLowerBtn = lowerBtn.querySelector("[data-active]");

        let newIdx = [...slides.children].indexOf(activeSlide) + offset;

        if (newIdx < 0) newIdx = slides.children.length - 1;
        if (newIdx >= slides.children.length) newIdx = 0;

        slides.children[newIdx].dataset.active = true;
        delete activeSlide.dataset.active;

        lowerBtn.children[newIdx].dataset.active = true;
        delete activeLowerBtn.dataset.active;
      });
    });

    setInterval(() => {
      carousalBtn_ref.current.click();
    }, 5000);

    let x = window.matchMedia("(max-width: 600px)");
    mediaFunction(x);
    x.addListener(mediaFunction);
  }, []);

  const mediaFunction = (x) => {
    if (x.matches) {
      setImages({ image1: img1Small, image2: img2Small, image3: img3Small });
    } else {
      setImages({ image1: img1, image2: img2, image3: img3 });
    }
  };

  return (
    <>
      <div className="carousel-container">
        <div className="carousel" data-carousel>
          <button className="carousel-button prev" data-carousel-button="prev">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className="carousel-button next"
            ref={carousalBtn_ref}
            data-carousel-button="next"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <ul data-slides>
            <li className="slide" data-active>
              <img src={images.image1} alt="img1" className="carousel-image" />
            </li>
            <li className="slide">
              <img src={images.image2} alt="img2" className="carousel-image" />
            </li>
            <li className="slide">
              <img src={images.image3} alt="img3" className="carousel-image" />
            </li>
          </ul>
          <div className="pg-button-holder">
            <button
              style={{ opacity: 0 }}
              className="carousel-pg-button"
              data-active=""
            >
              &#8226;
            </button>
            <button style={{ opacity: 0 }} className="carousel-pg-button">
              &#8226;
            </button>
            <button style={{ opacity: 0 }} className="carousel-pg-button">
              &#8226;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
