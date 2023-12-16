let lives = 4;
let match = 0;
let reset = false;
let revealed = [];

function showAns() {
  if (lives > 0) {
    const images = document.querySelectorAll('#game img');

    images.forEach((image, index) => {
      if (match !== 2 && image.classList.contains('blur')) {
        image.classList.add('showAns');
        match++;
      } else if (match === 2 && !reset) {
        reset = true;
        revealed.push(images[index].src.split('/').pop());

        if (revealed.length > 1 && revealed[0] !== revealed[1]) {
          lives--;
          setTimeout(() => {
            for (let i = 0; i < revealed.length; i++) {
              const blurredImage = document.querySelectorAll('.showAns')[i];
              blurredImage.classList.remove('showAns');
              blurredImage.parentNode.classList.add('revealed');
            }
            match = 0;
            reset = false;
          }, 1000);
        } else {
          setTimeout(() => {
            for (let i = 0; i < revealed.length; i++) {
              const blurredImage = document.querySelectorAll('.showAns')[i];
              blurredImage.classList.remove('showAns');
              blurredImage.parentNode.classList.add('revealed');
            }
            match = 0;
            reset = false;
          }, 1000);
        }
      }

      if (lives === 0) {
        const end = document.getElementById('endgame');
        end.innerHTML = 'You Lose';
        end.style.color = 'red';
        end.style.visibility = 'visible';
      }

      if (document.querySelectorAll('.revealed').length === 12) {
        const end = document.getElementById('endgame');
        end.innerHTML = 'You Win';
        end.style.color = 'blue';
        end.style.visibility = 'visible';
      }
    });
  }
}

function init() {
  const seq = '001122334455';
  let scramble = '';

  while (seq.length > 0) {
    const randomIndex = Math.floor(Math.random() * seq.length);
    scramble += seq.charAt(randomIndex);
    seq.replace(seq.charAt(randomIndex), ' ');
  }

  const filenames = ['zero', 'one', 'two', 'three', 'four', 'five'];
  const gameDiv = document.getElementById('game');

  for (let i = 0; i < scramble.length; i++) {
    const wrapper = document.createElement('div');
    const img = document.createElement('img');
    img.classList.add('blur');
    img.src = `images/${filenames[parseInt(scramble.charAt(i))]}${parseInt(scramble.charAt(i))}.jpg`;
    wrapper.appendChild(img);
    gameDiv.appendChild(wrapper);
  }

  const images = document.querySelectorAll('#game img');

  images.forEach(image => {
    image.onclick = showAns;
    reposition();
  });
}

function reposition() {
  const end = document.getElementById('endgame');
  end.style.left = `${(window.innerWidth - end.clientWidth) / 2}px`;
  end.style.top = `${(window.innerHeight - end.clientHeight) / 2}px`;
}

window.onload = () => {
  init();
};