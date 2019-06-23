import { Component, Prop, h } from '@stencil/core';
//import WebSocket from 'sc-ws';
import jQuery from 'jquery';
// export for others scripts to use


//import a from 'op'
import OtClient from '@opentok/client'
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
 
  initTextChat() {
    const textChat = new TextChatAccPack(options);
  }

  initAnnotations() {
    jQuery.isWindow({});
    //jQuery("#chat")css();
    // console.log("initAnnotations");
    // this.annotation = new AnnotationAccPack({});
  }


  componentDidRender() {
      console.log("componentDidLoad");
      // var webSocket =  WebSocket;
      // console.log("componentDidLoad", webSocket);
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
          }
      }
    );
    this.initTextChat();

  }

  
  render() {

    return <div>We are here!!
      <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/livestamp/1.1.2/livestamp.min.js"></script>
      
      <div id="appVideoContainer" class="App-video-container"></div>
      <div id="videos">
          <div ref={el => this.subscriberEl = el as HTMLElement}></div>
          <div ref={el => this.publisherEl = el as HTMLElement}></div>
      </div> 
      <div id="chat"></div>
    </div>;
  }


  
}
