import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
} from '@microsoft/fast-element';
import { curveDecelerateMax, durationFast } from '@edge-design/phoenix-theme';

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
  :host {
    /* Need for collapse */
    overflow: hidden;

    /* Don't clip focus outline */
    margin: -2px;
    padding: 2px;
  }

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

@customElement({ name: 'flyout-menu', template, styles })
export class FlyoutMenu extends FASTElement {
  @attr({ mode: 'boolean', attribute: 'initially-open' }) initOpen = false;
  _popoverElement: HTMLElement | null = null;
  _popoverSlottedElement: HTMLElement | null = null;
  _contextPopoverElement: HTMLElement | null = null;
  _contextPopoverSlottedElement: HTMLElement | null = null;
  _triggerElement: HTMLElement | null = null;
  _open = false;
  _contextOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this.getSlottedElements();
    this.addEventListeners();
    this.initOpenChanged();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.removeSlottedElements();
  }

  initOpenChanged() {
    if (
      this.initOpen &&
      !this._open &&
      !this._contextOpen &&
      this._popoverElement
    ) {
      this._popoverElement?.showPopover();
    }
  }

  getSlottedElements() {
    // Flyout menu
    const flyoutSlot = this.shadowRoot?.querySelectorAll(
      'slot',
    )[1] as HTMLSlotElement;
    if (flyoutSlot) {
      this._popoverSlottedElement =
        flyoutSlot.assignedElements()[0] as HTMLElement;
      // Slots can be nested
      while (this._popoverSlottedElement instanceof HTMLSlotElement) {
        this._popoverSlottedElement =
          this._popoverSlottedElement.assignedElements()[0] as HTMLElement;
      }

      if (this._popoverSlottedElement) {
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
      this._contextPopoverSlottedElement =
        contextSlot.assignedElements()[0] as HTMLElement;

      // Slots can be nested
      while (this._contextPopoverSlottedElement instanceof HTMLSlotElement) {
        this._contextPopoverSlottedElement =
          this._contextPopoverSlottedElement.assignedElements()[0] as HTMLElement;
      }

      if (this._contextPopoverSlottedElement) {
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

  removeSlottedElements() {
    this._popoverElement = null;
    this._popoverSlottedElement = null;
    this._contextPopoverElement = null;
    this._contextPopoverSlottedElement = null;
    this._triggerElement = null;
  }

  addEventListeners() {
    if (this._popoverElement && this._triggerElement) {
      this.addEventListener('closemenu', this.closeMenuListener);

      this._triggerElement?.addEventListener(
        'click',
        this.triggerClickListener,
      );

      this._popoverElement?.addEventListener(
        'toggle',
        this.toggleFlyoutHandler,
      );
      this._popoverElement?.addEventListener(
        'transitionend',
        this.transitionEndFlyoutHandler,
      );
    }

    if (this._contextPopoverElement && this._triggerElement) {
      if (!this._popoverElement)
        this.addEventListener('closemenu', this.closeMenuListener);

      this._triggerElement?.addEventListener(
        'contextmenu',
        this.triggerContextMenuListener,
      );

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

  removeEventListeners() {
    this.removeEventListener('closemenu', this.closeMenuListener);

    this._triggerElement?.removeEventListener(
      'click',
      this.triggerClickListener,
    );
    this._triggerElement?.removeEventListener(
      'contextmenu',
      this.triggerContextMenuListener,
    );

    this._popoverElement?.removeEventListener(
      'toggle',
      this.toggleFlyoutHandler,
    );
    this._popoverElement?.removeEventListener(
      'transitionend',
      this.transitionEndFlyoutHandler,
    );

    this._contextPopoverElement?.removeEventListener(
      'toggle',
      this.toggleContextHandler,
    );
    this._contextPopoverElement?.removeEventListener(
      'transitionend',
      this.transitionEndContextHandler,
    );

    document.removeEventListener('mouseup', this.documentClickHandler);
    document.removeEventListener('keydown', this.documentKeydownHandler);
  }

  closeMenuListener = (e: Event) => {
    console.log('closemenu');
    e.stopPropagation();
    this._popoverElement?.hidePopover();
    this._contextPopoverElement?.hidePopover();
  };

  triggerClickListener = () => {
    this._popoverElement?.togglePopover();
  };

  triggerContextMenuListener = (e: MouseEvent) => {
    e.preventDefault();
    this._contextPopoverElement?.togglePopover();
  };

  toggleFlyoutHandler = (e: Event) => {
    if (!(e instanceof ToggleEvent)) return;

    this._open = e.newState === 'open';

    this._triggerElement?.setAttribute(
      'pressed',
      (this._open || this._contextOpen).toString(),
    );
    this._popoverSlottedElement?.setAttribute('open', this._open.toString());

    if (this._open || this._contextOpen) {
      // Listen for close events
      document.addEventListener('mouseup', this.documentClickHandler, {
        once: true,
      });
      document.addEventListener('keydown', this.documentKeydownHandler, {
        once: true,
      });
    } else {
      document.removeEventListener('mouseup', this.documentClickHandler);
      document.removeEventListener('keydown', this.documentKeydownHandler);
    }

    // Close context menu if open && flyout menu is opening
    // Need to test this._open or else it loop
    if (this._contextOpen && this._open) {
      this._contextPopoverElement?.hidePopover();
    }
  };

  transitionEndFlyoutHandler = (e: TransitionEvent) => {
    if (e.propertyName === 'opacity' && e.target === this._popoverElement) {
      const isOpen = this._open || this._contextOpen;
      const newState = isOpen ? 'open' : 'closed';
      const oldState = !isOpen ? 'closed' : 'open';
      this.dispatchEvent(new ToggleEvent('toggle', { newState, oldState }));
    }
  };

  toggleContextHandler = (e: Event) => {
    if (!(e instanceof ToggleEvent)) return;

    this._contextOpen = e.newState === 'open';

    this._triggerElement?.setAttribute(
      'pressed',
      (this._open || this._contextOpen).toString(),
    );
    this._contextPopoverSlottedElement?.setAttribute(
      'open',
      this._open.toString(),
    );

    if (this._contextOpen || this._open) {
      // Listen for close events
      document.addEventListener('mouseup', this.documentClickHandler, {
        once: true,
      });
      document.addEventListener('keydown', this.documentKeydownHandler, {
        once: true,
      });
    } else {
      document.removeEventListener('mouseup', this.documentClickHandler);
      document.removeEventListener('keydown', this.documentKeydownHandler);
    }

    // Close flyout menu if open and context menu is open
    // Need to test !this._contextOpen or else it loop
    if (this._open && this._contextOpen) {
      this._popoverElement?.hidePopover();
    }
  };

  transitionEndContextHandler = (e: TransitionEvent) => {
    if (
      e.propertyName === 'opacity' &&
      e.target === this._contextPopoverElement
    ) {
      const isOpen = this._open || this._contextOpen;
      const newState = isOpen ? 'open' : 'closed';
      const oldState = !isOpen ? 'closed' : 'open';
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
