import { Controller } from '@hotwired/stimulus';

const RadioController = class extends Controller {
  static targets = ['player'];

  connect() {
    this.broadcastPlayer('https://embed.radio.co/player/b84cf70.html');
  }

  play(e) {
    const target = e.target.closest('.playable');
    this.broadcastPlayer(target.dataset.url);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  broadcastPlayer(src) {

    // if (!this.playerTarget.innerHTML) {
    this.playerTarget.innerHTML = "";
    const player = document.createElement('iframe');
    player.height = "120";
    player.width = "100%";
    player.allow = "autoplay";
    player.src = src;
    this.playerTarget.insertAdjacentElement('beforeend', player);
    // } else {
    //   const playerEl = this.element.querySelector('iframe');
    //   // playerEl.src = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=${src}`;
    //   let player;

    //     player = Mixcloud.PlayerWidget(playerEl);

    //     console.log('pl', player, playerEl)

    //   //   player.events.error.on(function(e) {
    //   //     console.log('e', e)
  
    //   // });

    //     player.ready.then(function(p) {
    //       console.log('p', p, src)
    //       player.load(src, true).then((x) => {
    //         console.log('play', player)
    //         // player.play();
    //         playerEl.click()
    //       })
    //   });





      
    //   // player.src = src;
    // }
    
  }
};

export default RadioController;
