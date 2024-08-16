import React from 'react';
import './Portfolio.css';
import ppt1 from "../assets/ppt1.jpg";
import ppt2 from "../assets/ppt2.jpg";
import ppt3 from "../assets/ppt3.jpg";
import ppt4 from "../assets/ppt4.jpg";
import ppt5 from "../assets/ppt5.jpg";
import ppt6 from "../assets/ppt6.jpg";
import ppt7 from "../assets/ppt7.jpg";
import ppt8 from "../assets/ppt8.jpg";
import ppt9 from "../assets/ppt9.jpg";
//back 도메인 : kyohwee.site
const images = [
  ppt1, ppt2, ppt3, ppt4, ppt5, ppt6, ppt7, ppt8, ppt9
];

const Portfolio = () => {
  return (
    <div className="portfolio-content">
      {images.map((src, index) => (
        <section key={index} className="portfolio-section">
          <div className="portfolio-image-container">
            <img src={src} alt={`Slide ${index + 1}`} className="portfolio-image" />
            {/* 왼쪽 상단의 버튼 */}
            <button className="top-left-button" onClick={() => alert(`Button on Page ${index + 1} clicked!`)}>
              Action Button
            </button>
            {/* 오른쪽 상단의 다음 페이지로 가는 버튼 */}
            {index < images.length - 1 && (
              <button className="top-right-button" onClick={() => {
                const nextSection = document.querySelector(`.portfolio-section:nth-child(${index + 2})`);
                if (nextSection) {
                  nextSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Scroll Down
              </button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Portfolio;
