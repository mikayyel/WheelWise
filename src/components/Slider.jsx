import React, { useState } from "react";
import "./Slider.css";

export default function Slider({ data }) {
  const [currentDataIndex, setCurrentDataIndex] = useState(0);

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${data[currentDataIndex].url})`,
  };

  const goToPrevious = () => {
    const isFirstSlide = currentDataIndex === 0;
    const newDataIndex = isFirstSlide ? data.length - 1 : currentDataIndex - 1;
    setCurrentDataIndex(newDataIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentDataIndex === data.length - 1;
    const newDataIndex = isLastSlide ? 0 : currentDataIndex + 1;
    setCurrentDataIndex(newDataIndex);
  };
  const goToSlide = (index) => {
    setCurrentDataIndex(index);
  };

  return (
    <div className="sliderStyles">
      <div className="leftButton">
        <button className="leftArrowStyle" onClick={goToPrevious}>
          {"⟪"}
        </button>
      </div>
      <div className="rightButton">
        <button className="rightArrowStyle" onClick={goToNext}>
          {"⟫"}
        </button>
      </div>
      <div style={slideStyles}></div>

      <div>
        {data.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            style={{ fontSize: "20px", marginTop: "20px", textAlign: "center" }}
          >
            {slideIndex === currentDataIndex ? slide.title : ""}
          </div>
        ))}
      </div>

      <div className="dotContainerStyle">
        {data.map((slide, slideIndex) => (
          <div key={slideIndex} className="dotStyle">
            <div
              style={{
                color: slideIndex === currentDataIndex ? "gray" : "black",
              }}
              onClick={() => goToSlide(slideIndex)}
            >
              .
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
