import { html, ref, slotted } from "@microsoft/fast-element";

import type { Composer } from "./composer.js";
import { ComposerView } from "./composer.options.js";

import {
    AddIconSvg,
    ArrowUpIconSvg,
    ComposeIconSvg,
    CopilotLogoSvg,
    DismissIconSvg,
    HistoryIconSvg,
    MicrophoneIconSvg,
    MicrophoneMutedIconSvg,
    SearchVisualIconSvg,
    SettingsIconSvg,
} from "./svgs.js";

// TODO: All the `<button>` used here should eventually be replaced with
// `<mai-button>`, when semantic tokens are stable.

const templateCopilotHistoryMenu = html<Composer>`
    <div class="history menu copilot-only" id="history"
        ${ref("historyElement")}
        role="menu"
        @click="${(x, c) => x.handleHistoryClick(c.event as MouseEvent)}"
        @keydown="${(x, c) => x.handleHistoryKeydown(c.event as KeyboardEvent)}"
    >
        <slot name="history-heading" ${slotted("slottedHistoryHeadingNodes")}></slot>
        <slot name="history" ${slotted("slottedHistoryNodes")}></slot>
    </div>
`;

const templateCopilotHistoryButton = html<Composer>`
    <button
        title="${x => (x.view === ComposerView.HISTORY ? x.labelCloseHistory : x.labelViewHistory)}"
        class="toolbar-slot toolbar-slot-1 in-view-home in-view-history copilot-only"
        ?disabled="${x =>
            ![ComposerView.HOME, ComposerView.HISTORY].includes(x.view) ||
            x.isComposing}"
        aria-haspopup="menu"
        aria-expanded="${x => x.view === ComposerView.HISTORY}"
        aria-controls="history"
        @click="${x => x.navigate(x.view === ComposerView.HISTORY ? ComposerView.HOME : ComposerView.HISTORY)}"
    >
        <span ?hidden="${x => x.view === ComposerView.HISTORY}">${html.partial(HistoryIconSvg)}</span>
        <span ?hidden="${x => x.view === ComposerView.HOME}">${html.partial(DismissIconSvg)}</span>
    </button>
`;

const templateCopilotHomeButton = html<Composer>`
    <button
        title="${x => x.labelHome}"
        class="toolbar-slot toolbar-slot-1 in-view-compose copilot-only"
        ?disabled="${x => x.isComposing || x.view !== ComposerView.COMPOSE}"
        @click="${x => x.navigate(ComposerView.HOME)}"
    >${html.partial(CopilotLogoSvg)}</button>
`;

const templateCopilotMessageAttachmentAddButton = html<Composer>`
    <button
        ${ref("addAttachmentElement")}
        title="${x => x.labelAddAttachment}"
        class="toolbar-slot toolbar-slot-2 in-view-compose in-view-home copilot-only"
        ?disabled="${x =>
            x.hasAttachment ||
            ![ComposerView.COMPOSE, ComposerView.HOME].includes(x.view) ||
            x.disabled}"
        @click="${x => x.handleAddAttachmentClick()}"
    >
        ${html.partial(AddIconSvg)}
    </button>
    <input
        ${ref("attachmentElement")}
        hidden
        type="file"
        accept="image/*"
        aria-label="${x => x.labelAddAttachment}"
        @input="${x => x.handleAttachmentInput()}"
        @cancel="${x => x.handleAttachmentCancel()}"
    >
`;

const templateCopilotMessageAttachmentPreview = html<Composer>`
    <div
        ${ref("attachmentPreviewElement")}
        class="attachment-preview copilot-only"
        aria-hidden="true"
    >
        <button
            title="${x => x.labelRemoveAttachment}"
            ?disabled="${x =>
                !x.hasAttachment ||
                ![ComposerView.COMPOSE, ComposerView.HOME].includes(x.view)}"
            @click="${x => x.handleRemoveAttachmentClick()}"
        >
            ${html.partial(DismissIconSvg)}
        </button>
    </div>
`;

const templateCopilotTalkButtonsStart = html<Composer>`
    <button
        title="${x => x.labelVoiceEnd}"
        class="toolbar-slot toolbar-slot-1 in-view-voice copilot-only"
        ?disabled="${x => x.view !== ComposerView.VOICE || x.isVoiceSetting}"
        @click="${x => x.handleVoiceEndClick()}"
    >
        ${html.partial(DismissIconSvg)}
    </button>
    <button
        title="${x => (x.isVoiceMuted ? x.labelVoiceUnmute : x.labelVoiceMute)}"
        class="toolbar-slot toolbar-slot-2 in-view-voice toolbar-mute copilot-only"
        aria-pressed="${x => x.isVoiceMuted.toString()}"
        ?disabled="${x =>
            x.view !== ComposerView.VOICE ||
            !x.isVoiceConnected ||
            x.isVoiceSetting}"
        @click="${(x, c) => x.handleVoiceMuteClick(c.event as MouseEvent)}"
    >
        <span ?hidden="${x => x.isVoiceMuted}" role="none">${html.partial(MicrophoneIconSvg)}</span>
        <span ?hidden="${x => !x.isVoiceMuted}" role="none">${html.partial(MicrophoneMutedIconSvg)}</span>
    </button>
`;

const templateCopilotTalkButtonsEnd = html<Composer>`
    <button
        title="${x => x.labelVoiceStart}"
        class="toolbar-slot toolbar-slot-4 in-view-compose in-view-home copilot-only"
        ?disabled="${x =>
            x.isComposing ||
            ![ComposerView.COMPOSE, ComposerView.HOME].includes(x.view) ||
            x.disabled}"
        @click="${x => x.handleVoiceStartClick()}"
    >${html.partial(MicrophoneIconSvg)}</button>
    <button
        title="${x => (x.isVoiceSetting ? x.labelVoiceCloseSettings : x.labelVoiceSettings)}"
        class="toolbar-slot toolbar-slot-4 in-view-voice"
        ?disabled="${x => x.view !== ComposerView.VOICE || !x.isVoiceConnected}"
        aria-controls="voice-settings"
        aria-expanded="${x => x.isVoiceSetting.toString()}"
        @click="${x => (x.isVoiceSetting ? x.handleVoiceCloseSettingsClick() : x.handleVoiceSettingsClick())}"
    >
        <span ?hidden="${x => x.isVoiceSetting}">${html.partial(SettingsIconSvg)}</span>
        <span ?hidden="${x => !x.isVoiceSetting}">${html.partial(DismissIconSvg)}</span>
    </button>
`;

const templateCopilotTalkSettings = html<Composer>`
    <div class="voice-settings menu copilot-only" id="voice-settings">
        <slot name="voice-setting" ${slotted({
            property: "slottedVoiceSettingNodes",
            filter: el => el instanceof HTMLButtonElement,
        })}></slot>
    </div>
`;

const templateCopilotMessageComposeButton = html<Composer>`
    <button
        title="${x => x.labelCompose}"
        class="toolbar-slot toolbar-slot-4 in-view-history copilot-only"
        ?disabled="${x => x.view !== ComposerView.HISTORY}"
        @click="${x => x.navigate(ComposerView.COMPOSE)}"
    >${html.partial(ComposeIconSvg)}</button>
`;

const templateSearchVoice = html<Composer>`
    <button
        title="${x => x.labelVoiceSearch}"
        class="toolbar-slot toolbar-slot-4 search-only"
        ?disabled="${x => x.disabled}"
        @click="${x => x.handleVoiceSearchClick()}"
    >${html.partial(MicrophoneIconSvg)}</button>
`;

const templateSearchVisual = html<Composer>`
    <button
        title="${x => x.labelVisualSearch}"
        class="toolbar-slot toolbar-slot-5 search-only"
        ?disabled="${x => x.disabled}"
        @click="${x => x.handleVisualSearchClick()}"
    >
        ${html.partial(SearchVisualIconSvg)}
    </button>
`;

const templateMessageInput = html<Composer>`
    <div
        ?hidden="${x => !x.disabled}"
        class="disabled-indicator"
        aria-hidden="true"
    >
        ${x => x.labelDisabled}
    </div>
    <label for="user-input">
        ${x => (x.hasAttachment ? x.labelInputWithAttachment : x.labelInput)}
    </label>
    <div class="input-textbox" data-message="">
        <textarea
            ${ref("inputElement")}
            id="user-input"
            rows="1"
            ?disabled="${x =>
                ![ComposerView.COMPOSE, ComposerView.HOME].includes(x.view) ||
                x.disabled}"
            @focus="${x => x.handleInputFocus()}"
            @input="${x => x.handleInputInput()}"
            @keydown="${(x, c) => x.handleInputKeydown(c.event as KeyboardEvent)}"
        ></textarea>
    </div>
    <button
        ${ref("submitElement")}
        title="${x => x.labelSubmit}"
        class="copilot-only"
        ?disabled="${x =>
            !x.isComposing ||
            ![ComposerView.COMPOSE, ComposerView.HOME].includes(x.view)}"
        @click="${x => x.handleSubmitClick()}"
    >
        ${html.partial(ArrowUpIconSvg)}
    </button>
`;

const templateMessage = html<Composer>`
    ${templateCopilotMessageAttachmentAddButton}
    <div
        class="input toolbar-slot toolbar-slot-3 in-view-compose in-view-home"
        tabindex="${x => (x.disabled && [ComposerView.COMPOSE, ComposerView.HOME].includes(x.view) ? "0" : null)}"
        aria-label="${x => (x.disabled ? x.labelDisabled : null)}"
        role="${x => (x.disabled ? "note" : "none")}"
        @click="${(x, c) => x.handleInputContainerClick(c.event as MouseEvent)}"
    >
        ${templateCopilotMessageAttachmentPreview}
        ${templateMessageInput}
    </div>
    ${templateCopilotMessageComposeButton}
`;

export const template = html<Composer>`
    ${templateCopilotHistoryMenu}
    ${templateCopilotTalkSettings}
    <div class="toolbar"
        @focusout="${(x, c) => x.handleToolbarFocusout(c.event as FocusEvent)}"
    >
        ${templateCopilotHistoryButton}
        ${templateCopilotTalkButtonsStart}
        ${templateCopilotHomeButton}
        ${templateMessage}
        ${templateCopilotTalkButtonsEnd}
        ${templateSearchVoice}
        ${templateSearchVisual}
    </div>
`;
