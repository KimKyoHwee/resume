import React, { useEffect } from 'react';
import './Home.css';
import main1 from "../assets/main1.jpg";
import main2 from "../assets/main2.jpg";
import main3 from "../assets/main3.jpg";
import main4 from "../assets/main4.jpg";

const Home = () => {

  const scrollToSection = (direction) => {
    const sections = document.querySelectorAll('.main-section');
    let currentIndex = 0;

    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top >= 0 && section.getBoundingClientRect().top < window.innerHeight) {
        currentIndex = index;
      }
    });

    if (direction === 'up' && currentIndex > 0) {
      sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
    } else if (direction === 'down' && currentIndex < sections.length - 1) {
      sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const y = event.clientY;
      const height = window.innerHeight;

      if (y <= height / 2) {
        document.body.style.cursor = 'n-resize'; // 위로 향하는 커서
      } else {
        document.body.style.cursor = 's-resize'; // 아래로 향하는 커서
      }
    };

    const handleClick = (event) => {
      const y = event.clientY;
      const height = window.innerHeight;

      if (y <= height / 2) {
        scrollToSection('up');
      } else {
        scrollToSection('down');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="home-content">
      {/* 메인 페이지 1 */}
      <section className="main-section">
        <img src={main1} alt="Main 1" className="main-image" />
        <div className="overlay">
          <div className="about-section">
            <h2>About</h2>
            <p>제 소개 페이지에 와주셔서 감사합니다!<br />포트폴리오 페이지에서 API를 테스트 하실 수 있습니다.</p>
          </div>
          <div className="link-section">
            <div className="portfolio-link">
              <a href="/portfolio">
                <h3>Portfolio</h3>
              </a>
            </div>
            <div className="resume-link">
            <a href="https://fuzzy-hose-356.notion.site/1ee34212ee2d42bdbb3c4a258a672612" target="_blank" rel="noopener noreferrer">
                <h3>Resume</h3>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 페이지 2, 3, 4 */}
      <section className="main-section">
        <img src={main2} alt="Main 2" className="main-image" />
      </section>
      <section className="main-section">
        <img src={main3} alt="Main 3" className="main-image" />
      </section>
      <section className="main-section">
        <img src={main4} alt="Main 4" className="main-image" />
      </section>
    </div>
  );
}

export default Home;
