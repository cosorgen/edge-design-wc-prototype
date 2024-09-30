import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from '@microsoft/fast-element';
import { curveDecelerateMax, durationFast } from '@phoenixui/themes';

const template = html<FlyoutMenu>` <slot name="trigger"></slot>
  <div popover>
    <slot></slot>
  </div>`;

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
  triggerElement: HTMLElement | null = null;
  open: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    this.getSlottedElements();
    this.setEventListeners();
    if (this.initOpen && this.popoverElement) {
      this.popoverElement?.showPopover();
    }
  }

  getSlottedElements() {
    this.popoverElement = this.shadowRoot?.querySelector(
      '[popover]',
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
      this.triggerElement?.addEventListener('click', () =>
        this.handleTriggerClick(),
      );

      // @ts-expect-error - Baseline 2024
      this.popoverElement.addEventListener('toggle', (e: ToggleEvent) =>
        this.handleToggleChange(e),
      );

      this.addEventListener('close', () => {
        this.popoverElement?.hidePopover();
      });
    }
  }

  handleTriggerClick() {
    this.open
      ? this.popoverElement?.hidePopover()
      : this.popoverElement?.showPopover();
  }

  handleToggleChange(e: ToggleEvent) {
    if (e.newState === 'open') {
      const transitionEnd = () => {
        this.open = true;
        this.$emit('flyoutopen');
        this.popoverElement?.removeEventListener(
          'transitionend',
          transitionEnd,
        );
      };
      this.popoverElement?.addEventListener('transitionend', transitionEnd);
    } else {
      const transitionEnd = () => {
        this.open = false;
        this.$emit('flyoutclose');
        this.popoverElement?.removeEventListener(
          'transitionend',
          transitionEnd,
        );
      };
      this.popoverElement?.addEventListener('transitionend', transitionEnd);
    }
  }
}
