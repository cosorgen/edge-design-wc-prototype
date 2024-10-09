import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from '@microsoft/fast-element';
import { curveDecelerateMax, durationFast } from '@phoenixui/themes';

// Popovers need to be manually controlled so that we can use context menus with trackpads
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

  [popover] {
    border: none;
    overflow: visible;
    position-area: block-end span-inline-end;
    margin: 0;
    padding: 0;
    background: transparent;
    position-anchor: --menu-trigger;
    position-try-fallbacks: flip-inline, flip-block;

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
  _popoverElement: HTMLElement | null = null;
  _contextPopoverElement: HTMLElement | null = null;
  _triggerElement: HTMLElement | null = null;
  _open = false;
  _contextOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this.getSlottedElements();
    this.setEventListeners();
    if (this.initOpen) {
      this._popoverElement?.showPopover();
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
        this._popoverElement = this.shadowRoot?.querySelector(
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
        this._contextPopoverElement = this.shadowRoot?.querySelector(
          '#context',
        ) as HTMLDivElement;
      }
    }

    // Trigger element
    const triggerSlot = this.shadowRoot?.querySelector(
      'slot[name="trigger"]',
    ) as HTMLSlotElement;
    if (triggerSlot) {
      this._triggerElement = triggerSlot.assignedElements()[0] as HTMLElement;
    }
  }

  setEventListeners() {
    if (this._popoverElement && this._triggerElement) {
      // Listen for content of flyout to close it
      this.addEventListener('closemenu', (e) => {
        e.stopPropagation();
        this._popoverElement?.hidePopover();
        this._contextPopoverElement?.hidePopover();
      });

      // Trigger events
      this._triggerElement?.addEventListener('click', () => {
        this._popoverElement?.togglePopover();
      });

      this._triggerElement?.addEventListener('contextmenu', (e: MouseEvent) => {
        e.preventDefault(); // don't show context menu
        this._contextPopoverElement?.togglePopover();
      });

      // Popover events
      this._popoverElement?.addEventListener(
        'toggle',
        this.toggleFlyoutHandler,
      );

      this._popoverElement?.addEventListener(
        'transitionend',
        this.transitionEndFlyoutHandler,
      );

      // Context events
      this._contextPopoverElement?.addEventListener(
        'toggle',
        this.toggleContextHandler,
      );

      this._contextPopoverElement?.addEventListener(
        'transitionend',
        this.transitionEndContextHandler,
      );
    }
  }

  toggleFlyoutHandler = (e: Event) => {
    if (!(e instanceof ToggleEvent)) return;

    // Close context menu if open && flyout menu is opening
    // Need to test !this._open or else it loop
    if (this._contextOpen && !this._open) {
      this._contextPopoverElement?.hidePopover();
    }

    this._open = e.newState === 'open';
    this._triggerElement?.setAttribute(
      'pressed',
      this._open ? 'true' : 'false',
    );

    if (this._open) {
      // Listen for close events
      document.addEventListener('mouseup', this.documentClickHandler, {
        once: true,
      });
      document.addEventListener('keydown', this.documentKeydownHandler, {
        once: true,
      });
    }
  };

  transitionEndFlyoutHandler = (e: TransitionEvent) => {
    if (e.propertyName === 'opacity' && e.target === this._popoverElement) {
      const newState = this._open ? 'open' : 'closed';
      const oldState = this._open ? 'closed' : 'open';
      this.dispatchEvent(new ToggleEvent('toggle', { newState, oldState }));
    }
  };

  toggleContextHandler = (e: Event) => {
    if (!(e instanceof ToggleEvent)) return;

    // Close flyout menu if open and context menu is opening
    // Need to test !this._contextOpen or else it loop
    if (this._open && !this._contextOpen) {
      this._popoverElement?.hidePopover();
    }

    this._contextOpen = e.newState === 'open';
    this._triggerElement?.setAttribute(
      'pressed',
      this._contextOpen ? 'true' : 'false',
    );

    if (this._contextOpen) {
      // Listen for close events
      document.addEventListener('mouseup', this.documentClickHandler, {
        once: true,
      });
      document.addEventListener('keydown', this.documentKeydownHandler, {
        once: true,
      });
    }
  };

  transitionEndContextHandler = (e: TransitionEvent) => {
    if (
      e.propertyName === 'opacity' &&
      e.target === this._contextPopoverElement
    ) {
      const newState = this._contextOpen ? 'open' : 'closed';
      const oldState = this._contextOpen ? 'closed' : 'open';
      this.dispatchEvent(new ToggleEvent('toggle', { newState, oldState }));
    }
  };

  eventTargetIsTriggerOrPopover(e: Event) {
    return e
      .composedPath()
      .some(
        (el) =>
          el === this._triggerElement ||
          el === this._popoverElement ||
          el === this._contextPopoverElement,
      );
  }

  documentClickHandler = (e: MouseEvent) => {
    if (this.eventTargetIsTriggerOrPopover(e)) {
      // reset the event listener and don't close
      document.addEventListener('mouseup', this.documentClickHandler, {
        once: true,
      });
      return;
    }

    this._popoverElement?.hidePopover();
    this._contextPopoverElement?.hidePopover();
  };

  documentKeydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this._popoverElement?.hidePopover();
      this._contextPopoverElement?.hidePopover();
    }
  };
}
