import React from 'react';
import './Home.css';
import './Introduction.css'; // 자기소개 페이지 스타일
import profileImage from "../assets/profile.jpg";
import architectImage from "../assets/architect.jpg"; // 자기소개 1번 페이지 이미지
import mailLogicImage from "../assets/mailLogic.jpg"; // 자기소개 2번 페이지 이미지

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
            <p>페이지 좌측 상단의 "API 성능 측정하기" 버튼으로 직접 체크해보실 수 있습니다.</p>
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
        <h3>좌측 네비게이션바의 포트폴리오 페이지에서 API의 응답속도를 직접 테스트하실 수 있습니다.</h3>
        <img src={architectImage} alt="Architecture" className="architect-image" />
      </section>

      {/* 자기소개 페이지 2 */}
      <section className="introduction page-two">
        <h2>테스팅되는 API는 실제 서비스의 API와 상이합니다.</h2>
        <p>데이터가 저장 및 수정되는 트랜잭션은 비즈니스 로직에서 제외했습니다.</p>
        <p>테스팅하실 때, 다중 스레드 작업을 호환하기 위하여 비즈니스 로직을 수정했습니다.</p>
        <p>예를 들어 커피챗 신청 API는 Lock, 유효성 체크, 데이터 저장 기능을 제외했습니다.</p>
        <img src={mailLogicImage} alt="Mail Logic" className="mail-logic-image" />
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
