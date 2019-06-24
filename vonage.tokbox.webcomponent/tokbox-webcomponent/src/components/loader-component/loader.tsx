import { Component, Prop, h } from '@stencil/core';


@Component({
    tag: 'tokbox-loader',
    // styleUrl: 'loader.css',
    shadow: true
})
export class TockboxLoader {
  @Prop()
  userName: string = '_jmcduffie';

  @Prop()
  targetUserName: string = '_dtyuan';

  render() {

    return <div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/livestamp/1.1.2/livestamp.min.js"></script>
      <my-component userName={this.userName} targetUserName={this.targetUserName}></my-component>
      </div>
      ;
  }
}
  
