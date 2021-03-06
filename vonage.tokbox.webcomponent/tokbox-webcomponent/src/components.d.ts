/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MyComponent {
    'targetUserName': string;
    'userName': string;
  }
  interface TokboxLoader {
    'targetUserName': string;
    'userName': string;
  }
}

declare global {


  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLTokboxLoaderElement extends Components.TokboxLoader, HTMLStencilElement {}
  var HTMLTokboxLoaderElement: {
    prototype: HTMLTokboxLoaderElement;
    new (): HTMLTokboxLoaderElement;
  };
  interface HTMLElementTagNameMap {
    'my-component': HTMLMyComponentElement;
    'tokbox-loader': HTMLTokboxLoaderElement;
  }
}

declare namespace LocalJSX {
  interface MyComponent extends JSXBase.HTMLAttributes<HTMLMyComponentElement> {
    'targetUserName'?: string;
    'userName'?: string;
  }
  interface TokboxLoader extends JSXBase.HTMLAttributes<HTMLTokboxLoaderElement> {
    'targetUserName'?: string;
    'userName'?: string;
  }

  interface IntrinsicElements {
    'my-component': MyComponent;
    'tokbox-loader': TokboxLoader;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


