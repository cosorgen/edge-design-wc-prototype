import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from '@microsoft/fast-element';

const flyoutAnimationKeyframes: Keyframe[] = [
  {
    transform: 'translateY(-24px)',
    opacity: 0,
  },
  {
    transform: 'translateY(0)',
    opacity: 1,
  },
];
const flyoutAnimationOptions: KeyframeAnimationOptions = {
  duration: 150,
  easing: 'cubic-bezier(0, 0, 1, 1)',
  fill: 'both',
};

const template = html<FlyoutMenu>`<div
    id="click-catcher"
    @click="${(x) => x.toggleOpen()}"
  ></div>
  <slot name="trigger"></slot>
  <slot id="content"></slot>`;

const styles = css`
  :host {
    position: relative;
  }

  #click-catcher,
  #content {
    display: none;
  }

  :host([open]) #click-catcher {
    display: block;
    position: fixed;
    inset: 0;
  }
`;

@customElement({
  name: 'flyout-menu',
  template,
  styles,
})
export class FlyoutMenu extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  flyoutContent: HTMLElement | null = null;
  triggerContent: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      if (!this.flyoutContent || !this.triggerContent)
        this.getSlottedElements();
      if (this.open) this.handleShow();
    }, 10); // wait for render to finish?
  }

  getSlottedElements() {
    const contentSlot = this.shadowRoot?.querySelector(
      '#content',
    ) as HTMLSlotElement;
    const triggerSlot = this.shadowRoot?.querySelector(
      'slot[name="trigger"]',
    ) as HTMLSlotElement;
    if (contentSlot && triggerSlot) {
      this.triggerContent = triggerSlot.assignedElements({
        flatten: true,
      })[0] as HTMLElement;
      this.flyoutContent = contentSlot.assignedElements({
        flatten: true,
      })[0] as HTMLElement;

      this.triggerContent?.addEventListener('click', () => {
        this.toggleOpen();
      });
    }
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.handleShow();
    } else {
      this.handleDismiss();
    }
  }

  handleShow() {
    if (this.flyoutContent && this.triggerContent) {
      const triggerRect = this.triggerContent.getClientRects()[0] as DOMRect;
      this.flyoutContent.style.top = `${triggerRect.bottom}px`;
      this.flyoutContent.style.right = `${window.innerWidth - triggerRect.right}px`;
      this.flyoutContent.style.zIndex = '1000';
      document.body.appendChild(this.flyoutContent);
      this.flyoutContent.animate(
        flyoutAnimationKeyframes,
        flyoutAnimationOptions,
      );
    }
  }

  handleDismiss() {
    if (this.flyoutContent) {
      const animation = this.flyoutContent.animate(flyoutAnimationKeyframes, {
        ...flyoutAnimationOptions,
        direction: 'reverse',
      });
      animation.pause();
      animation.onfinish = () => {
        document.body.removeChild(this.flyoutContent as Node);
        this.$emit('flyoutdismiss');
      };
      animation.play();
    }
  }
}
