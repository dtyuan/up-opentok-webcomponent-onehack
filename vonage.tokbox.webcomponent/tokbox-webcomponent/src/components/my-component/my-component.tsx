import { Component, Prop, h, Method } from '@stencil/core';
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

const sessionIdFor1To1 = "2_MX40NjM0NzA2Mn5-MTU2MTMwMzM4NzI0OX4xYkt2RDRJamVoU1g4ZWhnQWZ2MGZQenN-fg"
const tokenFor1To1 = "T1==cGFydG5lcl9pZD00NjM0NzA2MiZzaWc9MzAwYmIyZWVhY2RhOWUyMTZjYjdmN2Y3N2U3NjI1NzZkMTQ4ZWEyYTpzZXNzaW9uX2lkPTJfTVg0ME5qTTBOekEyTW41LU1UVTJNVE13TXpNNE56STBPWDR4WWt0MlJEUkphbVZvVTFnNFpXaG5RV1oyTUdaUWVuTi1mZyZjcmVhdGVfdGltZT0xNTYxMzAzNDM3Jm5vbmNlPTAuMDc0NTQ1ODA3OTIzNjk2MDMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU2Mzg5NTQzNiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  subscriberEl: HTMLElement;
  publisherEl: HTMLElement;
  screenShareEl: HTMLElement;
  oneToOnePublisher: HTMLElement;

  session : OtClient.Session;
  oneToOneSession : OtClient.Session;

  @Method()
  async initiateSession(targetUser){
    if(!this.session) {
      throw 'No Session Established'
    }

    this.session.signal(
      {
        data: JSON.stringify({ sessionIdFor1To1, tokenFor1To1}),
        type: `invite-${targetUser}`
      },
      function(error) {
        if (error) {
          console.log("signal error ("
                       + error.name
                       + "): " + error.message);
        } else {
          console.log("signal sent.");
        }
      }
    );
  }

  annotation: AnnotationAccPack;

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
    // this.annotation = new AnnotationAccPack({});
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
<<<<<<< HEAD
            this.session.publish(publisher, this.handleError);
            this.initTextChat();
          }
      }
    );
=======
            // this.session.publish(publisher, this.handleError);
          }
      });

      this.session.on("signal:invite-_jmcduffie" as "archiveStarted", (event: any) => {
        console.log("Signal sent from connection " + event.from.id);
        const { sessionIdFor1To1, tokenFor1To1 } = JSON.parse(event.data);
        this.oneToOneSession = OtClient.initSession(options.credentials.apiKey, sessionIdFor1To1, {}); 
        console.log('init session ->');
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
              this.initTextChat();
            }
        });

        // Process the event.data property, if there is any data.
      });
>>>>>>> ac299b1f90f83ba3662ff67a38c691c0574fcc65

  }
 
 
  shareScreen2 () {
    let publishOptions = { 
      session: this.session,
      extensionID: 'plocfffmbcclpdifaikiikgplfnepkpo',
      annotation: true,
      externalWindow: true,
      dev: true,
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
  }


<<<<<<< HEAD
  shareScreen () { 
      console.log("something???",this);
      this.shareScreen2();
      return;
=======
  shareScreen () {
      OT.checkScreenSharingCapability((response) => {
          console.log('1 =========== response.supported = ', response.supported);
          console.log('=========== response.extensionRegistered = ', response.extensionRegistered);
        if(!response.supported || response.extensionRegistered === false) {
          // This browser does not support screen sharing.
          console.log(' ===== not support screen sharing');
        } else if (response.extensionInstalled === false) {
          // Prompt to install the extension.
          console.log(' ===== extension needed');
        } else {
          // Screen sharing is available. Publish the screen.
          let publishOptions = {} as any;
          publishOptions.maxResolution = { width: 1920, height: 1080 };
          publishOptions.videoSource = 'screen';
          var screenPublisherElement = document.createElement('div');
          var publisher = OT.initPublisher(this.screenShareEl,
            publishOptions,
            (error) => {
              if (error) {
                // Look at error.message to see what went wrong.
                console.log('=========== error = ', error);
              } else {
                this.session.publish(publisher, function(error) {
                  if (error) {
                    // Look error.message to see what went wrong.
                    console.log('1=========== error = ', error);
                  }
                });
              }
            }
          );
        }
      });
>>>>>>> ac299b1f90f83ba3662ff67a38c691c0574fcc65
  }
      // OT.checkScreenSharingCapability((response) => {
      //     console.log('1 =========== response.supported = ', response.supported);
      //     console.log('=========== response.extensionRegistered = ', response.extensionRegistered);
      //   if(!response.supported || response.extensionRegistered === false) {
      //     // This browser does not support screen sharing.
      //     console.log(' ===== not support screen sharing');
      //   } else if (response.extensionInstalled === false) {
      //     // Prompt to install the extension.
      //     console.log(' ===== extension needed');
      //   } else {
      //     // Screen sharing is available. Publish the screen.
      //     let publishOptions = {} as any;
      //     publishOptions.maxResolution = { width: 1920, height: 1080 };
      //     publishOptions.videoSource = 'screen';
      //     var screenPublisherElement = document.createElement('div');
      //     var publisher = OT.initPublisher('screen-preview',
      //     //var publisher = OT.initPublisher(screenPublisherElement,
      //       publishOptions,
      //       (error) => {
      //         if (error) {
      //           // Look at error.message to see what went wrong.
      //           console.log('=========== error = ', error);
      //         } else {
      //           this.session.publish(publisher, function(error) {
      //             if (error) {
      //               // Look error.message to see what went wrong.
      //               console.log('1=========== error = ', error);
      //               return;
      //             }
      //             this.initAnnotations();
      //           });
      //         }
      //       }
      //     );
      //   }
      // });
  //}

  
  render() {
    return <div id="appVideoContainer" class="App-video-container">
      <button onClick={() => {this.initiateSession('_jmcduffie')}}>Invite</button>
      <div id="videos">
          <div ref={el => this.subscriberEl = el as HTMLElement}></div>
          <div ref={el => this.publisherEl = el as HTMLElement}></div>
<<<<<<< HEAD
           <div id="screen-preview"></div>
           <button onClick={()=>this.shareScreen()}>Screen Share</button>
           {/* <div id="sub-screen-sharing-container"></div> */}
          <div id="chat"></div>
      </div> 
      </div>
=======
          <div ref={el => this.screenShareEl = el as HTMLElement}></div>
          <button onClick={this.shareScreen}>Screen Share</button>
          <div id="sub-screen-sharing-container"></div>
          <div id="chat"></div>
        </div> 
      </div>;
>>>>>>> ac299b1f90f83ba3662ff67a38c691c0574fcc65
  }


  
}
