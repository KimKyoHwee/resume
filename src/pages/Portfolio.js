import React, { useEffect, useState } from 'react';
import './Portfolio.css';
import port1 from "../assets/port1.jpg";
import port2 from "../assets/port2.jpg";
import port3 from "../assets/port3.jpg";
import port4 from "../assets/port4.jpg";
import port5 from "../assets/port5.jpg";
import port6 from "../assets/port6.jpg";
import port7 from "../assets/port7.jpg";
import axios from 'axios';

const images = [
  port1, port2, port3, port4, port5, port6, port7
];

const Portfolio = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  const handleButtonClick = async (index) => {
    if (index === 0) { // 첫 번째 페이지 (이전 2페이지)
      const choice = prompt('1번(기존 방법), 2번(일반 Join), 3번(Fetch Join) 중 선택해주세요:', '1');
      if (choice === '1' || choice === '2' || choice === '3') {
        let threadCount = prompt('생성할 스레드 수를 입력하세요 (1~10):', '1');
        let requestCount = prompt('각 스레드별로 보낼 요청 수를 입력하세요 (1~50):', '1');

        // 숫자 확인 및 제한 적용
        threadCount = parseInt(threadCount, 10);
        requestCount = parseInt(requestCount, 10);

        if (isNaN(threadCount) || threadCount < 1 || threadCount > 10) {
          alert('스레드 수는 1에서 10 사이의 숫자여야 합니다.');
          return;
        }

        if (isNaN(requestCount) || requestCount < 1 || requestCount > 50) {
          alert('요청 수는 1에서 50 사이의 숫자여야 합니다.');
          return;
        }

        setLoading(true); // 로딩 상태 시작

        try {
          const response = await axios.get(`https://kyohwee.site/api/v1/mentor/performance/${choice}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiZ29vZ2xlIDEwMTU2NzMyNTI3MTY1Mjk0OTQ2MyIsInJvbGUiOiJST0xFX01FTlRFRSIsImlhdCI6MTcyMzkxNTUzNCwiZXhwIjoxNzUzOTE1NTM0fQ.TakPICIU2fJ5f2zjnji4KSP6_qBXe0sg6fs2LzLWuTE`
            },
            params: {
              userCount: threadCount,
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
        } finally {
          setLoading(false); // 로딩 상태 종료
        }

      } else {
        alert('올바른 선택이 아닙니다. 1번, 2번, 3번 중에서 선택해주세요.');
      }
    } else if (index === 1) { // 두 번째 페이지 (이전 3페이지)
      let apiNum = prompt('1번(기존 방법), 2번(Fetch Join) 중 선택해주세요:', '1');
      let userCount = prompt('userCount 값을 입력하세요 (1~10):', '1');
      let totalRequests = prompt('totalRequests 값을 입력하세요 (1~50):', '1');

      // 숫자 확인 및 제한 적용
      userCount = parseInt(userCount, 10);
      totalRequests = parseInt(totalRequests, 10);
      apiNum = parseInt(apiNum, 10);

      if (isNaN(userCount) || userCount < 1 || userCount > 10) {
        alert('userCount는 1에서 10 사이의 숫자여야 합니다.');
        return;
      }

      if (isNaN(totalRequests) || totalRequests < 1 || totalRequests > 50) {
        alert('totalRequests는 1에서 50 사이의 숫자여야 합니다.');
        return;
      }

      if (isNaN(apiNum) || (apiNum !== 1 && apiNum !== 2)) {
        alert('apiNum은 1 또는 2여야 합니다.');
        return;
      }

      const requestBody = {
        applicationCreateRequest: {
          date: "2024-08-19",
          start_time: "14:00",
          end_time: "16:00",
          mentor_id: 2
        },
        performanceRequest: {
          userCount: userCount,
          totalRequests: totalRequests
        },
        apiNum: apiNum
      };

      setLoading(true); // 로딩 상태 시작

      try {
        const response = await axios.post(`https://kyohwee.site/api/v1/application`, requestBody, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiZ29vZ2xlIDEwMTU2NzMyNTI3MTY1Mjk0OTQ2MyIsInJvbGUiOiJST0xFX01FTlRFRSIsImlhdCI6MTcyMzkxNTUzNCwiZXhwIjoxNzUzOTE1NTM0fQ.TakPICIU2fJ5f2zjnji4KSP6_qBXe0sg6fs2LzLWuTE`,
            'Content-Type': 'application/json'
          }
        });

        const { averageTimesPerThread, overallAverageTime } = response.data;

        const averageTimesString = averageTimesPerThread.map((time, index) => `스레드 ${index + 1}: ${time}ms`).join('\n');
        const resultMessage = `요청이 성공했습니다:\n\n스레드별 평균 시간:\n${averageTimesString}\n\n전체 평균 시간: ${overallAverageTime}ms`;

        alert(resultMessage);
      } catch (error) {
        console.error(error);
        alert(`요청이 실패했습니다: ${error.message}`);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }

    } else if (index === 4) { // 다섯 번째 페이지 (이전 6페이지)
      let apiNum = prompt('1번(비동기 처리 없음), 2번(비동기 처리) 중 선택해주세요:', '1');
      let email = prompt('이메일을 입력하세요:');

      // 숫자 확인 및 제한 적용
      apiNum = parseInt(apiNum, 10);

      if (isNaN(apiNum) || (apiNum !== 1 && apiNum !== 2)) {
        alert('apiNum은 1 또는 2여야 합니다.');
        return;
      }

      if (!email) {
        alert('이메일을 입력해야 합니다.');
        return;
      }

      const url = apiNum === 1
        ? `https://kyohwee.site/api/v1/email/noAsync`
        : `https://kyohwee.site/api/v1/email/async`;

      setLoading(true); // 로딩 상태 시작

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiZ29vZ2xlIDEwMTU2NzMyNTI3MTY1Mjk0OTQ2MyIsInJvbGUiOiJST0xFX01FTlRFRSIsImlhdCI6MTcyMzkxNTUzNCwiZXhwIjoxNzUzOTE1NTM0fQ.TakPICIU2fJ5f2zjnji4KSP6_qBXe0sg6fs2LzLWuTE`
          },
          params: {
            email: email
          }
        });

        const responseTime = response.data; // 서버가 반환하는 Long 타입의 응답 시간

        const resultMessage = `요청이 성공했습니다:\n\n응답 시간: ${responseTime}ms`;

        alert(resultMessage);
      } catch (error) {
        console.error(error);
        alert(`요청이 실패했습니다: ${error.message}`);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    }
  };

  // 페이지 간 부드러운 이동 및 마우스 위치에 따른 커서 변경 처리
  const scrollToSection = (direction) => {
    const sections = document.querySelectorAll('.portfolio-section');
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
    <div className="portfolio-content">
      {loading && <div className="loading">Loading...</div>} {/* 로딩 메시지 */}
      {images.map((src, index) => (
        <section key={index} className="portfolio-section">
          <div className="portfolio-image-container">
            <img src={src} alt={`Slide ${index + 1}`} className="portfolio-image" />
            {/* 왼쪽 상단의 버튼 (1, 2, 5 페이지에만 렌더링) */}
            {(index === 0 || index === 1 || index === 4) && (
              <button className="top-left-button" onClick={() => handleButtonClick(index)}>
                API 성능 측정하기
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
