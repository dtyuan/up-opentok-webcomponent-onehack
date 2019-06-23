import { Component, Prop, h } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() test: string;

  componentDidLoad() {
      console.log("componentDidRender");
      this.initVideo();
    
  }

  private initVideo():void {
    const videoContainerClass = `App-video-container  'center'`;
    document.getElementById('appVideoContainer').setAttribute('class', videoContainerClass);
  }
 
  render() {
    return <div>We are here! <div id="appVideoContainer"></div> </div>;
  }
}
