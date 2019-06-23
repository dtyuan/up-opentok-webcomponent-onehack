import { Component, Prop, h } from '@stencil/core';
//import WebSocket from 'sc-ws';
import jQuery from 'jquery';
// export for others scripts to use


//import a from 'op'
import OtClient from '@opentok/client'

import ScreenShareAccPack from 'opentok-screen-sharing'
import AnnotationAccPack from 'opentok-annotation';
import TextChatAccPack from 'opentok-text-chat';
import { isParameter } from 'typescript';


const options = {
    credentials: {
    apiKey: "46347062",
    sessionId: "1_MX40NjM0NzA2Mn5-MTU2MDc5NzE4MjE4OH5Lb3Yzbi8yWTAwQUFRclh1Uzh4ZWdyTUR-fg",
    token: "T1==cGFydG5lcl9pZD00NjM0NzA2MiZzaWc9NjkwZWZlNGIxMDBiMTIxNGIwZTJmYmRiNDAyMDI3YmU1ZmY1MjZjMDpzZXNzaW9uX2lkPTFfTVg0ME5qTTBOekEyTW41LU1UVTJNRGM1TnpFNE1qRTRPSDVMYjNZemJpOHlXVEF3UVVGUmNsaDFVemg0WldkeVRVUi1mZyZjcmVhdGVfdGltZT0xNTYwNzk3MjUzJm5vbmNlPTAuNTYyMTgzNTQxNDkxMjg3MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTYzMzg5MjUzJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"
  }
};

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  subscriberEl: HTMLElement;
  publisherEl: HTMLElement;

  session : OtClient.Session;

  annotation: AnnotationAccPack;

  handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  initScreenshare() {

  }

  initTextChat() {
    const textChatOptions = {
      session: this.session,
      sender: {
        id: 'myCustomIdentifier',
        alias: 'David',
      },
      limitCharacterMessage: 160,
      controlsContainer: '#feedControls',
      textChatContainer: '#chatContainer',
      alwaysOpen: true
     };
    const textChat = new TextChatAccPack(textChatOptions);
  }

  initAnnotations() {
    jQuery.isWindow({});
    //jQuery("#chat")css();
    // console.log("initAnnotations");
    // this.annotation = new AnnotationAccPack({});
  }


  componentDidRender() {
      console.log("componentDidLoad");
      console.log("OT supported", OtClient.checkSystemRequirements());


      console.log(this.publisherEl)
      const publisher = OT.initPublisher(this.publisherEl, {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, this.handleError);
     

      console.log('session ->');
      this.session = OtClient.initSession(options.credentials.apiKey, options.credentials.sessionId, {}); 
      console.log('init session ->');
      this.session.connect(options.credentials.token,(error)=>{
          if (error) {
            this.handleError(error);
          } else {
            this.session.publish(publisher, this.handleError);
            this.initTextChat();

          }
      }
    );

  }

  
  render() {

    return <div>We are here!!
  
      <div id="appVideoContainer" class="App-video-container"></div>
      <div id="videos">
          <div ref={el => this.subscriberEl = el as HTMLElement}></div>
          <div ref={el => this.publisherEl = el as HTMLElement}></div>
      </div> 
      <div id="chat"></div>
    </div>;
  }


  
}
