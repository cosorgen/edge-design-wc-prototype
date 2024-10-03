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

const styles = css<FlyoutMenu>`
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
      this.popoverElement?.showPopover();
    }
  }

  getSlottedElements() {
    // Flyout menu
    const flyoutSlot = this.shadowRoot?.querySelectorAll(
      'slot',
    )[1] as HTMLSlotElement;
    if (flyoutSlot) {
      const flyoutElement = flyoutSlot.assignedElements()[0] as HTMLElement;
      if (flyoutElement) {
        this.popoverElement = this.shadowRoot?.querySelector(
          '#flyout',
        ) as HTMLDivElement;
      }
    }

    // Context menu
    const contextSlot = this.shadowRoot?.querySelector(
      '[name="context"]',
    ) as HTMLSlotElement;
    if (contextSlot) {
      const contextElement = contextSlot.assignedElements()[0] as HTMLElement;
      if (contextElement) {
        this.contextPopoverElement = this.shadowRoot?.querySelector(
          '#context',
        ) as HTMLDivElement;
      }
    }

    // Trigger element
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
        this.popoverElement?.hidePopover();
        this.contextPopoverElement?.hidePopover();
      });

      // Trigger events
      this.triggerElement?.addEventListener('click', () => {
        this.popoverElement?.togglePopover();
      });

      this.triggerElement?.addEventListener('contextmenu', (e: MouseEvent) => {
        e.preventDefault(); // don't show context menu
        this.contextPopoverElement?.togglePopover();
      });

      // Popover events
      this.popoverElement?.addEventListener(
        'toggle',
        // @ts-expect-error - custom event
        (e: ToggleEvent) => {
          e.newState === 'open'
            ? this.$emit('flyoutopen')
            : this.$emit('flyoutclose');
          this.triggerElement?.setAttribute(
            'pressed',
            e.newState === 'open' ? 'true' : 'false',
          );
        },
      );

      // Context events
      this.contextPopoverElement?.addEventListener(
        'toggle',
        // @ts-expect-error - custom event
        (e: ToggleEvent) => {
          const open = e.newState === 'open';
          this.contextOpen = open;
          this.triggerElement?.setAttribute(
            'pressed',
            e.newState === 'open' ? 'true' : 'false',
          );
          document.addEventListener('click', this.documentClickHandler, {
            once: true,
          });
        },
      );
    }
  }

  documentClickHandler(e: MouseEvent) {
    if (
      e
        .composedPath()
        .some(
          (el) =>
            el === this.triggerElement ||
            el === this.popoverElement ||
            el === this.contextPopoverElement,
        )
    ) {
      this.popoverElement?.hidePopover();
      this.contextPopoverElement?.hidePopover();
    }
  }
}
