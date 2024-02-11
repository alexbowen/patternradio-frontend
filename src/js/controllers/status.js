import { Controller } from '@hotwired/stimulus';
import { io } from "socket.io-client";

const StatusController = class extends Controller {
  static targets = ['track'];

  connect() {
    fetch('https://public.radio.co/stations/s3ad39def4/next?v=1687467845917')
      .then((response) => response.json())
      .then((data) => {
        this.panel(data);
      });

    window.setInterval(() => {
      fetch('https://public.radio.co/stations/s3ad39def4/next?v=1687467845917')
        .then((response) => response.json())
        .then((data) => {
          this.panel(data);
        });
    }, 10000);

    

// const manager = new Manager('wss://eventsub.wss.twitch.tv/ws');

const socket = io('wss://eventsub.wss.twitch.tv/ws');

socket.on('message', (data) => {
  console.log('data', data);
})

    let pingInterval;
    let sessionID;

    // const socket = io('wss://eventsub.wss.twitch.tv/ws');

    // socket.on('message', (data) => {
    //   console.log('data', data);
    // })

    // console.log('ws', ws)

  //   ws.onerror = (e) => {
  //     console.error('error', e);
  // };

    // ws.onopen = function (e) {
    //   console.log('opened', e)
    //   pingInterval = setInterval(() => {
    //     const test = {
    //       "type": "stream.online",
    //       "version": "1",
    //       "condition": {
    //         "broadcaster_user_id": "1025729262"
    //       },
    //       "transport": {
    //         "method": "websocket",
    //         "session_id": sessionID
    //       }
    //     };
  
    //     ws.send(JSON.stringify(test));
    //   }, 5000);
    // };
    // ws.onclose = function (e) {
    //   console.log('close', e)
    //   clearInterval(pingInterval);
    // };

    // ws.onmessage = function (event) {
      
    //   const json = JSON.parse(event.data);

    //   console.log('received:', json);


    //   if (json.metadata.message_type === 'session_welcome') {
    //     sessionID = json.payload.session.id;
    // }
    // };
  }

  panel(next) {
    this.trackTarget.innerHTML = next.next_track.title;
  }
};

export default StatusController;
