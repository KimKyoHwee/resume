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
import axios from 'axios';

const images = [
  ppt1, ppt2, ppt3, ppt4, ppt5, ppt6, ppt7, ppt8, ppt9
];

const Portfolio = () => {

  const handleButtonClick = async (index) => {
    if (index === 1) {
      const choice = prompt('1번, 2번, 3번 중 선택해주세요:', '1');
      if (choice === '1' || choice === '2' || choice === '3') {
        let threadCount = prompt('생성할 스레드 수를 입력하세요 (1~10):', '1');
        let requestCount = prompt('각 스레드별로 보낼 요청 수를 입력하세요 (1~100):', '1');

        // 숫자 확인 및 제한 적용
        threadCount = parseInt(threadCount, 10);
        requestCount = parseInt(requestCount, 10);

        if (isNaN(threadCount) || threadCount < 1 || threadCount > 10) {
          alert('스레드 수는 1에서 10 사이의 숫자여야 합니다.');
          return;
        }

        if (isNaN(requestCount) || requestCount < 1 || requestCount > 100) {
          alert('요청 수는 1에서 100 사이의 숫자여야 합니다.');
          return;
        }

        try {
          const response = await axios.get(`https://kyohwee.site/api/v1/mentor/performance/${choice}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiZ29vZ2xlIDEwMTU2NzMyNTI3MTY1Mjk0OTQ2MyIsInJvbGUiOiJST0xFX01FTlRFRSIsImlhdCI6MTcyMzkxNTUzNCwiZXhwIjoxNzUzOTE1NTM0fQ.TakPICIU2fJ5f2zjnji4KSP6_qBXe0sg6fs2LzLWuTE`
            },
            params: {
              apiNum: threadCount,
              totalRequests: requestCount,
            }
          });

          const { averageTimesPerThread, overallAverageTime } = response.data;

          const averageTimesString = averageTimesPerThread.map((time, index) => `스레드 ${index + 1}: ${time}ms`).join('\n');
          const resultMessage = `요청이 성공했습니다:\n\n스레드별 평균 시간:\n${averageTimesString}\n\n전체 평균 시간: ${overallAverageTime}ms`;

          alert(resultMessage);
        } catch (error) {
          console.error(error);
          alert(`요청이 실패했습니다: ${error.message}`);
        }
        
      } else {
        alert('올바른 선택이 아닙니다. 1번, 2번, 3번 중에서 선택해주세요.');
      }
    } else if (index === 2) {
      alert('Button on Page 3 clicked! Custom Action for Page 3');
    } else if (index === 5) {
      alert('Button on Page 6 clicked! Custom Action for Page 6');
    }
  }

  return (
    <div className="portfolio-content">
      {images.map((src, index) => (
        <section key={index} className="portfolio-section">
          <div className="portfolio-image-container">
            <img src={src} alt={`Slide ${index + 1}`} className="portfolio-image" />
            {/* 왼쪽 상단의 버튼 (2, 3, 6 페이지에만 렌더링) */}
            {(index === 1 || index === 2 || index === 5) && (
              <button className="top-left-button" onClick={() => handleButtonClick(index)}>
                Action Button
              </button>
            )}
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
