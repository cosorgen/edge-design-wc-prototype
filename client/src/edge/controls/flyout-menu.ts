import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from '@microsoft/fast-element';
import { curveDecelerateMax, durationFast } from '@phoenixui/themes';

const template = html<FlyoutMenu>`
  <slot name="trigger"></slot>
  <div popover="manual" id="flyout">
    <slot></slot>
    <div popover="manual" id="context">
      <slot name="context"></slot>
    </div>
  </div>
`;

const styles = css`
  ::slotted([slot='trigger']) {
    anchor-name: --menu-trigger;
  }

  [popover] {
    border: none;
    overflow: visible;
    position-area: block-end span-inline-start;
    margin: 0;
    padding: 0;
    background: transparent;
    position-anchor: --menu-trigger;
    position-try-options: flip-block;

    transform: translateY(-24px);
    opacity: 0;
    /* 10ms delay to allow for transitionend fire */
    transition:
      transform ${durationFast} ${curveDecelerateMax},
      opacity ${durationFast} ${curveDecelerateMax},
      display ${durationFast} ${curveDecelerateMax} 50ms allow-discrete,
      overlay ${durationFast} ${curveDecelerateMax} 50ms allow-discrete;
  }

  [popover]:popover-open {
    transform: translateY(0px);
    opacity: 1;

    @starting-style {
      transform: translateY(-24px);
      opacity: 0;
    }
  }
`;

@customElement({
  name: 'flyout-menu',
  template,
  styles,
})
export class FlyoutMenu extends FASTElement {
  @attr({ mode: 'boolean', attribute: 'initially-open' }) initOpen = false;
  popoverElement: HTMLElement | null = null;
  contextPopoverElement: HTMLElement | null = null;
  triggerElement: HTMLElement | null = null;
  open = false;
  contextOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this.getSlottedElements();
    this.setEventListeners();
    if (this.initOpen && this.popoverElement) {
      this.toggleFlyout(true);
    }
  }

  initOpenChanged() {
    if (this.initOpen && this.popoverElement) {
      this.toggleFlyout(true);
    }
  }

  getSlottedElements() {
    this.popoverElement = this.shadowRoot?.querySelector(
      '[popover]',
    ) as HTMLDivElement;
    this.contextPopoverElement = this.shadowRoot?.querySelector(
      '[popover] > div',
    ) as HTMLDivElement;
    const triggerSlot = this.shadowRoot?.querySelector(
      'slot[name="trigger"]',
    ) as HTMLSlotElement;
    if (triggerSlot) {
      this.triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;
    }
  }

  setEventListeners() {
    if (this.popoverElement && this.triggerElement) {
      this.triggerElement?.addEventListener('mouseup', () =>
        this.handleTriggerClick(),
      );

      // Listen for content of flyout to close it
      this.addEventListener('close', () => {
        this.toggleFlyout(false);
        this.toggleContext(false);
      });

      // Allow clicks inside the popover to not close it
      this.popoverElement?.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });
    }
  }

  handleTriggerClick() {
    this.toggleFlyout(!this.open);
  }

  toggleFlyout(newState = true) {
    this.open = newState;

    if (this.open) {
      // Set up event listeners to close the popover
      const closeEvent = (e: MouseEvent | KeyboardEvent) => {
        if (e instanceof KeyboardEvent && e.key !== 'Escape') {
          return; // Only close on escape key
        }
        this.toggleFlyout(false);
      };
      const transitionEnd = () => {
        this.$emit('flyoutopen');
      };
      this.popoverElement?.addEventListener('transitionend', transitionEnd, {
        once: true,
      });
      document.addEventListener('mousedown', closeEvent, {
        once: true,
      });
      document.addEventListener('keydown', closeEvent, {
        once: true,
      });

      // Show the popover
      this.popoverElement?.showPopover();
    } else {
      // Set up event listeners to close
      const transitionEnd = () => {
        this.$emit('flyoutclose');
      };
      this.popoverElement?.addEventListener('transitionend', transitionEnd, {
        once: true,
      });

      // Hide the popover
      this.popoverElement?.hidePopover();
    }
  }

  toggleContext(newState = true) {
    return newState;
  }
}
