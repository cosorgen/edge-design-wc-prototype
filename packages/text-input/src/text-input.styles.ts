import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  colorBrandStrokePressed,
  colorNeutralBackgroundInverted,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForegroundHint,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStrokeDisabled,
  colorPaletteRedBorder2,
  colorTransparentBackground,
  colorTransparentStroke,
  colorTransparentStrokeInteractive,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase500,
  fontSizeBase600,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  smtcBackgroundControlNeutralDarkerRest,
  smtcBackgroundControlNeutralRest,
  smtcCornerControlRest,
  smtcShadowTextInputRest,
  smtcStrokeTextInputAccessibleRest,
  smtcStrokeTextInputOutlineRest,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalXS,
  strokeWidthThin,
  smtcStrokeTextInputOutlineHover,
  smtcStrokeTextInputAccessibleHover,
  smtcStrokeTextInputOutlinePressed,
  smtcStrokeTextInputAccessiblePressed,
  smtcStrokeTextInputFocused,
} from './text-input.tokens.js';
import { display } from '@mai-ui/component-framework/display.js';
import {
  filledDarkerState,
  filledLighterState,
  largeState,
  outlineState,
  smallState,
  underlineState,
} from '@mai-ui/component-framework/states.js';

/**
 * Styles for the TextInput component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('block')}

  :host {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    max-width: 400px;
  }
  .label {
    display: flex;
    color: ${colorNeutralForeground1};
    padding-bottom: ${spacingVerticalXS};
    flex-shrink: 0;
    padding-inline-end: ${spacingHorizontalXS};
  }

  .label[hidden],
  :host(:empty) .label {
    display: none;
  }

  .root {
    align-items: center;
    background-color: ${smtcBackgroundControlNeutralRest};
    border: ${strokeWidthThin} solid ${smtcStrokeTextInputOutlineRest};
    border-bottom-color: ${smtcStrokeTextInputAccessibleRest};
    border-radius: ${smtcCornerControlRest};
    box-sizing: border-box;
    height: 32px;
    display: inline-flex;
    flex-direction: row;
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalMNudge};
    position: relative;
    width: 100%;
  }

  :has(.control:user-invalid) {
    border-color: ${colorPaletteRedBorder2};
  }

  .root::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    inset: -1px;
    border-bottom-right-radius: ${smtcCornerControlRest};
    border-bottom-left-radius: ${smtcCornerControlRest};
    border-bottom: 2px solid ${smtcStrokeTextInputFocused};
    pointer-events: none;
    transform: scaleX(0);
    transition-property: transform;
    transition-duration: ${durationUltraFast};
    transition-delay: ${curveAccelerateMid};
  }
  .control {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    border-radius: ${smtcCornerControlRest};
    background: ${colorTransparentBackground};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    font-size: ${fontSizeBase300};
    border: none;
    vertical-align: center;
  }
  .control:focus-visible {
    outline: 0;
    border: 0;
  }
  .control::placeholder {
    color: ${colorNeutralForegroundHint};
  }
  :host ::slotted([slot='start']),
  :host ::slotted([slot='end']) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colorNeutralForeground3};
    font-size: ${fontSizeBase500};
  }
  :host ::slotted([slot='start']) {
    padding-right: ${spacingHorizontalXXS};
  }
  :host ::slotted([slot='end']) {
    padding-left: ${spacingHorizontalXXS};
    gap: ${spacingHorizontalXS};
  }
  :host(:hover) .root {
    border-color: ${smtcStrokeTextInputOutlineHover};
    border-bottom-color: ${smtcStrokeTextInputAccessibleHover};
  }
  :host(:active) .root {
    border-color: ${smtcStrokeTextInputOutlinePressed};
  }
  :host(:focus-within) .root {
    outline: transparent solid 2px;
    border-bottom: 0;
  }
  :host(:focus-within) .root::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }
  :host(:focus-within:active) .root:after {
    border-bottom-color: ${colorBrandStrokePressed};
  }
  :host(${outlineState}:focus-within) .root {
    border: ${strokeWidthThin} solid ${smtcStrokeTextInputOutlinePressed};
  }
  :host(:focus-within) .control {
    color: ${colorNeutralForeground1};
  }
  :host([disabled]) .root {
    background: ${colorTransparentBackground};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeDisabled};
  }
  :host([disabled]) .control::placeholder,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) ::slotted([slot='end']) {
    color: ${colorNeutralForegroundDisabled};
  }
  ::selection {
    color: ${colorNeutralForegroundInverted};
    background-color: ${colorNeutralBackgroundInverted};
  }
  :host(${smallState}) .control {
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
  }
  :host(${smallState}) .root {
    height: 24px;
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalSNudge};
  }
  :host(${smallState}) ::slotted([slot='start']),
  :host(${smallState}) ::slotted([slot='end']) {
    font-size: ${fontSizeBase400};
  }
  :host(${largeState}) .control {
    font-size: ${fontSizeBase400};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase400};
  }
  :host(${largeState}) .root {
    height: 40px;
    gap: ${spacingHorizontalS};
    padding: 0 ${spacingHorizontalM};
  }
  :host(${largeState}) ::slotted([slot='start']),
  :host(${largeState}) ::slotted([slot='end']) {
    font-size: ${fontSizeBase600};
  }
  :host(${underlineState}) .root {
    background: ${colorTransparentBackground};
    border: 0;
    border-radius: 0;
    border-bottom: ${strokeWidthThin} solid ${smtcStrokeTextInputAccessibleRest};
  }
  :host(${underlineState}:hover) .root {
    border-bottom-color: ${smtcStrokeTextInputAccessibleHover};
  }
  :host(${underlineState}:active) .root {
    border-bottom-color: ${smtcStrokeTextInputAccessiblePressed};
  }
  :host(${underlineState}:focus-within) .root {
    border: 0;
    border-bottom-color: ${smtcStrokeTextInputAccessiblePressed};
  }
  :host(${underlineState}[disabled]) .root {
    border-bottom-color: ${colorNeutralStrokeDisabled};
  }
  :host(${filledLighterState}) .root,
  :host(${filledDarkerState}) .root {
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${smtcShadowTextInputRest};
  }
  :host(${filledLighterState}) .root {
    background: ${smtcBackgroundControlNeutralRest};
  }
  :host(${filledDarkerState}) .root {
    background: ${smtcBackgroundControlNeutralDarkerRest};
  }
  :host(${filledLighterState}:hover) .root,
  :host(${filledDarkerState}:hover) .root {
    border-color: ${colorTransparentStrokeInteractive};
  }
  :host(${filledLighterState}:active) .root,
  :host(${filledDarkerState}:active) .root {
    border-color: ${colorTransparentStrokeInteractive};
    background: ${smtcBackgroundControlNeutralDarkerRest};
  }
`;
