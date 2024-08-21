import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [apiNum, setApiNum] = useState('');
  const [threadCount, setThreadCount] = useState('');
  const [requestCount, setRequestCount] = useState('');
  const [email, setEmail] = useState('');
  const [modalText, setModalText] = useState('');

  const handleButtonClick = (index) => {
    setCurrentPage(index);
    switch (index) {
      case 0:
        setModalText('\nAPI 번호 : 1번(기존 방법), 2번(Fetch Join), 3번(일반 Join)\n생성할 스레드 수 : 1~10개\n스레드당 수행할 요청의 수 : 1~30개\n');
        break;
      case 1:
        setModalText('\nAPI 번호 : 1번(기존 방법), 2번(Fetch Join)\n생성할 스레드 수 : 1~10개\n스레드당 수행할 요청의 수 : 1~30개\n');
        break;
      case 4:
        setModalText('\nAPI 번호 : 1번(동기 처리), 2번(비동기 처리)\n메일 : 테스트 메일을 받으실 이메일을 적어주세요\n');
        break;
      default:
        setModalText('API 테스트 설정을 입력해주세요.');
    }
    setModalVisible(true);
  };

  const handleModalSubmit = async () => {
    const apiNumInt = parseInt(apiNum, 10);
    const threadCountInt = parseInt(threadCount, 10);
    const requestCountInt = parseInt(requestCount, 10);

    let validApiNum = false;
    if (currentPage === 0 && (apiNumInt >= 1 && apiNumInt <= 3)) validApiNum = true;
    if (currentPage === 1 && (apiNumInt >= 1 && apiNumInt <= 2)) validApiNum = true;
    if (currentPage === 4 && (apiNumInt >= 1 && apiNumInt <= 2)) validApiNum = true;

    if (
      (!validApiNum) ||
      (currentPage !== 4 && (isNaN(threadCountInt) || threadCountInt < 1 || threadCountInt > 10 || isNaN(requestCountInt) || requestCountInt < 1 || requestCountInt > 30)) ||
      (currentPage === 4 && (!email))
    ) {
      alert('잘못된 입력입니다. API 번호, 스레드 수, 요청 수, 또는 이메일을 확인하세요.');
      return;
    }

    setLoading(true); 
    setModalVisible(false);

    try {
      let response;

      if (currentPage === 0) {
        let api=1;
        if(apiNumInt===2) api=3;
        if(apiNumInt===3) api=2;
        // 첫 번째 페이지의 API 호출 (API 1)
  

        response = await axios.get(`https://kyohwee.site/api/v1/mentor/performance/${api}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiZ29vZ2xlIDEwMTU2NzMyNTI3MTY1Mjk0OTQ2MyIsInJvbGUiOiJST0xFX01FTlRFRSIsImlhdCI6MTcyMzkxNTUzNCwiZXhwIjoxNzUzOTE1NTM0fQ.TakPICIU2fJ5f2zjnji4KSP6_qBXe0sg6fs2LzLWuTE`,
            'Content-Type': 'application/json'
          },
          params: {
            userCount: threadCountInt,
            totalRequests: requestCountInt
          }
        });

        const { averageTimesPerThread, overallAverageTime } = response.data;

        if (averageTimesPerThread && overallAverageTime !== undefined) {
          const averageTimesString = averageTimesPerThread.map((time, index) => `스레드 ${index + 1}: ${time}ms`).join('\n');
          const resultMessage = `요청이 성공했습니다:\n\n스레드별 평균 시간:\n${averageTimesString}\n\n전체 평균 시간: ${overallAverageTime}ms`;

          alert(resultMessage);
        } else {
          alert("API 요청은 성공했으나, 예상된 데이터 형식이 아닙니다.");
        }
      } else if (currentPage === 1) {
        // 두 번째 페이지의 API 호출 (API 2)
        const requestBody = {
          applicationCreateRequest: {
            date: "2024-08-19",
            start_time: "14:00",
            end_time: "16:00",
            mentor_id: 2
          },
          performanceRequest: {
            userCount: threadCountInt,
            totalRequests: requestCountInt
          },
          apiNum: apiNumInt
        };

        response = await axios.post(`https://kyohwee.site/api/v1/application`, requestBody, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiZ29vZ2xlIDEwMTU2NzMyNTI3MTY1Mjk0OTQ2MyIsInJvbGUiOiJST0xFX01FTlRFRSIsImlhdCI6MTcyMzkxNTUzNCwiZXhwIjoxNzUzOTE1NTM0fQ.TakPICIU2fJ5f2zjnji4KSP6_qBXe0sg6fs2LzLWuTE`,
            'Content-Type': 'application/json'
          }
        });

        const { averageTimesPerThread, overallAverageTime } = response.data;

        if (averageTimesPerThread && overallAverageTime !== undefined) {
          const averageTimesString = averageTimesPerThread.map((time, index) => `스레드 ${index + 1}: ${time}ms`).join('\n');
          const resultMessage = `요청이 성공했습니다:\n\n스레드별 평균 시간:\n${averageTimesString}\n\n전체 평균 시간: ${overallAverageTime}ms`;

          alert(resultMessage);
        } else {
          alert("API 요청은 성공했으나, 예상된 데이터 형식이 아닙니다.");
        }
      } else if (currentPage === 4) {
        // 다섯 번째 페이지의 API 호출
        response = await axios.get(`https://kyohwee.site/api/v1/email/${apiNumInt === 1 ? 'noAsync' : 'async'}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoiZ29vZ2xlIDEwMTU2NzMyNTI3MTY1Mjk0OTQ2MyIsInJvbGUiOiJST0xFX01FTlRFRSIsImlhdCI6MTcyMzkxNTUzNCwiZXhwIjoxNzUzOTE1NTM0fQ.TakPICIU2fJ5f2zjnji4KSP6_qBXe0sg6fs2LzLWuTE`
          },
          params: {
            email: email
          }
        });
  
        const responseTime = response.data;

        if (typeof responseTime === 'number') {
          const resultMessage = `요청이 성공했습니다:\n\n응답 시간: ${responseTime}ms`;
          alert(resultMessage);
        } else {
          alert("API 요청은 성공했으나, 예상된 데이터 형식이 아닙니다.");
        }
      }
    } catch (error) {
      console.error(error);
      alert(`요청이 실패했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = (event) => {
    event.stopPropagation(); 
    setModalVisible(false);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const y = event.clientY;
      const height = window.innerHeight;

      if (modalVisible) {
        document.body.style.cursor = 'default';
      } else {
        if (y <= height / 2) {
          document.body.style.cursor = 'n-resize';
        } else {
          document.body.style.cursor = 's-resize';
        }
      }
    };

    const handleClick = (event) => {
      if (modalVisible) {
        event.stopPropagation(); 
        return;
      }

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
  }, [modalVisible]);

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

  return (
    <div className="portfolio-content">
      {loading && <div className="loading">Loading...</div>} 
      {modalVisible && (
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <h2>API 테스트 설정</h2>
            <p className="modal-text">{modalText}</p> 
            <input
              type="number"
              placeholder="API 번호"
              value={apiNum}
              onChange={(e) => setApiNum(e.target.value)}
            />
            {(currentPage !== 4) && (
              <>
                <input
                  type="number"
                  placeholder="스레드 수"
                  value={threadCount}
                  onChange={(e) => setThreadCount(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="요청 수"
                  value={requestCount}
                  onChange={(e) => setRequestCount(e.target.value)}
                />
              </>
            )}
            {currentPage === 4 && (
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <div className="modal-buttons">
              <button onClick={handleModalSubmit}>확인</button>
              <button onClick={handleModalCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
      {images.map((src, index) => (
        <section key={index} className="portfolio-section">
          <div className="portfolio-image-container">
            <img src={src} alt={`Slide ${index + 1}`} className="portfolio-image" />
            {(index === 0 || index === 1 || index === 4) && (
              <button className="bottom-center-button" onClick={() => handleButtonClick(index)}>
                API 성능 측정하기
              </button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Portfolio;
