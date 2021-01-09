//animate home elements on refresh
function homeAnimate(){
  const homeElements = [document.querySelector("#hi"), document.querySelector("#william"), document.querySelector("#quotes")];
  for (let index in homeElements){
    homeElements[index].style.opacity = 0;
    homeElements[index].style.animation = `.3s ease-out ${index/7 + .5}s homeAnimate forwards`
  }
}

//Jaden Smith Quotes
function loopQuotes(){
  const quotes = [
     "<a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jaden/status/329768040235413504'>How Can Mirrors Be Real If Our Eyes Aren't Real</a>",
     "<a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jaden/status/575824158216613888'>When You Party I'm On The Treadmill, When You Sleep I'm On The Treadmill, When I Tweet I'm On The Treadmill. Remember This</a>",
     "<a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jaden/status/566065083650809856'>The More Time You Spend Awake The More Time You Spend Asleep.</a>",
     "<a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jaden/status/464965225943662592'>You Can Discover Everything You Need To Know About Everything By Looking At Your Hands</a>",
     "<a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jaden/status/315602583697895424'>Most Trees Are Blue</a>",
     "<a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jaden/status/354478713745846272'>'It's Your Birthday Mateo Said. I Didn't Respond. 'Are You Not Excited To Be 15' He Asked. Reading My Book I Uttered 'I Turned 15 Long Ago'</a>",
     "<a target='_blank' rel='noopener noreferrer' href='https://twitter.com/jaden/status/364983720664514560'>If A Book Store Never Runs Out Of A Certain Book, Dose That Mean That Nobody Reads It, Or Everybody Reads It</a>",
  ]
  function shuffle(a) {
     var j, x, i;
     for (i = a.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1));
         x = a[i];
         a[i] = a[j];
         a[j] = x;
     }
     return a;
  }
  const quotesShuffled = shuffle(quotes)
  const quoteElement = document.querySelector("#quotes");
  i = 0;
  quoteElement.innerHTML = quotesShuffled[i];

  setTimeout(function(){
    quoteElement.style.animation = "2s linear 2s quoteFadeOut both";
  }, 4000);
  setInterval(()=>{
    i = (i + 1) % quotes.length;
    quoteElement.innerHTML = quotesShuffled[i];
    quoteElement.style.animation = "2s linear 0s quoteFadeIn forwards";
    setTimeout(()=>{
      quoteElement.style.animation = "2s linear 2s quoteFadeOut both";
    }, 4000);
  }, 8000);
}

//animate orbit on homescreen
function homeOrbit() {
  const canvas = document.querySelector('#homeOrbit');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 500;

  class Particle{
    //takes startRadian, tailFadeStart, tailFadeEnd as radians
    constructor(startRadian, radius, tailFadeStart, tailFadeEnd, velocity, particleSize) {
      this.startRadian = startRadian;
      this.radius = radius;
      this.tailFadeStart = tailFadeStart;
      this.tailFadeEnd = tailFadeEnd;
      this.velocity = velocity;
      this.particleSize = particleSize;
    }
    draw() {
      ctx.save();
      ctx.translate(canvas.width/2, canvas.height/2);
      let xStart = Math.cos(this.tailFadeStart)*this.radius;
      let yStart = Math.sin(this.tailFadeStart)*this.radius;
      let xEnd = Math.cos(this.tailFadeEnd)*this.radius;
      let yEnd = Math.sin(this.tailFadeEnd)*this.radius;
      let gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
      gradient.addColorStop(0, '#ECECED');
      gradient.addColorStop(1, '#323840');

      ctx.beginPath();
      ctx.fillStyle = '#ECECED';
      ctx.arc(Math.cos(this.startRadian)*this.radius, Math.sin(this.startRadian)*this.radius, this.particleSize, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = '#ECECED';
      ctx.lineWidth = 1.1;
      ctx.arc(0, 0, this.radius, this.startRadian, this.tailFadeStart, true);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.arc(0, 0, this.radius, this.tailFadeStart, this.tailFadeEnd, true);
      ctx.stroke();
      ctx.closePath();

      ctx.restore();
    }
    update() {
      this.startRadian += this.velocity;
      this.tailFadeStart += this.velocity;
      this.tailFadeEnd += this.velocity;
      this.draw();
    }
  }

  let particles = [];
  particles.push(new Particle(0, 60, Math.PI*3/2, Math.PI/6, 0.018, 4));
  particles.push(new Particle(Math.PI*2/3, 80, 0, Math.PI*3/2, 0.02, 5));
  particles.push(new Particle(Math.PI*5/6, 83, Math.PI*5/6, 0, 0.02, 5));
  particles.push(new Particle(Math.PI*3/2, 100, Math.PI, Math.PI/2, 0.025, 8));
  particles.push(new Particle(Math.PI*4/3, 130, Math.PI, Math.PI*2/3, 0.011, 4.5));
  particles.push(new Particle(Math.PI*5/3, 135, Math.PI, Math.PI*5/6, 0.01, 5));
  particles.push(new Particle(Math.PI/2, 155, 0, Math.PI*3/2, 0.009, 3.7));

  function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles){
      particle.update();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

//animate in about section
function aboutTransition(){
  let onHome = true;
  let tl = gsap.timeline();
  tl.to("#right-column", 1.5, {xPercent: 100}, "<");
  tl.fromTo("#about-page", 1, {y: 50}, {y: 0, opacity: 1}, "<");
  tl.to("#welcome-message", 1, {y: -100}, "<")
  tl.pause();
  document.querySelector("#aboutButton").addEventListener("click", function(){
    if (onHome) {
      gsap.to(window, {duration: .5, scrollTo: 0});
      tl.play();
      document.querySelector("body").style.overflow = "hidden";
      onHome = false;
    }
  });;
  document.querySelector("#homeButton").addEventListener("click", function(){
    if (!(onHome)) {
      tl.reverse();
      setTimeout(() => {
        document.querySelector("body").style.overflow = "visible";
        console.log("yes");
      }, 1500);
      onHome = true;
    }
  });;
}




function jsFunctions(){
  homeAnimate();
  loopQuotes();
  homeOrbit();
  aboutTransition();
}

jsFunctions();
