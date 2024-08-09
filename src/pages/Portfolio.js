import React from 'react';

const Portfolio = () => {
  return (
    <div>
      {/* Canva 프레젠테이션 임베드 */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 0,
        paddingTop: '56.25%',
        paddingBottom: 0,
        boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
        marginTop: '1.6em',
        marginBottom: '0.9em',
        overflow: 'hidden',
        borderRadius: '8px',
        willChange: 'transform'
      }}>
        <iframe
          title="My Canva Presentation"  // title 속성 추가
          loading="lazy"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0
          }}
          src="https://www.canva.com/design/DAGK6kGDzGI/IYA2R39Vuej2NAnlW4U82g/view?embed"
          allowFullScreen
        ></iframe>
        {/* 나머지 슬라이드들에 대해서도 동일하게 버튼 추가 */}
      </div>
    </div>
  );
}

export default Portfolio;
