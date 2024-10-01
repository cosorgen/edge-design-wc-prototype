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
  </div>
  <div popover="manual" id="context">
    <slot name="context"></slot>
  </div>
`;

const styles = css`
  ::slotted([slot='trigger']) {
    anchor-name: --menu-trigger;
  }

  @position-try --flip-inline {
    position-area: block-end span-inline-start;
  }

  @position-try --flip-block {
    position-area: block-start span-inline-end;
  }

  [popover] {
    border: none;
    overflow: visible;
    position-area: block-end span-inline-end;
    margin: 0;
    padding: 0;
    background: transparent;
    position-anchor: --menu-trigger;
    position-try-fallbacks: --flip-inline, --flip-block;

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
    if (this.initOpen) {
      console.log('init open', this.initOpen);
      this.handleTriggerClick();
    }
  }

  getSlottedElements() {
    this.popoverElement = this.shadowRoot?.querySelector(
      '#flyout',
    ) as HTMLDivElement;
    this.contextPopoverElement = this.shadowRoot?.querySelector(
      '#context',
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
      // Listen for content of flyout to close it
      this.addEventListener('closemenu', (e) => {
        e.stopPropagation();
        this.toggleFlyout(false);
        this.toggleContext(false);
      });

      // Trigger events
      this.triggerElement?.addEventListener('click', () => {
        this.handleTriggerClick();
      });

      this.triggerElement?.addEventListener('contextmenu', (e: MouseEvent) =>
        this.handleContextClick(e),
      );

      this.triggerElement?.addEventListener('mousedown', (e) => {
        if (this.open || this.contextOpen) e.stopPropagation(); // don't fire close if open
      });

      // Popover events
      this.popoverElement?.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // prevent close on click
      });
      this.contextPopoverElement?.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // prevent close on click
      });

      this.popoverElement?.addEventListener('transitionend', () => {
        this.open ? this.$emit('flyoutopen') : this.$emit('flyoutclose');
      });

      this.contextPopoverElement?.addEventListener('transitionend', () => {
        this.open ? this.$emit('contextopen') : this.$emit('contextclose');
      });
    }
  }

  handleTriggerClick() {
    this.toggleFlyout(!this.open);
  }

  handleContextClick(e: MouseEvent) {
    e.preventDefault(); // don't show context menu
    this.toggleContext(!this.contextOpen);
  }

  toggleFlyout(newState = true) {
    if (this.open === newState) return; // do not toggle if already in desired state
    this.open = newState;

    if (this.open) {
      // Set up event listeners to close the popover
      // const closeEvent = (e: MouseEvent | KeyboardEvent) => {
      //   if (e instanceof KeyboardEvent && e.key !== 'Escape') {
      //     return; // Only close on escape key
      //   }
      //   this.toggleFlyout(false);
      // };
      // document.addEventListener('mousedown', closeEvent, {
      //   once: true,
      // });
      // document.addEventListener('keydown', closeEvent, {
      //   once: true,
      // });

      // Show the popover
      this.popoverElement?.showPopover();
    } else {
      // Hide the popover
      this.popoverElement?.hidePopover();
    }
  }

  toggleContext(newState = true) {
    if (this.contextOpen === newState) return; // do not toggle if already in desired state
    this.contextOpen = newState;

    if (this.contextOpen) {
      // Set up event listeners to close the popover
      // const closeEvent = (e: MouseEvent | KeyboardEvent) => {
      //   if (e instanceof KeyboardEvent && e.key !== 'Escape') {
      //     return; // Only close on escape key
      //   }
      //   this.toggleContext(false);
      // };
      // document.addEventListener('mousedown', closeEvent, {
      //   once: true,
      // });
      // document.addEventListener('keydown', closeEvent, {
      //   once: true,
      // });

      // Show the popover
      this.contextPopoverElement?.showPopover();
    } else {
      // Hide the popover
      this.contextPopoverElement?.hidePopover();
    }
  }
}
