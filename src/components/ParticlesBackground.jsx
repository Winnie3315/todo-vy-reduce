// // src/components/ParticlesBackground.jsx
// import React, { useEffect } from 'react';

// const ParticlesBackground = () => {
//   useEffect(() => {
//     if (window.particlesJS) {
//       window.particlesJS('particles-js', {
//         "particles": {
//           "number": {
//             "value": 50
//           },
//           "color": {
//             "value": "#ffffff"
//           },
//           "shape": {
//             "type": "circle"
//           },
//           "size": {
//             "value": 3
//           },
//           "line_linked": {
//             "enable": true,
//             "color": "#ffffff",
//             "distance": 150,
//             "opacity": 0.5,
//             "width": 1
//           },
//           "move": {
//             "enable": true,
//             "speed": 1,
//             "out_mode": "bounce"
//           }
//         },
//         "retina_detect": true
//       });
//     }
//   }, []);

//   return <div id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}></div>;
// };

// export default ParticlesBackground;
