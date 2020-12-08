const setTimers = document.getElementById('js-set-timers')
const mainHeading = document.getElementById('js-main-heading')
const howToUse = document.getElementById('js-how-to-use')

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.lang = 'ru-RU';

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript

  console.log(msg)
  if(msg.toLowerCase() === 'маша время'){
    setRoshanTimer()
  }
}

function setRoshanTimer(){
  const timedItem = document.createElement('li')
  timedItem.classList.add('set-timers__item')
  timedItem.classList.add('set-timers__item--roshan')

  const rosh = document.querySelector('.set-timers__item--roshan')
  if(rosh === null){
    let sec = 479 // 8 min = 480s
    let sec2 = 659 // 11 min = 660s
    let spawnSoonIndicator = false;

    mainHeading.classList.add('hidden')
    howToUse.classList.add('hidden')

    const timer = setInterval(() => {
      timedItem.innerHTML= `<h1><span class="timer-set-msg">Рошан появится через</span> <span class="timer-set">${Math.floor(sec % 3600 / 60)}м ${Math.floor(sec % 3600 % 60)}с - ${Math.floor(sec2 % 3600 / 60)}м ${Math.floor(sec2 % 3600 % 60)}с</span></h1>`
      sec--
      sec2--
      if (sec < 0 && sec2 > 0) {
        sec++
        const setTimerMsg = document.querySelector('.timer-set-msg');
        setTimerMsg.innerHTML = 'Рошан вот-вот появится'
        
        if(spawnSoonIndicator === false){
          document.body.classList.add('bg-red')
          setTimeout(() => {
            document.body.classList.remove('bg-red')
            setTimerMsg.classList.add('c-red')
          }, 2000);
          spawnSoonIndicator = true;
        }
        
      }else if(sec < 0 && sec2 < 0){
        const setTimerMsg = document.querySelector('.timer-set-msg');
        setTimerMsg.innerHTML = 'Рошан появился'

        const interval = document.querySelector('.set-timers__item--roshan .timer-set')

        interval.style.display = 'none'
        document.body.classList.add('bg-red')
        setTimeout(() => {
          document.body.classList.remove('bg-red')
          setTimerMsg.classList.add('c-red')
        }, 2000)

        setTimeout(() => {
          const rosh = document.querySelector('.set-timers__item--roshan')
          rosh.remove()
          mainHeading.classList.remove('hidden')
          howToUse.classList.remove('hidden')
        }, 15000)

        clearInterval(timer)
      }
  }, 1000)
  
    setTimers.appendChild(timedItem)
  }
  
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());