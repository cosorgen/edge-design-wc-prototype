import { display } from "@fluentui/web-components";
import {
    aiComposerBackgroundDisabled,
    aiComposerBackgroundHover,
    aiComposerBackgroundPressed,
    aiComposerBackgroundRest,
    aiComposerBackgroundSelectedRest,
    aiComposerBottomStrokeWidthHover,
    aiComposerBottomStrokeWidthPressed,
    aiComposerBottomStrokeWidthRest,
    aiComposerCornerHover,
    aiComposerCornerPressed,
    aiComposerCornerRest,
    aiComposerCornerSelectedRest,
    aiComposerStrokeDisabled,
    aiComposerStrokeHover,
    aiComposerStrokePressed,
    aiComposerStrokeRest,
    aiComposerStrokeSelectedRest,
    aiComposerStrokeWidthHover,
    aiComposerStrokeWidthPressed,
    aiComposerStrokeWidthRest,
    aiComposerStrokeWidthSelectedRest,
    aiGradientStrongStop1,
    aiGradientStrongStop2,
    aiGradientStrongStop3,
    aiGradientStrongStop4,
    aiGradientStrongStop5,
    backgroundControlBrandDisabled,
    backgroundControlBrandHover,
    backgroundControlBrandPressed,
    backgroundControlBrandRest,
    backgroundControlNeutralSecondaryDisabled,
    backgroundControlNeutralSecondaryHover,
    backgroundControlNeutralSecondaryPressed,
    backgroundControlNeutralSecondaryRest,
    backgroundControlSubtleDisabled,
    backgroundControlSubtleHover,
    backgroundControlSubtlePressed,
    backgroundControlSubtleRest,
    cornerImageDefault,
    foregroundControlIconOnSubtleDisabled,
    foregroundControlIconOnSubtleHover,
    foregroundControlIconOnSubtlePressed,
    foregroundControlIconOnSubtleRest,
    foregroundControlNeutralPrimaryDisabled,
    foregroundControlNeutralPrimaryHover,
    foregroundControlNeutralPrimaryPressed,
    foregroundControlNeutralPrimaryRest,
    foregroundControlNeutralSecondaryDisabled,
    foregroundControlNeutralSecondaryHover,
    foregroundControlNeutralSecondaryPressed,
    foregroundControlNeutralSecondaryRest,
    foregroundControlOnBrandDisabled,
    foregroundControlOnBrandHover,
    foregroundControlOnBrandPressed,
    foregroundControlOnBrandRest,
    gapBetweenControlNested,
    gapControlDefault,
    gapControlToSecondaryIcon,
    nullColor,
    paddingControlIconOnly,
    paddingControlTextBottom,
    paddingControlTextLeft,
    paddingControlTextRight,
    paddingControlTextTop,
    paddingToNestedControl,
    shapeButtonDisabled,
    shapeButtonHover,
    shapeButtonPressed,
    shapeButtonRest,
    sizeControlDefault,
    sizeIconDefault,
    strokeControlOnSubtleRest,
    strokeWidthControlDefaultRest,
    textRampBody1FontSize,
    textRampBody1LineHeight,
    textRampBody2LineHeight,
    textRampCaption1FontSize,
    textStyleDefaultRegularFontFamily,
    textStyleDefaultRegularLetterSpacing,
    textStyleDefaultRegularWeight,
} from "@mai-ui/design-tokens/composer.js";
import { css } from "@microsoft/fast-element";

const copilotModeState = css.partial`:where([state-copilot-mode], :state(copilot-mode))`;
const searchModeState = css.partial`:where([state-search-mode], :state(search-mode))`;
const inputFocusState = css.partial`:where([state--input-focus], :state(input-focus))`;
const composingState = css.partial`:where([state--composing], :state(composing))`;
const disabledState = css.partial`:where([state--disabled], :state(disabled))`;
const labelShownState = css.partial`:where([state--label-shown], :state(label-shown))`;
const hasAttachmentState = css.partial`:where([state--has-attachment], :state(has-attachment))`;
const voiceConnectedState = css.partial`:where([state--voice-connected], :state(voice-connected))`;
const voiceTalkingState = css.partial`:where([state--voice-talking], :state(voice-talking))`;
const voiceMuteState = css.partial`:where([state--voice-mute], :state(voice-mute))`;
const voiceSettingsState = css.partial`:where([state--voice-settings], :state(voice-settings))`;
const viewingComposeState = css.partial`:where([state--viewing-compose], :state(viewing-compose))`;
const viewingHomeState = css.partial`:where([state--viewing-home], :state(viewing-home))`;
const viewingHistoryState = css.partial`:where([state--viewing-history], :state(viewing-history))`;
const viewingVoiceState = css.partial`:where([state--viewing-voice], :state(viewing-voice))`;

export const styles = css`
    ${display("block")}

    :host {
        --background-color: ${aiComposerBackgroundRest};
        --backdrop-filter: blur(40px) saturate(2); /* Missing token */
        --border-width: ${aiComposerStrokeWidthRest};
        --border-color: ${aiComposerStrokeRest};
        --border-radius: ${aiComposerCornerRest};
        --box-shadow: rgb(0 0 0 / 0.06) 0px 42px 30px 0px; /* Missing token */
        --color: ${foregroundControlNeutralPrimaryRest};
        --font-family: ${textStyleDefaultRegularFontFamily};
        --inline-size: min(96vw, 24rem);
        --padding-block: ${paddingToNestedControl};
        --padding-inline: ${paddingToNestedControl};
        --transition-duration: .24s;

        --toolbar-gap-inline: ${gapBetweenControlNested};
        --toolbar-slot-button-inline-size: calc(var(--button-inline-size) + var(--toolbar-gap-inline));
        --toolbar-slot-1-inline-size: var(--toolbar-slot-button-inline-size);
        --toolbar-slot-2-inline-size: var(--toolbar-slot-button-inline-size);
        --toolbar-slot-4-inline-size: var(--toolbar-slot-button-inline-size);
        --toolbar-slot-5-inline-size: 0rem;
        --toolbar-slot-3-inline-size: calc(
            100% -
            var(--toolbar-slot-1-inline-size) -
            var(--toolbar-slot-2-inline-size) -
            var(--toolbar-slot-4-inline-size) -
            var(--toolbar-slot-5-inline-size)
        );

        --button-background-color: ${backgroundControlSubtleRest};
        --button-border-radius: ${shapeButtonRest};
        --button-block-size: ${sizeControlDefault};
        --button-icon-color: ${foregroundControlIconOnSubtleRest};
        --button-icon-size: ${sizeIconDefault};
        --button-inline-size: ${sizeControlDefault};
        --button-margin-block: calc(
            (var(--input-min-block-size) - var(--button-block-size)) / 2
        );

        --input-background-color: ${backgroundControlNeutralSecondaryRest};
        --input-border-radius: var(--part-composer-input-border-radius, 1.25rem); /* Missing token */
        --input-box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, .04); /* Missing token */
        --input-font-size: min(${textRampBody1FontSize}, 18px); /* Prevent from going too large */
        --input-font-weight: ${textStyleDefaultRegularWeight};
        --input-line-height: min(${textRampBody1LineHeight}, 28px); /* Prevent from going too large */
        --input-letter-spacing: ${textStyleDefaultRegularLetterSpacing};
        --input-margin-inline-start: 0rem;
        --input-margin-inline-end: 0rem;
        --input-min-block-size: calc(
            var(--input-submit-block-size) +
            var(--input-padding-block-start) +
            var(--input-padding-block-end)
        );
        --input-padding-block-start: ${paddingControlTextTop};
        --input-padding-block-end: ${paddingControlTextBottom};
        --input-padding-inline-start: ${paddingControlTextLeft};
        --input-padding-inline-end: ${paddingControlTextRight};
        --input-transition-duration: .24s;

        --input-label-color: ${foregroundControlNeutralSecondaryRest};

        --input-textarea-padding-inline-start: 0.625rem;

        --input-submit-background-color: ${backgroundControlBrandRest};
        --input-submit-block-size: 2.25rem; /* Missing token */
        --input-submit-icon-size: var(--button-icon-size);
        --input-submit-icon-color: ${foregroundControlOnBrandRest};
        --input-submit-inline-size: 2.25rem; /* Missing token */

        --preview-block-size: 8rem;
        --preview-image-border-radius: ${cornerImageDefault};
        --preview-dismiss-background-color: ${backgroundControlNeutralSecondaryRest};
        --preview-dismiss-border-color: rgb(0 0 0 / 0.3);
        --preview-dismiss-border-radius: 50%;
        --preview-dismiss-border-width: 1px;
        --preview-dismiss-block-size: 1.375rem;
        --preview-dismiss-icon-size: 0.75rem;
        --preview-dismiss-inline-size: 1.375rem;
        --preview-dismiss-inset: 0.375rem 0.375rem auto auto;

        --menu-padding: 0.5rem;
        --menu-padding-block-start: 1.5rem;

        --history-max-block-size: 0;
        --history-item-opacity: 0;
        --history-padding: 0;
        --history-padding-block-start: 0;
        --history-heading-font-size: 1.25rem;
        --history-heading-font-weight: 460;
        --history-heading-line-height: 1.625rem;
        --history-heading-letter-spacing: -0.01em;
        --history-heading-margin-inline: 0.5rem;
        --history-item-offset-inline: 0.75rem;
        --history-date-margin-block-start: 1.25rem;
        --history-date-margin-block-end: 0.25rem;
        --history-date-margin-inline: var(--history-item-offset-inline);
        --history-date-font-size: 0.875rem;
        --history-date-line-height: 1.25rem;
        --history-date-font-weight: 410;
        --history-date-color: #635d5a;
        --history-item-padding-block: var(--history-item-offset-inline);
        --history-item-padding-inline: var(--history-item-offset-inline);

        --voice-mute-block-size: 3rem;
        --voice-mute-inline-size: 3rem;
        --voice-settings-gap: 0.5rem;
        --voice-settings-opacity: 0;
        --voice-settings-max-block-size: 0;
        --voice-settings-padding: 0;
        --voice-settings-padding-block-start: 0;
        --voice-settings-button-block-size: 4rem;
        --voice-settings-button-color: currentcolor;
        --voice-settings-button-background-color: rgb(0 0 0 / 0.08);

        background-color: var(--background-color);
        backdrop-filter: var(--backdrop-filter);
        border: var(--border-width) solid var(--border-color);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        box-sizing: border-box;
        color: var(--color);
        contain: content;
        font-family: var(--font-family);
        inline-size: var(--inline-size);
        max-inline-size: 100%;
        overflow: clip;
        padding: var(--padding-block) var(--padding-inline);
        transition-duration: var(--transition-duration);
    }

    :host(${copilotModeState}) .search-only,
    :host(${searchModeState}) .copilot-only {
        display: none;
    }

    :host(:hover) {
        --background-color: ${aiComposerBackgroundHover};
        --border-color: ${aiComposerStrokeHover};
    }

    :host(:focus-within) {
        --background-color: ${aiComposerBackgroundSelectedRest};
    }

    :host(${inputFocusState}),
    :host(${composingState}) {
        --background-color: ${aiComposerBackgroundPressed};
        --border-color: ${aiComposerStrokePressed};
    }

    :host(${inputFocusState}:not(${searchModeState})),
    :host(${composingState}) {
        --inline-size: min(96vw, 46.5rem);
    }

    :host(${disabledState}) {
        --background-color: ${aiComposerBackgroundDisabled};
        --border-color: ${aiComposerStrokeDisabled};
        --input-background-color: ${backgroundControlNeutralSecondaryDisabled};
        --input-label-color: ${foregroundControlNeutralSecondaryDisabled};
    }

    :host(${viewingComposeState}),
    :host(${viewingHomeState}) {
        --input-margin-inline-start: ${gapBetweenControlNested};
        --input-margin-inline-end: ${gapBetweenControlNested};
    }

    :host(${viewingHistoryState}) {
        --toolbar-slot-2-inline-size: 0rem;
        --toolbar-slot-3-inline-size: 0rem;
        --history-padding: var(--menu-padding);
        --history-padding-block-start: var(--menu-padding-block-start);
        --history-max-block-size: 24rem;
        --history-item-opacity: 1;
    }

    :host(${viewingVoiceState}) {
        --inline-size: calc(
            var(--toolbar-slot-1-inline-size) +
            var(--toolbar-slot-2-inline-size) +
            var(--toolbar-slot-4-inline-size) +
            var(--padding-inline) * 2
        );
    }

    :host(${viewingVoiceState}:not(${voiceConnectedState})) {
        --padding-inline: 0.75rem;
        --toolbar-gap-inline: 0rem;
        --toolbar-slot-2-inline-size: 0rem;
        --toolbar-slot-3-inline-size: 0rem;
        --toolbar-slot-4-inline-size: 0rem;
    }

    :host(${composingState}) {
        --toolbar-slot-1-inline-size: 0rem;
        --toolbar-slot-4-inline-size: 0rem;
        --input-margin-inline-end: 0rem;
    }

    :host(${hasAttachmentState}) {
        --toolbar-slot-2-inline-size: 0rem;
        --input-margin-inline-start: 0rem;
    }

    :host(${voiceSettingsState}) {
        --toolbar-slot-1-inline-size: 0rem;
        --toolbar-slot-2-inline-size: 0rem;
        --toolbar-slot-3-inline-size: 0rem;
        --inline-size: 17.375rem;
        --voice-settings-opacity: 1;
        --voice-settings-max-block-size: 24rem;
        --voice-settings-padding: var(--menu-padding);
        --voice-settings-padding-block-start: var(--menu-padding-block-start);
    }

    :host(${searchModeState}) {
        --toolbar-slot-1-inline-size: 0rem;
        --toolbar-slot-2-inline-size: 0rem;
        --toolbar-slot-3-inline-size: 1fr;
        --toolbar-slot-5-inline-size: var(--toolbar-slot-button-inline-size);
        --input-margin-inline-start: 0rem;
    }

    button,
    ::slotted(button) {
        appearance: none;
        background-color: var(--button-background-color);
        border: 0;
        border-radius: var(--button-border-radius);
        color: var(--button-icon-color);
        font: inherit;
    }

    button:enabled,
    ::slotted(button:enabled) {
        cursor: pointer;
    }

    button:enabled:is(:hover, :focus),
    ::slotted(button:enabled:is(:hover, :focus)) {
        --button-background-color: ${backgroundControlSubtleHover};
        --button-icon-color: ${foregroundControlIconOnSubtleHover};
        --button-border-radius: ${shapeButtonHover};
    }

    button:enabled:active,
    ::slotted(button:enabled:active) {
        --button-background-color: ${backgroundControlSubtlePressed};
        --button-icon-color: ${foregroundControlIconOnSubtlePressed};
        --button-border-radius: ${shapeButtonPressed};
    }

    button:disabled,
    ::slotted(button:disabled) {
        --button-background-color: ${backgroundControlSubtleDisabled};
        --button-icon-color: ${foregroundControlIconOnSubtleDisabled};
        --button-border-radius: ${shapeButtonDisabled};
    }

    .toolbar {
        align-items: end;
        display: grid;
        grid-template:
            "slot-1 slot-2 slot-3 slot-4 slot-5" /
            var(--toolbar-slot-1-inline-size)
            var(--toolbar-slot-2-inline-size)
            var(--toolbar-slot-3-inline-size)
            var(--toolbar-slot-4-inline-size)
            var(--toolbar-slot-5-inline-size);
        inline-size: 100%;
        justify-content: center;
        transition: grid-template-columns var(--transition-duration);
    }

    .toolbar-slot {
        grid-row: 1 / -1;
        transition-duration: var(--transition-duration);
    }

    .toolbar-slot,
    button.toolbar-slot:disabled {
        opacity: 0;
        pointer-events: none;
    }

    :host(${viewingComposeState}) :where(.in-view-compose),
    :host(${viewingHomeState}) :where(.in-view-home),
    :host(${viewingHistoryState}) :where(.in-view-history),
    :host(${viewingVoiceState}) :where(.in-view-voice),
    button.toolbar-slot:enabled {
        opacity: 1;
        pointer-events: all;
    }

    :host(${disabledState}${viewingComposeState}) button:disabled:where(.in-view-compose),
    :host(${disabledState}${viewingHomeState}) button:disabled:where(.in-view-home) {
        opacity: revert;
        pointer-events: revert;
    }

    .toolbar-slot-1 {
        grid-area: slot-1;
    }

    .toolbar-slot-2 {
        grid-area: slot-2;
    }

    .toolbar-slot-3 {
        grid-area: slot-3;
    }

    .toolbar-slot-4 {
        grid-area: slot-4;
    }

    .toolbar-slot-5 {
        grid-area: slot-5;
    }

    .toolbar-slot-1,
    .toolbar-slot-2,
    .toolbar-slot-4,
    .toolbar-slot-5 {
        margin-inline: calc(var(--toolbar-gap-inline) / 2);
    }

    .toolbar-slot-1,
    .toolbar-slot-2 {
        justify-self: end;
    }

    .toolbar button,
    .toolbar button > span:not([hidden]) {
        display: grid;
        place-items: center;
    }

    .toolbar button {
        block-size: var(--button-block-size);
        inline-size: var(--button-inline-size);
        margin-block: var(--button-margin-block);
        padding: 0;
        transition: var(--transition-duration);
    }

    .toolbar button span {
        pointer-events: none;
    }

    .toolbar button svg {
        aspect-ratio: 1;
        inline-size: var(--button-icon-size);
    }

    .input {
        align-items: center;
        background-color: var(--input-background-color);
        border-radius: var(--input-border-radius);
        box-shadow: var(--input-box-shadow);
        box-sizing: border-box;
        cursor: text;
        display: grid;
        grid-template:
            'preview .'
            'textbox submit'
            / 1fr auto;
        margin-inline: var(--input-margin-inline-start) var(--input-margin-inline-end);
        min-block-size: var(--input-min-block-size);
        overflow: hidden;
        padding:
            var(--input-padding-block-start)
            var(--input-padding-inline-end)
            var(--input-padding-block-end)
            var(--input-padding-inline-start);
        transition: var(--transition-duration);
    }

    .input:hover {
        --input-background-color: ${backgroundControlNeutralSecondaryHover};
    }

    .input:focus-within {
        --input-background-color: ${backgroundControlNeutralSecondaryPressed};
    }

    :host(${disabledState}) .input {
        cursor: default;
    }

    :host(${searchModeState}) .input {
        box-shadow: 0 1px 2px 0 rgb(0 30 68 / 0.1) inset;
        grid-template: 'textbox submit' / 1fr auto;
    }

    .input button {
        align-self: end;
        appearance: none;
        background-color: var(--input-submit-background-color);
        border: 0;
        block-size: var(--input-submit-block-size);
        color: var(--input-submit-icon-color);
        display: grid;
        font-size: var(--input-submit-icon-size);
        grid-area: submit;
        inline-size: var(--input-submit-inline-size);
        margin: 0;
        opacity: 0;
        padding: 0;
        place-items: center;
        pointer-events: none;
        transition: opacity var(--transition-duration);
    }

    :host(${composingState}) .input button {
        opacity: 1;
        pointer-events: all;
    }

    .input button:hover,
    .input button:focus {
        --input-submit-background-color: ${backgroundControlBrandHover};
        --input-submit-icon-color: ${foregroundControlOnBrandHover};
    }

    .input button:active {
        --input-submit-background-color: ${backgroundControlBrandPressed};
        --input-submit-icon-color: ${foregroundControlOnBrandPressed};
    }

    .input button:disabled {
        --input-submit-background-color: ${backgroundControlBrandDisabled};
        --input-submit-icon-color: ${foregroundControlOnBrandDisabled};
    }

    .disabled-indicator,
    .input label,
    .input-textbox {
        box-sizing: border-box;
        font-family: inherit;
        font-weight: var(--input-font-weight);
        font-size: var(--input-font-size);
        grid-area: textbox;
        letter-spacing: var(--input-letter-spacing);
        line-height: var(--input-line-height);
        margin: 0;
        padding: 0;
        padding-inline-start: var(--input-textarea-padding-inline-start);
    }

    .disabled-indicator,
    .input label {
        color: var(--input-label-color);
        pointer-events: none;
        position: relative;
        white-space: nowrap;
    }

    .input label {
        opacity: 0;
    }

    :host(${labelShownState}) .input label {
        opacity: 1;
    }

    .input-textbox {
        display: grid;
    }

    .input-textbox::after,
    .input-textbox textarea {
        grid-area: 1 / 1 / -1 / -1;
        max-block-size: 50dvh;
    }

    .input-textbox::after {
        content: attr(data-message) " ";
        visibility: hidden;
        white-space: pre-wrap;
    }

    .input-textbox textarea {
        background-color: transparent;
        border: 0;
        color: inherit;
        font: inherit;
        field-sizing: content;
        margin: 0;
        overflow: auto;
        outline: 0;
        padding: 0;
        resize: none;
    }

    .attachment-preview {
        justify-self: start;
        grid-area: preview;
        block-size: 0;
        inline-size: 0;
        opacity: 0;
        overflow: hidden;
        position: relative;
        transition-duration: var(--transition-duration);
        transition-delay: calc(var(--transition-duration) * 0.8), 0s, 0s, 0s;
    }

    :host(${hasAttachmentState}) .attachment-preview,
    .attachment-preview img {
        block-size: var(--preview-block-size);
        inline-size: auto;
        opacity: 1;
    }

    :host(${hasAttachmentState}) .attachment-preview {
        padding-block-end: var(--input-padding-block-end);
    }

    /* This makes the animation smoother */
    @supports (inline-size: calc-size(fit-content, size)) {
        :host(${hasAttachmentState}) .attachment-preview,
        .attachment-preview img {
            inline-size: calc-size(fit-content, size);
        }
    }

    .attachment-preview img {
        border-radius: var(--preview-image-border-radius);
        object-fit: scale-down;
    }

    .attachment-preview img[data-type="image/svg+xml"] {
        object-fit: fill;
    }

    .attachment-preview button {
        background-color: var(--preview-dismiss-background-color);
        block-size: var(--preview-dismiss-block-size);
        border:
            var(--preview-dismiss-border-width)
            solid
            var(--preview-dismiss-border-color);
        border-radius: var(--preview-dismiss-border-radius);
        inline-size: var(--preview-dismiss-inline-size);
        position: absolute;
        inset: var(--preview-dismiss-inset);
    }

    .attachment-preview button svg {
        inline-size: var(--preview-dismiss-icon-size);
    }

    .menu {
        box-sizing: border-box;
        overflow: clip;
        transition-duration: var(--transition-duration);
    }

    :host(${viewingHistoryState}) .history {
        overflow: auto;
    }

    .history {
        max-block-size: var(--history-max-block-size);
        padding:
            var(--history-padding-block-start)
            var(--history-padding)
            var(--history-padding);
        scroll-padding-block-end: var(--history-padding);
    }

    ::slotted([slot="history-heading"]),
    ::slotted([slot="history"]) {
        margin: 0;
        opacity: var(--history-item-opacity);
        transition: opacity var(--transition-duration);
    }

    ::slotted([slot="history-heading"]) {
        font-size: var(--history-heading-font-size);
        font-weight: var(--history-heading-font-weight);
        line-height: var(--history-heading-line-height);
        letter-spacing: var(--history-heading-letter-spacing);
        margin-inline: var(--history-heading-margin-inline);
    }

    ::slotted([slot="history"]:is(h2, h3, h4, h5, h6)) {
        color: var(--history-date-color);
        font-size: var(--history-date-font-size);
        font-weight: var(--history-date-font-weight);
        line-height: var(--history-date-line-height);
        margin:
            var(--history-date-margin-block-start)
            var(--history-date-margin-inline)
            var(--history-date-margin-block-end);
    }

    ::slotted(button[slot="history"]) {
        padding: var(--history-item-padding-block) var(--history-item-padding-inline);
        text-align: initial;
    }

    .voice-settings {
        display: grid;
        gap: var(--voice-settings-gap);
        grid-template-columns: 1fr 1fr;
        max-block-size: var(--voice-settings-max-block-size);
        opacity: var(--voice-settings-opacity);
        padding:
            var(--voice-settings-padding-block-start)
            var(--voice-settings-padding)
            var(--voice-settings-padding);
    }

    ::slotted(button[slot="voice-setting"]) {
        appearance: none;
        background-color: var(--voice-settings-button-background-color);
        block-size: var(--voice-settings-button-block-size);
        border: 0;
        color: var(--voice-settings-button-color);
        display: grid;
        font: inherit;
        padding: 0;
        place-content: center;
    }

    ::slotted(button[slot="voice-setting"]:hover),
    ::slotted(button[slot="voice-setting"]:focus) {
        --voice-settings-button-background-color: rgb(0 0 0 / 0.1);
    }

    ::slotted(button[slot="voice-setting"]:active) {
        --voice-settings-button-color: #57514f; /* dark: #a2898c */
        --voice-settings-button-background-color: rgb(0 0 0 / 0.05);
    }

    ::slotted(button[slot="voice-setting"][aria-pressed="true"]) {
        --voice-settings-button-color: #e8e0dc; /* dark: #e3cbbc */
        --voice-settings-button-background-color: #282523; /* dark: #455172 */
    }

    button.toolbar-mute {
        align-self: center;
        block-size: var(--voice-mute-block-size);
        inline-size: var(--voice-mute-inline-size);
        justify-self: center;
        margin-block: calc(var(--button-block-size) - var(--voice-mute-block-size));
    }

    button.toolbar-mute:enabled {
        --button-border-radius: 50%;
    }
`;
