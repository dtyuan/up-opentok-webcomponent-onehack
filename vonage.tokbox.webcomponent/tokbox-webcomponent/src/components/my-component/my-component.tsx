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
  private videoContainer?: HTMLElement;

  componentDidLoad() {
      this.initVideo();
  }

  private initVideo():void {
    this.videoContainer.classList.add("App-video-container")
  }
 
  render() {
    return <div>We are here! <div ref={el => this.videoContainer = el as HTMLElement}></div> </div>;
  }
}
