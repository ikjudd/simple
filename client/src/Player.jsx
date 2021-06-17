// import React from 'react'
// // import lottieWeb from 'https://cdn.skypack.dev/lottie-web'
// import '/src/style.css'


// const playToPause = () => {
//         // vvariable for the button that will contain both icons
//         const playIconContainer = document.getElementById('play-icon')
//         // variable that will store the button's current state (play or pause)
//         let state = 'play'
//         // loads the animation that transitions the play icon into the pause icon, then into the referenced button.. 
//             // all while using Lottie's loadAnimation() method
//         const animation = lottieWeb.loadAnimation({
//             container: playIconContainer,
//             path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
//             renderer: 'svg',
//             loop: false,
//             autoplay: false,
//             name: "Demo Animation",
//         });
    
//         animation.goToAndStop(14, true);

//         if(state === 'play') {
//             animation.playSegments([14, 27], true);
//             state = 'pause';
//           } else {
//             animation.playSegments([0, 14], true);
//             state = 'play';
//           }
    
// }

// export default function Player() {

//     return (
//         <div className='audio-player-container'>
//             <button id='play-icon' onClick={playToPause}></button>
//             <span id="current-time" className="time">0:00</span>
//             <input type="range" id="seek-slider" max="100" value="0"/>
//             <span id="duration" className="time">0:00</span>
//             <output id="volume-output">100</output>
//             <input type="range" id="volume-slider" max="100" value="100" />
//             <button id="mute-icon"></button>
//         </div>
//     )
// }
