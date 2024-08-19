import React from 'react';
import './Home.css';
import './Introduction.css'; // 자기소개 페이지 스타일
import profileImage from "../assets/profile.jpg";
import architectImage from "../assets/architect.jpg"; // 새로운 이미지 추가


const Home = () => {
  const scrollToIntroduction = () => {
    const introductionSection = document.querySelector('.introduction');
    if (introductionSection) {
      introductionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-content">
      {/* 첫 화면 - Intro 섹션 */}
      <section className="intro">
        <div className="sectors">
          <div className="sector">
            <h2>About</h2>
            <p>제 소개 페이지에 와주셔서 감사합니다!<br></br> 왼쪽의 바에서 제 이력서와 포트폴리오를 확인하실 수 있습니다.</p>
          </div>
          <div className="sector">
            <h2>Resume</h2>
            <p>제 이력과 간략한 정보들을 확인하실 수 있습니다.</p>
          </div>
          <div className="sector">
            <h2>Portfolio</h2>
            <p>제가 작업한 내용들을 확인하시고, 성능을 직접 체크해보실 수 있습니다.</p>
          </div>
        </div>
        <div className="profile-section">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <h1>KYOHWEE KIM <br></br>WEBSITE</h1>
          <button className="scroll-button" onClick={scrollToIntroduction}>
            Scroll Down
          </button>
        </div>
      </section>

      {/* 자기소개 페이지 1 */}
      <section className="introduction page-one">
        <h2>제 개인 PC에서 호스팅한 웹 애플리케이션 서버를 통해 서비스되는 웹사이트입니다.</h2>
        <h3>좌측 네비게이션바의 포트폴리오 페이지에서 API의 응답속도를 직접 체크하실 수 있습니다.</h3>
        <img src={architectImage} alt="Architecture" className="architect-image" />
      </section>

      {/* 자기소개 페이지 2 */}
      <section className="introduction page-two">
        <h2>About Me</h2>
        <p>I'm a passionate developer who loves building intuitive and dynamic web applications. With a strong foundation in JavaScript, React, and Node.js, I strive to create user-friendly experiences.</p>
      </section>

      {/* 자기소개 페이지 3 */}
      <section className="introduction page-three">
        <h2>My Hobbies</h2>
        <p>I enjoy solving coding challenges, contributing to open-source projects, and staying up-to-date with the latest technologies. In my free time, I also love reading, hiking, and photography.</p>
      </section>
    </div>
  );
}

export default Home;
