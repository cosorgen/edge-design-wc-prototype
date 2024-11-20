import { BaseButton, type StartEnd } from '@fluentui/web-components';
import { toggleState } from '@mai-ui/component-framework/toggle-state.js';
import { attr } from '@microsoft/fast-element';
import type { ButtonAppearance, ButtonSize } from './button.options.js';

/**
 * A Button Custom HTML Element.
 * Based on BaseButton and includes style and layout specific attributes
 *
 * @public
 */
export class Button extends BaseButton implements StartEnd {
  /**
   * The start slot.
   *
   * @public
   */
  public start!: HTMLSlotElement;

  /**
   * The end slot.
   *
   * @public
   */
  public end!: HTMLSlotElement;

  /**
   * Indicates the styled appearance of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `appearance`
   */
  @attr
  public appearance?: ButtonAppearance;

  /**
   * Handles changes to appearance attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public appearanceChanged(
    prev: ButtonAppearance | undefined,
    next: ButtonAppearance | undefined,
  ) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * The size of the button.
   *
   * @public
   * @remarks
   * HTML Attribute: `size`
   */
  @attr
  public size?: ButtonSize;

  /**
   * Handles changes to size attribute custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public sizeChanged(
    prev: ButtonSize | undefined,
    next: ButtonSize | undefined,
  ) {
    if (prev) {
      toggleState(this.elementInternals, `${prev}`, false);
    }
    if (next) {
      toggleState(this.elementInternals, `${next}`, true);
    }
  }

  /**
   * Indicates that the button should only display as an icon with no text content.
   *
   * @public
   * @remarks
   * HTML Attribute: `icon-only`
   */
  @attr({ attribute: 'icon-only', mode: 'boolean' })
  public iconOnly: boolean = false;

  /**
   * Handles changes to icon only custom states
   * @param prev - the previous state
   * @param next - the next state
   */
  public iconOnlyChanged(prev: boolean, next: boolean) {
    toggleState(this.elementInternals, 'icon', next);
  }
}
