import { Component, Prop, h } from '@stencil/core';
import AccCore from  'opentok-accelerator-core';

import  AnnotationAccPack from 'opentok-annotation';
import ArchivingAccPack from 'opentok-archiving'
import ScreenSharingAccPack from 'opentok-screen-sharing'
import TextChatAccPack from 'opentok-text-chat'
import OtLogging from 'opentok-solutions-logging'


let otCore;

// import Core from './ot-core/core';

//import 'opentok-solutions-css';

// import { format } from '../../utils/utils';
const options = {
  // A container can either be a query selector or an HTMLElement
  // eslint-disable-next-line no-unused-vars
  streamContainers: function streamContainers(pubSub, type) {
    return {
      publisher: {
        camera: '#cameraPublisherContainer',
        screen: '#screenPublisherContainer',
      },
      subscriber: {
        camera: '#cameraSubscriberContainer',
        screen: '#screenSubscriberContainer',
      },
    }[pubSub][type];
  },
  controlsContainer: '#controls',
  packages: ['textChat', 'screenSharing', 'annotation', 'archiving'],
  communication: {
    callProperties: null, // Using default
  },
  textChat: {
    name: ['David', 'Paul', 'Emma', 'George', 'Amanda'][Math.random() * 5 | 0], // eslint-disable-line no-bitwise
    waitingMessage: 'Messages will be delivered when other users arrive',
    container: '#chat',
  },
  screenSharing: {
    extensionID: 'plocfffmbcclpdifaikiikgplfnepkpo',
    annotation: true,
    externalWindow: false,
    dev: true,
    screenProperties: null, // Using default
  },
  annotation: {

  },
  archiving: {
    startURL: 'https://example.com/startArchive',
    stopURL: 'https://example.com/stopArchive',
  },
};


@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */


  private state = {
    connected: false,
    active: false,
    publishers: null,
    subscribers: null,
    meta: null,
    localAudioEnabled: true,
    localVideoEnabled: true,
  };

  @Prop() test: string;

  componentDidLoad() {
      console.log('componentDidLoad ->');
      otCore = new AccCore(options);  
      otCore.connect().then(function() { this.updateState({ connected: true }); });
      console.log('otCore created', otCore);
  }

  updateState(updates) {
    Object.assign(this.state, updates);
    Object.keys(updates).forEach(update => this.updateUI(update));
  };

  updateUI = (update) => {
    const { connected, active } = this.state;

    switch (update) {
      case 'connected':
        if (connected) {
          document.getElementById('connecting-mask').classList.add('hidden');
          document.getElementById('start-mask').classList.remove('hidden');
        }
        break;
      case 'active':
        if (active) {
          document.getElementById('cameraPublisherContainer').classList.remove('hidden');
          document.getElementById('start-mask').classList.add('hidden');
          document.getElementById('controls').classList.remove('hidden');
        }
        break;
      case 'meta':
        //updateVideoContainers();
        break;
      default:
        console.log('nothing to do, nowhere to go');
    }
  };
 
  render() {
    return <div>We are here!! <div id="appVideoContainer" class="App-video-container"></div> </div>;
  }


  
}
