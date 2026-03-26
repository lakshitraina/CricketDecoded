import React, { useEffect, useRef } from 'react';

const AdComponent = ({ adKey, height, width, type = 'banner' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !adKey) return;

    const currentRef = containerRef.current;
    if (!currentRef) return;

    // Clear previous ad if any
    currentRef.innerHTML = '';

    if (type === 'native') {
      // Native Banner
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = `https://pl28986520.profitablecpmratenetwork.com/${adKey}/invoke.js`;
      
      const div = document.createElement('div');
      div.id = `container-${adKey}`;
      
      currentRef.appendChild(script);
      currentRef.appendChild(div);
    } else {
      // Standard Banner (iframe based)
      const atOptionsScript = document.createElement('script');
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      
      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
      
      currentRef.appendChild(atOptionsScript);
      currentRef.appendChild(invokeScript);
    }
  }, [adKey, height, width, type]);

  return (
    <div 
      className="ad-container" 
      style={{ 
        margin: '1.5rem auto', 
        textAlign: 'center', 
        minHeight: height ? `${height}px` : 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      ref={containerRef}
    />
  );
};

export default AdComponent;
