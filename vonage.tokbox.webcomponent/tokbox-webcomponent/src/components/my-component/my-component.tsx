import { Component, Prop, h, Method, State } from '@stencil/core';
//import WebSocket from 'sc-ws';
import jQuery from 'jquery';
// export for others scripts to use


//import a from 'op'
import OtClient, { SubscriberProperties } from '@opentok/client'

import ScreenShareAccPack from 'opentok-screen-sharing'
//import AnnotationAccPack from 'opentok-annotation';
import TextChatAccPack from 'opentok-text-chat';
import { isParameter, formatDiagnosticsWithColorAndContext } from 'typescript';


const options = {
    credentials: {
    apiKey: "46347062",
    sessionId: "1_MX40NjM0NzA2Mn5-MTU2MDc5NzE4MjE4OH5Lb3Yzbi8yWTAwQUFRclh1Uzh4ZWdyTUR-fg",
    token: "T1==cGFydG5lcl9pZD00NjM0NzA2MiZzaWc9NjkwZWZlNGIxMDBiMTIxNGIwZTJmYmRiNDAyMDI3YmU1ZmY1MjZjMDpzZXNzaW9uX2lkPTFfTVg0ME5qTTBOekEyTW41LU1UVTJNRGM1TnpFNE1qRTRPSDVMYjNZemJpOHlXVEF3UVVGUmNsaDFVemg0WldkeVRVUi1mZyZjcmVhdGVfdGltZT0xNTYwNzk3MjUzJm5vbmNlPTAuNTYyMTgzNTQxNDkxMjg3MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTYzMzg5MjUzJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"
  }
};

const sessionIdFor1To1 = "2_MX40NjM0NzA2Mn5-MTU2MTMwMzM4NzI0OX4xYkt2RDRJamVoU1g4ZWhnQWZ2MGZQenN-fg"
const tokenFor1To1 = "T1==cGFydG5lcl9pZD00NjM0NzA2MiZzaWc9MzAwYmIyZWVhY2RhOWUyMTZjYjdmN2Y3N2U3NjI1NzZkMTQ4ZWEyYTpzZXNzaW9uX2lkPTJfTVg0ME5qTTBOekEyTW41LU1UVTJNVE13TXpNNE56STBPWDR4WWt0MlJEUkphbVZvVTFnNFpXaG5RV1oyTUdaUWVuTi1mZyZjcmVhdGVfdGltZT0xNTYxMzAzNDM3Jm5vbmNlPTAuMDc0NTQ1ODA3OTIzNjk2MDMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU2Mzg5NTQzNiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @Prop()
  targetUserName: string = '';

  @Prop()
  userName: string = '';

  @State()
  connected: boolean = false;

  subscriberEl: HTMLElement;
  publisherEl: HTMLElement;
  screenShareEl: HTMLElement;
  screenPublishEl: HTMLElement;
  oneToOnePublisher: HTMLElement;
  chatEl:  HTMLElement;
  feedControlsEl:  HTMLElement;

  session : OtClient.Session;
  oneToOneSession : OtClient.Session;
  //annotation: AnnotationAccPack;
  currentStreamMap = new Map();


  initiateSession(targetUser){
    if(!this.session) {
      throw 'No Session Established'
    }

    console.log(targetUser);

    this.initTextChat();
    this.session.signal(
      {
        data: JSON.stringify({ sessionIdFor1To1, tokenFor1To1}),
        type: `invite-${targetUser}`
      },
      (error) => {
        if (error) {
          console.log("signal error ("
                       + error.name
                       + "): " + error.message);
        } else {
          console.log("signal sent.");
          this.oneToOneSession.connect(tokenFor1To1, (error)=>{
              if (error) {
                this.handleError(error);
              } else {
                const publisher = OT.initPublisher(this.publisherEl, {
                  insertMode: 'append',
                  width: '100%',
                  height: '100%'
                }, this.handleError);

                this.oneToOneSession.publish(publisher, this.handleError);
              }
          });
        }
      }
    );
  }


  handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  

  initTextChat() {
    const textChatOptions = {
      session: this.session,
      sender: {
        id: 'myCustomIdentifier',
        alias: this.userName,
      },
      limitCharacterMessage: 160,
      controlsContainer: 'feedControls',
      textChatContainer: this.chatEl,
      alwaysOpen: true
     };
    const textChat = new TextChatAccPack(textChatOptions);
  }

  startAnnotation() {
    // this.annotation = new AnnotationAccPack({
    //   session: this.oneToOneSession,
    //   absoluteParent: {
    //     publisher: '.App-video-container',
    //     subscriber: '.App-video-container'
    //   }
    // });
    // this.annotation.start();
  }

  componentDidRender() {
      console.log("componentDidLoad");
      console.log("OT supported", OtClient.checkSystemRequirements());


      console.log(this.publisherEl)
     

      console.log('session ->');
      this.session = OtClient.initSession(options.credentials.apiKey, options.credentials.sessionId, {}); 
      console.log('init session ->');
      this.session.connect(options.credentials.token,(error)=>{
          if (error) {
            this.handleError(error);
          } else {
            this.connected = true;
          }
      });

      this.oneToOneSession = OtClient.initSession(options.credentials.apiKey, sessionIdFor1To1, {}); 
      this.session.on(`signal:invite-${this.userName}` as "archiveStarted", (event: any) => {
        console.log("Signal sent from connection " + event.from.id);
        const { sessionIdFor1To1, tokenFor1To1 } = JSON.parse(event.data);
        console.log('init session ->');
        this.oneToOneSession.connect(tokenFor1To1, (error)=>{
            if (error) {
              this.handleError(error);
            } else {
            }
        });
      });

      this.oneToOneSession.on('streamCreated', (event) => {
        const options: SubscriberProperties = { insertMode: 'append', width: '100%', height: '100%' };
        if(event.stream.videoType === 'screen') {
          const element = document.createElement('div');
          this.screenShareEl.appendChild(element);
          this.oneToOneSession.subscribe(event.stream, element, options);
        } else {
          console.log(event)
          const alreadyConnected = this.currentStreamMap.has(event.stream.streamId);
          if (alreadyConnected) {
            return;
          }
          this.currentStreamMap.set(event.stream.streamId, true)
          const element = document.createElement('div');
          this.subscriberEl.appendChild(element);
          this.oneToOneSession.subscribe(event.stream, element, options);
        }
      });

  }
 
 
  shareScreen2 () {
    let publishOptions = { 
      session: this.oneToOneSession,
      extensionID: 'plocfffmbcclpdifaikiikgplfnepkpo',
      // annotation: true,
      externalWindow: true,
      dev: true,
      screenSharingContainer: this.screenPublishEl,
      screenProperties: {
        insertMode: 'append',
        width: '100%',
        height: '100%',
        showControls: true,
        style: {
          buttonDisplayMode: 'true',
        },
        videoSource: 'screen',
        fitMode: 'contain' // Using default
      }
    }
    // let publishOptions = {} as any;
    // publishOptions.maxResolution = { width: 1920, height: 1080 };
    // publishOptions.videoSource = 'screen';
    var share = new ScreenShareAccPack(publishOptions);
    share.start();

    console.log("share instance", share);
  }

  shareScreen () { 
      console.log("something???",this);
      this.shareScreen2();
      return;
  }
  
  render() {
    return <div id="appVideoContainer" class="App-video-container">
      <link rel="stylesheet" href="https://assets.tokbox.com/solutions/css/style.css"></link>

      {this.connected ?
        (<button onClick={() => {this.initiateSession(this.targetUserName)}}>Invite {this.targetUserName}</button>) :
        (<span>Connecting...</span>)}
      <button onClick={() => {this.shareScreen();}}>Screen Share</button>
      <button onClick={() => {this.startAnnotation();}}>Anonotation</button>

      <div id="videos">
          <div id="subscriber" ref={el => this.subscriberEl = el as HTMLElement}></div>
          <div id="publisher" ref={el => this.publisherEl = el as HTMLElement}></div>
          <div id="screenShare" ref={el => this.screenShareEl = el as HTMLElement}></div>
          <div id="screenPublish" ref={el => this.screenPublishEl = el as HTMLElement}></div>
          <div id="sub-screen-sharing-container"></div>
          <div id="chatContainer"  ref={el => this.chatEl = el as HTMLElement}></div>
          <div id="feedControls"  ref={el => this.feedControlsEl = el as HTMLElement}></div>
        </div> 
      </div>;
  }


  
}
