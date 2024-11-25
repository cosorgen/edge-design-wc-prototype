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
  smtcBackgroundControlBrandHover,
  smtcBackgroundControlBrandPressed,
  smtcBackgroundControlBrandRest,
  smtcBackgroundControlNeutralDisabled,
  smtcBackgroundControlNeutralHover,
  smtcBackgroundControlNeutralPressed,
  smtcBackgroundControlNeutralRest,
  smtcBackgroundControlOutlineDisabled,
  smtcBackgroundControlOutlineHover,
  smtcBackgroundControlOutlinePressed,
  smtcBackgroundControlOutlineRest,
  smtcBackgroundControlSubtleHover,
  smtcBackgroundControlSubtlePressed,
  smtcBackgroundControlSubtleRest,
  smtcControlFocusInnerStrokeColor,
  smtcControlFocusInnerStrokeWidth,
  smtcControlFocusOuterStrokeColor,
  smtcControlFocusOuterStrokeWidth,
  smtcCornerControlCircular,
  smtcCornerControlHover,
  smtcCornerControlNone,
  smtcCornerControlPressed,
  smtcCornerControlRest,
  smtcCornerLargeControlRest,
  smtcCornerSmallControlRest,
  smtcCurveControlStateTransition,
  smtcDurationControlStateTransition,
  smtcForegroundControlNeutralPrimaryDisabled,
  smtcForegroundControlNeutralPrimaryHover,
  smtcForegroundControlNeutralPrimaryPressed,
  smtcForegroundControlNeutralPrimaryRest,
  smtcForegroundControlOnBrandRest,
  smtcForegroundControlOnOutlineDisabled,
  smtcForegroundControlOnOutlineHover,
  smtcForegroundControlOnOutlinePressed,
  smtcForegroundControlOnOutlineRest,
  smtcGapControlDefault,
  smtcGapSmallControlDefault,
  smtcNullColor,
  smtcPaddingControlHorizontalDefault,
  smtcPaddingLargeControlVertical,
  smtcPaddingSmallControlVertical,
  smtcStrokeControlNoneHover,
  smtcStrokeControlNonePressed,
  smtcStrokeControlNoneRest,
  smtcStrokeControlOnNeutralDisabled,
  smtcStrokeControlOutlineDisabled,
  smtcStrokeControlOutlineHover,
  smtcStrokeControlOutlinePressed,
  smtcStrokeControlOutlineRest,
  smtcStrokeWidthControlOutlineHover,
  smtcStrokeWidthControlOutlinePressed,
  smtcStrokeWidthControlOutlineRest,
  smtcTextControlButtonWeight,
  smtcTextRampBody2FontSize,
  smtcTextRampBody2LineHeight,
  smtcTextRampBody3FontSize,
  smtcTextRampBody3FontWeight,
  smtcTextRampBody3LineHeight,
  smtcTextRampCaption1FontSize,
  smtcTextRampCaption1FontWeight,
  smtcTextRampCaption1LineHeight,
  smtcTextStyleDefaultRegularFontFamily,
} from './button.tokens.js';
import { css } from '@microsoft/fast-element';

/**
 * @internal
 */
export const baseButtonStyles = css`
  ${display('inline-flex')}

  :host {
    --icon-spacing: ${smtcGapControlDefault};
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
    background-color: ${smtcBackgroundControlNeutralRest};
    color: ${smtcForegroundControlNeutralPrimaryRest};
    border: ${smtcControlFocusInnerStrokeWidth} solid ${smtcStrokeControlNoneRest};
    padding: 0 ${smtcPaddingControlHorizontalDefault};
    min-width: 96px;
    border-radius: ${smtcCornerControlRest};
    font-size: ${smtcTextRampBody2FontSize};
    font-family: ${smtcTextStyleDefaultRegularFontFamily};
    font-weight: ${smtcTextControlButtonWeight};
    line-height: ${smtcTextRampBody2LineHeight};
    transition-duration: ${smtcDurationControlStateTransition};
    transition-property: background, border, color;
    transition-timing-function: ${smtcCurveControlStateTransition};
    cursor: pointer;
    user-select: none;
  }

  .content {
    display: inherit;
  }

  :host(:hover) {
    background-color: ${smtcBackgroundControlNeutralHover};
    border-color: ${smtcStrokeControlNoneHover};
    border-radius: ${smtcCornerControlHover};
    color: ${smtcForegroundControlNeutralPrimaryHover};
  }

  :host(:hover:active) {
    background-color: ${smtcBackgroundControlNeutralPressed};
    color: ${smtcForegroundControlNeutralPrimaryPressed};
    border-color: ${smtcStrokeControlNonePressed};
    border-radius: ${smtcCornerControlPressed};
    outline-style: none;
  }

  :host(:focus-visible) {
    border-color: ${smtcControlFocusInnerStrokeColor};
    outline: ${smtcControlFocusOuterStrokeWidth} solid ${smtcNullColor};
    box-shadow: 0 0 0 2px ${smtcControlFocusOuterStrokeColor};
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

  ::slotted(:is([slot='start'])) {
    margin-inline-end: var(--icon-spacing);
  }

  ::slotted(:is([slot='end'])) {
    margin-inline-start: var(--icon-spacing);
    flex-shrink: 0;
  }

  :host(${iconOnlyState}) {
    min-width: 32px;
    max-width: 32px;
  }

  :host(${smallState}) {
    --icon-spacing: ${smtcGapSmallControlDefault};
    min-height: 24px;
    min-width: 64px;
    padding: 0 ${smtcPaddingSmallControlVertical};
    border-radius: ${smtcCornerSmallControlRest};
    font-size: ${smtcTextRampCaption1FontSize};
    line-height: ${smtcTextRampCaption1LineHeight};
    font-weight: ${smtcTextRampCaption1FontWeight};
  }

  :host(${smallState}${iconOnlyState}) {
    min-width: 24px;
    max-width: 24px;
  }

  :host(${largeState}) {
    min-height: 40px;
    padding: 0 ${smtcPaddingLargeControlVertical};
    font-size: ${smtcTextRampBody3FontSize};
    line-height: ${smtcTextRampBody3LineHeight};
    font-weight: ${smtcTextRampBody3FontWeight};
    border-radius: ${smtcCornerLargeControlRest};
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
    border-radius: ${smtcCornerControlCircular};
  }

  :host(:is(${squareState}, ${squareState}:focus-visible)) {
    border-radius: ${smtcCornerControlNone};
  }

  :host(${primaryState}) {
    background-color: ${smtcBackgroundControlBrandRest};
    color: ${smtcForegroundControlOnBrandRest};
    border-color: transparent;
  }

  :host(${primaryState}:hover) {
    background-color: ${smtcBackgroundControlBrandHover};
  }

  :host(${primaryState}:is(:hover, :hover:active)) {
    border-color: transparent;
    color: ${smtcForegroundControlOnBrandRest};
  }

  :host(${primaryState}:hover:active) {
    background-color: ${smtcBackgroundControlBrandPressed};
  }

  :host(${primaryState}:focus-visible) {
    border-color: ${smtcControlFocusInnerStrokeColor};
    box-shadow: 0 0 0 2px ${smtcControlFocusOuterStrokeColor};
  }

  :host(${outlineState}) {
    background-color: ${smtcBackgroundControlOutlineRest};
    border-color: ${smtcStrokeControlOutlineRest};
    border-width: ${smtcStrokeWidthControlOutlineRest};
    color: ${smtcForegroundControlOnOutlineRest};
  }
  :host(${outlineState}:hover) {
    background-color: ${smtcBackgroundControlOutlineHover};
    border-color: ${smtcStrokeControlOutlineHover};
    border-width: ${smtcStrokeWidthControlOutlineHover};
    color: ${smtcForegroundControlOnOutlineHover};
  }
  :host(${outlineState}:is(:hover, :hover:active)) {
    background-color: ${smtcBackgroundControlOutlinePressed};
    border-color: ${smtcStrokeControlOutlinePressed};
    border-width: ${smtcStrokeWidthControlOutlinePressed};
    color: ${smtcForegroundControlOnOutlinePressed};
  }

  :host(${subtleState}) {
    background-color: ${smtcBackgroundControlSubtleRest};
    border-color: transparent;
  }

  :host(${subtleState}:hover) {
    background-color: ${smtcBackgroundControlSubtleHover};
    border-color: transparent;
  }

  :host(${subtleState}:hover:active) {
    background-color: ${smtcBackgroundControlSubtlePressed};
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
    background-color: ${smtcBackgroundControlNeutralDisabled};
    border-color: ${smtcStrokeControlOnNeutralDisabled};
    color: ${smtcForegroundControlNeutralPrimaryDisabled};
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
    background-color: ${smtcNullColor};
  }

  :host(${outlineState}:is(:disabled, [disabled-focusable])),
  :host(
      ${outlineState}:is(:disabled, [disabled-focusable]):is(
          :hover,
          :hover:active
        )
    ) {
    background-color: ${smtcBackgroundControlOutlineDisabled};
    border-color: ${smtcStrokeControlOutlineDisabled};
    border-width: ${smtcStrokeWidthControlOutlineRest};
    color: ${smtcForegroundControlOnOutlineDisabled};
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
