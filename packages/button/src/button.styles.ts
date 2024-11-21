import {
  display,
  forcedColorsStylesheetBehavior,
} from '@fluentui/web-components/utilities.js';
import {
  circularState,
  iconOnlyState,
  largeState,
  outlineState,
  primaryState,
  smallState,
  squareState,
  subtleState,
} from '@mai-ui/component-framework/states.js';
import {
  backgroundControlBrandHover,
  backgroundControlBrandPressed,
  backgroundControlBrandRest,
  backgroundControlNeutralDisabled,
  backgroundControlNeutralHover,
  backgroundControlNeutralPressed,
  backgroundControlNeutralRest,
  backgroundControlOutlineDisabled,
  backgroundControlOutlineHover,
  backgroundControlOutlinePressed,
  backgroundControlOutlineRest,
  backgroundControlSubtleHover,
  backgroundControlSubtlePressed,
  backgroundControlSubtleRest,
  controlFocusInnerStrokeColor,
  controlFocusInnerStrokeWidth,
  controlFocusOuterStrokeColor,
  controlFocusOuterStrokeWidth,
  cornerControlCircular,
  cornerControlHover,
  cornerControlNone,
  cornerControlPressed,
  cornerControlRest,
  cornerLargeControlRest,
  cornerSmallControlRest,
  curveControlStateTransition,
  durationControlStateTransition,
  foregroundControlNeutralPrimaryDisabled,
  foregroundControlNeutralPrimaryHover,
  foregroundControlNeutralPrimaryPressed,
  foregroundControlNeutralPrimaryRest,
  foregroundControlOnBrandRest,
  foregroundControlOnOutlineDisabled,
  foregroundControlOnOutlineHover,
  foregroundControlOnOutlinePressed,
  foregroundControlOnOutlineRest,
  gapControlDefault,
  gapSmallControlDefault,
  nullColor0,
  nullColor3,
  paddingControlHorizontalDefault,
  paddingLargeControlVertical,
  paddingSmallControlVertical,
  strokeControlNoneHover,
  strokeControlNonePressed,
  strokeControlNoneRest,
  strokeControlOnNeutralDisabled,
  strokeControlOutlineDisabled,
  strokeControlOutlineHover,
  strokeControlOutlinePressed,
  strokeControlOutlineRest,
  strokeWidthControlOutlineHover,
  strokeWidthControlOutlinePressed,
  strokeWidthControlOutlineRest,
  textControlButtonWeight,
  textRampBody2FontSize,
  textRampBody2LineHeight,
  textRampBody3FontSize,
  textRampBody3FontWeight,
  textRampBody3LineHeight,
  textRampCaption1FontSize,
  textRampCaption1FontWeight,
  textRampCaption1LineHeight,
  textStyleDefaultRegularFontFamily,
} from '@mai-ui/design-tokens/button.js';
import { css } from '@microsoft/fast-element';

/**
 * @internal
 */
export const baseButtonStyles = css`
  ${display('inline-flex')}

  :host {
    --icon-spacing: ${gapControlDefault};
    position: relative;
    contain: layout style;
    vertical-align: middle;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    text-align: center;
    text-decoration-line: none;
    margin: 0;
    min-height: 32px;
    outline-style: none;
    background-color: ${backgroundControlNeutralRest};
    color: ${foregroundControlNeutralPrimaryRest};
    border: ${controlFocusInnerStrokeWidth} solid ${strokeControlNoneRest};
    padding: 0 ${paddingControlHorizontalDefault};
    min-width: 96px;
    border-radius: ${cornerControlRest};
    font-size: ${textRampBody2FontSize};
    font-family: ${textStyleDefaultRegularFontFamily};
    font-weight: ${textControlButtonWeight};
    line-height: ${textRampBody2LineHeight};
    transition-duration: ${durationControlStateTransition};
    transition-property: background, border, color;
    transition-timing-function: ${curveControlStateTransition};
    cursor: pointer;
    user-select: none;
  }

  .content {
    display: inherit;
  }

  :host(:hover) {
    background-color: ${backgroundControlNeutralHover};
    border-color: ${strokeControlNoneHover};
    border-radius: ${cornerControlHover};
    color: ${foregroundControlNeutralPrimaryHover};
  }

  :host(:hover:active) {
    background-color: ${backgroundControlNeutralPressed};
    color: ${foregroundControlNeutralPrimaryPressed};
    border-color: ${strokeControlNonePressed};
    border-radius: ${cornerControlPressed};
    outline-style: none;
  }

  :host(:focus-visible) {
    border-color: ${controlFocusInnerStrokeColor};
    outline: ${controlFocusOuterStrokeWidth} solid ${nullColor3};
    box-shadow: 0 0 0 2px ${controlFocusOuterStrokeColor};
  }

  @media screen and (prefers-reduced-motion: reduce) {
    :host {
      transition-duration: 0.01ms;
    }
  }

  ::slotted(:is(svg, [slot='start'], [slot='end'])) {
    font-size: 20px;
    height: 20px;
    width: 20px;
  }

  :is([slot='start'], ::slotted([slot='start'])) {
    margin-inline-end: var(--icon-spacing);
  }

  :is([slot='end'], ::slotted([slot='end'])) {
    margin-inline-start: var(--icon-spacing);
    flex-shrink: 0;
  }

  :host(${iconOnlyState}) {
    min-width: 32px;
    max-width: 32px;
  }

  :host(${smallState}) {
    --icon-spacing: ${gapSmallControlDefault};
    min-height: 24px;
    min-width: 64px;
    padding: 0 ${paddingSmallControlVertical};
    border-radius: ${cornerSmallControlRest};
    font-size: ${textRampCaption1FontSize};
    line-height: ${textRampCaption1LineHeight};
    font-weight: ${textRampCaption1FontWeight};
  }

  :host(${smallState}${iconOnlyState}) {
    min-width: 24px;
    max-width: 24px;
  }

  :host(${largeState}) {
    min-height: 40px;
    padding: 0 ${paddingLargeControlVertical};
    font-size: ${textRampBody3FontSize};
    line-height: ${textRampBody3LineHeight};
    font-weight: ${textRampBody3FontWeight};
    border-radius: ${cornerLargeControlRest};
  }

  :host(${largeState}${iconOnlyState}) {
    min-width: 40px;
    max-width: 40px;
  }

  :host(${largeState}) ::slotted(:is(svg, [slot='start'], [slot='end'])) {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  :host(:is(${circularState}, ${circularState}:focus-visible)) {
    border-radius: ${cornerControlCircular};
  }

  :host(:is(${squareState}, ${squareState}:focus-visible)) {
    border-radius: ${cornerControlNone};
  }

  :host(${primaryState}) {
    background-color: ${backgroundControlBrandRest};
    color: ${foregroundControlOnBrandRest};
    border-color: transparent;
  }

  :host(${primaryState}:hover) {
    background-color: ${backgroundControlBrandHover};
  }

  :host(${primaryState}:is(:hover, :hover:active)) {
    border-color: transparent;
    color: ${foregroundControlOnBrandRest};
  }

  :host(${primaryState}:hover:active) {
    background-color: ${backgroundControlBrandPressed};
  }

  :host(${primaryState}:focus-visible) {
    border-color: ${controlFocusInnerStrokeColor};
    box-shadow: 0 0 0 2px ${controlFocusOuterStrokeColor};
  }

  :host(${outlineState}) {
    background-color: ${backgroundControlOutlineRest};
    border-color: ${strokeControlOutlineRest};
    border-width: ${strokeWidthControlOutlineRest};
    color: ${foregroundControlOnOutlineRest};
  }
  :host(${outlineState}:hover) {
    background-color: ${backgroundControlOutlineHover};
    border-color: ${strokeControlOutlineHover};
    border-width: ${strokeWidthControlOutlineHover};
    color: ${foregroundControlOnOutlineHover};
  }
  :host(${outlineState}:is(:hover, :hover:active)) {
    background-color: ${backgroundControlOutlinePressed};
    border-color: ${strokeControlOutlinePressed};
    border-width: ${strokeWidthControlOutlinePressed};
    color: ${foregroundControlOnOutlinePressed};
  }

  :host(${subtleState}) {
    background-color: ${backgroundControlSubtleRest};
    border-color: transparent;
  }

  :host(${subtleState}:hover) {
    background-color: ${backgroundControlSubtleHover};
    border-color: transparent;
  }

  :host(${subtleState}:hover:active) {
    background-color: ${backgroundControlSubtlePressed};
    border-color: transparent;
  }
`;

/**
 * The styles for the Button component.
 *
 * @public
 */
export const styles = css`
  ${baseButtonStyles}

  :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable])),
    :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable]):hover),
    :host(:is(:disabled, [disabled-focusable], [appearance]:disabled, [appearance][disabled-focusable]):hover:active) {
    background-color: ${backgroundControlNeutralDisabled};
    border-color: ${strokeControlOnNeutralDisabled};
    color: ${foregroundControlNeutralPrimaryDisabled};
    cursor: not-allowed;
  }

  :host(${primaryState}:is(:disabled, [disabled-focusable])),
  :host(
      ${primaryState}:is(:disabled, [disabled-focusable]):is(
          :hover,
          :hover:active
        )
    ) {
    border-color: transparent;
  }

  :host(${subtleState}:is(:disabled, [disabled-focusable])),
  :host(
      ${subtleState}:is(:disabled, [disabled-focusable]):is(
          :hover,
          :hover:active
        )
    ) {
    border-color: transparent;
    background-color: ${nullColor0};
  }

  :host(${outlineState}:is(:disabled, [disabled-focusable])),
  :host(
      ${outlineState}:is(:disabled, [disabled-focusable]):is(
          :hover,
          :hover:active
        )
    ) {
    background-color: ${backgroundControlOutlineDisabled};
    border-color: ${strokeControlOutlineDisabled};
    border-width: ${strokeWidthControlOutlineRest};
    color: ${foregroundControlOnOutlineDisabled};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      background-color: ButtonFace;
      color: ButtonText;
    }

    :host(:is(:hover, :focus-visible)) {
      border-color: Highlight !important;
    }

    :host(${primaryState}:not(:is(:hover, :focus-visible))) {
      background-color: Highlight;
      color: HighlightText;
      forced-color-adjust: none;
    }
    :host(
        :is(
            :disabled,
            [disabled-focusable],
            [appearance]:disabled,
            [appearance][disabled-focusable]
          )
      ) {
      background-color: ButtonFace;
      color: GrayText;
      border-color: ButtonText;
    }
  `),
);
