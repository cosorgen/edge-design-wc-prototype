import { css, customElement, FASTElement, html } from '@microsoft/fast-element';

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
    @click="${(x) => x.handleDismiss()}"
    @mousedown="${(x) => x.handleDismiss()}"
  ></div>
  <slot name="trigger"></slot>
  <slot id="content"></slot>`;

const styles = css`
  :host {
    position: relative;
  }

  #click-catcher {
    position: fixed;
    inset: 0;
    z-index: 999;
  }
`;

@customElement({
  name: 'flyout-menu',
  template,
  styles,
})
export class FlyoutMenu extends FASTElement {
  flyoutContent: HTMLElement | null = null;
  triggerContent: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      if (!this.flyoutContent || !this.triggerContent)
        this.getSlottedElements();
      this.handleShow();
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
        this.handleDismiss();
      });
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
}
