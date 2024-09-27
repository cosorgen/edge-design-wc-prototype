import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from '@microsoft/fast-element';

const template = html<FlyoutMenu>` <slot name="trigger"></slot>
  <div popover id="menu-popover">
    <slot></slot>
  </div>`;

const styles = css`
  ::slotted([slot='trigger']) {
    anchor-name: --menu-trigger;
  }

  [popover]:popover-open {
    border: none;
    overflow: visible;
    position-area: block-end span-inline-start;
    margin: 0;
    padding: 0;
    background: transparent;
    position-anchor: --menu-trigger;
    position-try-options: flip-block;
  }
`;

@customElement({
  name: 'flyout-menu',
  template,
  styles,
})
export class FlyoutMenu extends FASTElement {
  @attr({ mode: 'boolean' }) open = false;
  popoverElement: HTMLElement | null = null;
  triggerElement: HTMLElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.getSlottedElements();
    this.setEventListeners();
  }

  getSlottedElements() {
    this.popoverElement = this.shadowRoot?.querySelector(
      '#menu-popover',
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
        this.toggleMenu(this.open ? 'closed' : 'open'),
      );

      // @ts-expect-error - Baseline 2024
      this.popoverElement.addEventListener('toggle', (e: ToggleEvent) =>
        this.toggleMenu(e.newState),
      );
    }
  }

  toggleMenu(newState: string = 'open') {
    if (this.popoverElement) {
      if (newState === 'open') {
        this.popoverElement.showPopover();
        this.open = true;
      } else {
        this.open = false;
        this.popoverElement.hidePopover();
      }
    }
  }
}
