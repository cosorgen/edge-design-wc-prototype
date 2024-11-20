import { toggleState } from "@mai-ui/component-framework";
import { FASTElement, attr, observable } from "@microsoft/fast-element";

import {
    COMPOSER_VIEWS,
    COMPOSER_VOICE_SOURCES,
    ComposerView,
    type ComposerVoiceSource,
} from "./composer.options.js";

/**
 * A Copilot Composer custom HTML element.
 *
 * @emits navigate - Dispatches when user clicked on a navigational button and
 *     the composer’s view changed. Use the `detail.data.view` property to get
 *     the current view.
 * @emits submit - Dispatches when the user submits their inputs. The event’s
 *     `detail.data` property is a `FormData` object, use
 *     `detail.data.get('message')` to get the textual user input, and use
 *     `detail.data.get('attachment')` to get the user uploaded image, which is
 *     either a `File` object or `null`.
 * @emits voicestart - Dispatches when the user starts a voice session.
 * @emits voiceend - Dispatches when the user ends a voice session.
 * @emits voicemute - Dispatches when the user mutes during a voice session.
 *
 * @public
 */
export class Composer extends FASTElement {
    private attachmentPreviewImageElement?: HTMLImageElement;

    /** Whether the file picker of the `<input type=file>` is showing. */
    private showingPicker = false;

    private get historyItems(): HTMLButtonElement[] {
        return (
            this.slottedHistoryNodes?.filter(
                node => node instanceof HTMLButtonElement,
            ) ?? []
        );
    }

    private focusedHistoryItem?: HTMLButtonElement;

    /** @internal */
    public elementInternals = this.attachInternals();

    /** @internal */
    public inputElement!: HTMLTextAreaElement;

    /** @internal */
    public submitElement!: HTMLButtonElement;

    /** @internal */
    public attachmentElement!: HTMLInputElement;

    /** @internal */
    public addAttachmentElement!: HTMLButtonElement;

    /** @internal */
    public attachmentPreviewElement!: HTMLDivElement;

    /** @internal */
    public historyElement!: HTMLDivElement;

    /** @internal */
    @observable
    public slottedHistoryHeadingNodes: HTMLHeadElement[] = [];
    protected slottedHistoryHeadingNodesChanged() {
        if (!this.$fastController.isConnected) {
            return;
        }

        if (!this.slottedHistoryHeadingNodes) {
            this.historyElement.ariaLabel = "";
            return;
        }

        this.historyElement.ariaLabel =
            this.slottedHistoryHeadingNodes[0].textContent;
    }

    /** @internal */
    @observable
    public slottedHistoryNodes: HTMLElement[] = [];
    protected slottedHistoryNodesChanged() {
        this.historyItems.forEach(item => {
            item.role = "menuitem";
        });
        this.setHistoryActive(this.view === ComposerView.HISTORY);
    }

    /** @internal */
    @observable
    public slottedVoiceSettingNodes: HTMLButtonElement[] = [];
    protected slottedVoiceSettingNodesChanged() {
        this.slottedVoiceSettingNodes.forEach(node => {
            node.tabIndex = -1;
        });
    }

    /** @internal */
    @observable
    public isComposing = false;

    /** @internal */
    @observable
    public isVoiceConnected = false;

    /** @internal */
    @observable
    public isVoiceMuted = false;

    /** @internal */
    @observable
    public isVoiceSetting = false;

    /** @internal */
    @observable
    public hasAttachment = false;

    /** @internal */
    @observable
    public view = ComposerView.COMPOSE;

    /**
     * The label for the home button.
     * @public
     */
    @attr({ attribute: "label-home", mode: "fromView" })
    public labelHome = "Go to home";

    /**
     * The label for the view history button.
     * @public
     */
    @attr({ attribute: "label-view-history", mode: "fromView" })
    public labelViewHistory = "View history";

    /**
     * The label for the close history button.
     * @public
     */
    @attr({ attribute: "label-close-history", mode: "fromView" })
    public labelCloseHistory = "Close history";

    /**
     * The label for the compose button.
     * @public
     */
    @attr({ attribute: "label-compose", mode: "fromView" })
    public labelCompose = "Start new chat";

    /**
     * The label for the add attachment button.
     * @public
     */
    @attr({ attribute: "label-add-attachment", mode: "fromView" })
    public labelAddAttachment = "Upload image";

    /**
     * The label for the remove attachment button.
     * @public
     */
    @attr({ attribute: "label-remove-attachment", mode: "fromView" })
    public labelRemoveAttachment = "Remove image";

    /**
     * The label for the text input.
     * @public
     */
    @attr({ attribute: "label-input", mode: "fromView" })
    public labelInput = "Message Copilot";

    /**
     * The alternative label for the text input when the user added an
     * attachment.
     * @public
     */
    @attr({ attribute: "label-input-with-attachment", mode: "fromView" })
    public labelInputWithAttachment = "Add a message";

    /**
     * The label for the submit button.
     * @public
     */
    @attr({ attribute: "label-submit", mode: "fromView" })
    public labelSubmit = "Submit message";

    /**
     * The label for the start voice button.
     * @public
     */
    @attr({ attribute: "label-voice-start", mode: "fromView" })
    public labelVoiceStart = "Talk to Copilot";

    /**
     * The label for the stop voice button.
     * @public
     */
    @attr({ attribute: "label-voice-end", mode: "fromView" })
    public labelVoiceEnd = "Stop talking";

    /**
     * The label for the voice settings button.
     * @public
     */
    @attr({ attribute: "label-voice-mute", mode: "fromView" })
    public labelVoiceMute = "Mute microphone";

    /**
     * The label for the voice settings button.
     * @public
     */
    @attr({ attribute: "label-voice-unmute", mode: "fromView" })
    public labelVoiceUnmute = "Unmute microphone";

    /**
     * The label for the voice settings button.
     * @public
     */
    @attr({ attribute: "label-voice-settings", mode: "fromView" })
    public labelVoiceSettings = "Voice settings";

    /**
     * The label for the voice settings button.
     * @public
     */
    @attr({ attribute: "label-voice-close-settings", mode: "fromView" })
    public labelVoiceCloseSettings = "Close voice settings";

    /**
     * The label for when the chat functions are disabled.
     * @public
     */
    @attr({ attribute: "label-disabled", mode: "fromView" })
    public labelDisabled = "Chat is disabled";

    /**
     * The label for the voice search button.
     * @public
     */
    @attr({ attribute: "label-voice-search", mode: "fromView" })
    public labelVoiceSearch = "Search using voice";

    /**
     * The label for the visual search button.
     * @public
     */
    @attr({ attribute: "label-visual-search", mode: "fromView" })
    public labelVisualSearch = "Search using an image";

    /**
     * Whether the chat functions should be disabled.
     * @public
     */
    @attr({ mode: "boolean" })
    public disabled = false;
    protected disabledChanged() {
        toggleState(this.elementInternals, "disabled", this.disabled);
        if (this.$fastController.isConnected) {
            this.toggleLabelShownState();
        }
    }

    /**
     * The mode of the composer.
     * @public
     */
    @attr({ mode: "fromView" })
    public mode: "copilot" | "search" = "copilot";
    protected modeChanged(prev: string, next: string) {
        const validNext = ["copilot", "search"].includes(next)
            ? next
            : "copilot";

        if (prev) {
            toggleState(this.elementInternals, `${prev}-mode`, false);
        }
        if (validNext) {
            toggleState(this.elementInternals, `${next}-mode`, true);
        }
    }

    /**
     * The value of the user’s textual input.
     * @public
     */
    public get message(): string {
        return this.inputElement.value || "";
    }
    public set message(message: string) {
        this.inputElement.value = message;
        this.handleInputInput();
    }

    /**
     * The attachment that the user uploaded.
     * @public
     */
    public get attachment(): File | null {
        return this.attachmentElement.files?.[0] ?? null;
    }
    public set attachment(file: File | null) {
        if (file instanceof File) {
            const dt = new DataTransfer();
            dt.items.add(file);
            this.attachmentElement.files = dt.files;
        }
        this.setAttachmentPreview(file);
    }

    /** @internal */
    connectedCallback() {
        super.connectedCallback();
        this.navigate(ComposerView.COMPOSE, true);
        this.toggleLabelShownState();
    }

    /**
     * Submits the current user inputs.
     * @public
     */
    public submit() {
        const detail = new FormData();
        detail.set("message", this.message);
        if (this.attachment && this.mode === "copilot") {
            const attachment = new File(
                [this.attachment],
                this.attachment.name,
                {
                    type: this.attachment.type,
                    lastModified: this.attachment.lastModified,
                },
            );
            detail.set("attachment", attachment);
        }
        this.$emit("submit", detail, { bubbles: false });
        this.clear();
        this.inputElement.focus();
    }

    /**
     * Clears the current user inputs.
     * @public
     */
    public clear() {
        this.setAttachmentPreview(null);
        this.inputElement.value = "";
        this.toggleLabelShownState();
        this.toggleComposingState();
    }

    /**
     * Navigates to the given view.
     * @param view - The view to go to.
     * @param disableAutoFocus - Whether to disable auto focus after
     *     navigating to a new view.
     * @public
     */
    public navigate(view: ComposerView, disableAutoFocus = false) {
        if (!COMPOSER_VIEWS.includes(view)) {
            return;
        }

        for (const composerView of COMPOSER_VIEWS) {
            toggleState(
                this.elementInternals,
                `viewing-${composerView}`,
                composerView === view,
            );
        }

        if (this.view === view) {
            return;
        }

        const previousView = this.view;
        this.view = view;

        if (previousView === ComposerView.HISTORY) {
            this.setHistoryActive(false);
        } else if (view === ComposerView.HISTORY) {
            this.setHistoryActive(true);
        }

        if (!disableAutoFocus) {
            this.autoFocusByView(view);
        }

        if (![ComposerView.HOME, ComposerView.COMPOSE].includes(view)) {
            toggleState(this.elementInternals, "input-focus", false);
        }

        this.$emit("navigate", { view }, { bubbles: false });
    }

    /**
     * Connects the component to voice interactions. This usually means the
     * user has given permission to use the device microphone, as well as the
     * user eligible to use voice interaction.
     * @public
     */
    public connectVoice() {
        this.isVoiceConnected = true;
        toggleState(this.elementInternals, "voice-connected", true);
    }

    /**
     * Informs the composer that Copilot’s voice volume is high enough and the
     * volume indicator should be maximized.
     * @param source - The source of the voice, should be either `copilot` or
     *     `user`.
     * @public
     */
    public voiceUp(source: ComposerVoiceSource) {
        if (!COMPOSER_VOICE_SOURCES.includes(source)) {
            return;
        }

        const state = `${source}-voice-up`;
        toggleState(this.elementInternals, state, true);
        requestAnimationFrame(() =>
            toggleState(this.elementInternals, state, false),
        );
    }

    /** @internal */
    public handleInputContainerClick(evt: MouseEvent | PointerEvent) {
        if (
            !this.disabled &&
            evt.target !== this.inputElement &&
            evt.target !== this.submitElement
        ) {
            this.inputElement?.focus();
        }
    }

    /** @internal */
    public handleInputFocus() {
        // Note: the `input-focus` state should not be removed on
        // `inputElement`’s `blur` event.
        // See detail in `handleToolbarFocusout()`.
        toggleState(this.elementInternals, "input-focus", true);
    }

    /** @internal */
    public handleToolbarFocusout(evt: FocusEvent) {
        if (
            (this.elementInternals.states.has("input-focus") &&
                this.shadowRoot?.contains(evt.relatedTarget as Node) &&
                evt.target === this.inputElement) ||
            this.showingPicker
        ) {
            // When the focus moved from the `<textarea>` to the add
            // attachment button, the `input-focus` state should be kept so
            // that the composer would remain expanded.
            return;
        }
        toggleState(this.elementInternals, "input-focus", false);
    }

    /** @internal */
    public handleInputInput() {
        if (
            !CSS.supports("field-sizing: content") &&
            this.inputElement.parentElement
        ) {
            this.inputElement.parentElement.dataset.message = this.message;
        }

        this.toggleComposingState();
        this.toggleLabelShownState();
    }

    /** @internal */
    public handleInputKeydown(evt: KeyboardEvent) {
        if (this.mode === "search" && evt.key === "Enter") {
            this.submit();
            return;
        }
        // TODO: Temporarily disable this since requiring Shift + Enter to add
        // line breaks make it harder to use when using mobile keyboards. Need
        // clear logic on when to turn this on.
        // if (evt.key === "Enter" && !evt.shiftKey) {
        //     evt.preventDefault();
        //     this.submit();
        // }
        return true;
    }

    /** @internal */
    public handleSubmitClick() {
        this.submit();
    }

    /** @internal */
    public handleAddAttachmentClick() {
        this.attachmentElement.showPicker();
        this.showingPicker = true;
    }

    /** @internal */
    public handleRemoveAttachmentClick() {
        this.setAttachmentPreview(null);
    }

    /** @internal */
    public handleAttachmentInput() {
        if (!this.hasAttachment || this.attachment) {
            this.setAttachmentPreview(this.attachment);
        }
        this.inputElement.focus();
        this.showingPicker = false;
    }

    /** @internal */
    public handleAttachmentCancel() {
        this.inputElement.focus();
        this.showingPicker = false;
    }

    /** @internal */
    public handleVoiceStartClick() {
        this.navigate(ComposerView.VOICE);
        this.$emit("voicestart", undefined, { bubbles: false });
    }

    /** @internal */
    public handleVoiceEndClick() {
        this.isVoiceConnected = false;
        toggleState(this.elementInternals, "voice-connected", false);
        this.$emit("voiceend", undefined, { bubbles: false });
        this.navigate(ComposerView.COMPOSE);
    }

    /** @internal */
    public handleVoiceMuteClick(evt: MouseEvent) {
        const target = evt.target as HTMLButtonElement;
        this.isVoiceMuted = !this.isVoiceMuted;
        toggleState(this.elementInternals, "voice-mute", this.isVoiceMuted);
        target.ariaPressed === this.isVoiceMuted.toString();
    }

    /** @internal */
    public handleVoiceSettingsClick() {
        this.isVoiceSetting = true;
        this.setVoiceSettingsActive(true);
        toggleState(this.elementInternals, "voice-settings", true);
    }

    /** @internal */
    public handleVoiceCloseSettingsClick() {
        this.isVoiceSetting = false;
        this.setVoiceSettingsActive(false);
        toggleState(this.elementInternals, "voice-settings", false);
        this.autoFocusByView(ComposerView.VOICE);
    }

    /** @internal */
    public handleHistoryClick(evt: MouseEvent) {
        const target = evt.target as HTMLButtonElement;

        if (!this.historyItems.includes(target)) {
            return;
        }

        // Temporarily disabled for clarification.
        // this.message = target?.textContent ?? "";
        // this.submit();

        this.navigate(ComposerView.COMPOSE);
    }

    /** @internal */
    public handleHistoryKeydown(evt: KeyboardEvent) {
        if (this.view !== ComposerView.HISTORY) {
            return;
        }

        const focusedIndex = this.focusedHistoryItem
            ? this.historyItems.indexOf(this.focusedHistoryItem)
            : 0;
        let nextFocusedItem!: HTMLButtonElement;

        const direction = (this.closest("[dir]") as HTMLElement)?.dir ?? "ltr";
        const altNextKey = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
        const altPrevKey = direction === "rtl" ? "ArrowRight" : "ArrowLeft";

        switch (evt.key) {
            case "ArrowDown":
            case altNextKey:
                if (focusedIndex >= this.historyItems.length) {
                    return true;
                }
                nextFocusedItem = this.historyItems[focusedIndex + 1];
                break;
            case "ArrowUp":
            case altPrevKey:
                if (focusedIndex === 0) {
                    return true;
                }
                nextFocusedItem = this.historyItems[focusedIndex - 1];
                break;
            case "Home":
                nextFocusedItem = this.historyItems[0];
                break;
            case "End":
                nextFocusedItem =
                    this.historyItems[this.historyItems.length - 1];
                break;
            default:
                return true;
        }

        if (!nextFocusedItem) {
            return;
        }

        nextFocusedItem.tabIndex = 0;
        nextFocusedItem.focus();

        if (this.focusedHistoryItem) {
            this.focusedHistoryItem.tabIndex = -1;
        }

        this.focusedHistoryItem = nextFocusedItem;
    }

    /** @internal */
    public handleVoiceSearchClick() {}

    /** @internal */
    public handleVisualSearchClick() {}

    private setAttachmentPreview(file: File | null) {
        const hasAttachment = file instanceof File;

        if (hasAttachment) {
            if (!this.attachmentPreviewImageElement) {
                this.attachmentPreviewImageElement =
                    document.createElement("img");
            }

            this.attachmentPreviewImageElement.src = URL.createObjectURL(file);
            this.attachmentPreviewImageElement.alt = file.name;
            this.attachmentPreviewImageElement.dataset.type = file.type;

            if (
                !this.attachmentPreviewElement.contains(
                    this.attachmentPreviewImageElement,
                )
            ) {
                this.attachmentPreviewElement.append(
                    this.attachmentPreviewImageElement,
                );
            }
        } else {
            this.attachmentPreviewImageElement?.remove();
            this.attachmentElement.value = "";
        }

        this.toggleComposingState();
        this.attachmentPreviewElement.ariaHidden = `${!hasAttachment}`;
        this.hasAttachment = hasAttachment;
        this.toggleHasAttachmentState();
    }

    private toggleComposingState() {
        const hasValue = !!this.message || !!this.attachment;
        const isComposing = hasValue && this.mode !== "search";

        toggleState(this.elementInternals, "composing", isComposing);
        this.isComposing = isComposing;
    }

    private toggleLabelShownState() {
        toggleState(
            this.elementInternals,
            "label-shown",
            !this.message && !this.disabled,
        );
    }

    private toggleHasAttachmentState() {
        toggleState(
            this.elementInternals,
            "has-attachment",
            this.hasAttachment,
        );
    }

    private autoFocusByView(view: ComposerView) {
        let focusableElement: HTMLElement | null = null;
        if (
            [ComposerView.COMPOSE, ComposerView.HOME].includes(view) &&
            !this.disabled
        ) {
            focusableElement = this.inputElement;
        } else if (view === ComposerView.HISTORY) {
            this.historyItems?.[0]?.focus();
        } else {
            const firstElementInView = this.shadowRoot?.querySelector(
                `.in-view-${view}`,
            ) as HTMLElement;
            if (firstElementInView?.tabIndex >= 0) {
                focusableElement = firstElementInView;
            }
        }
        if (focusableElement) {
            requestAnimationFrame(() => focusableElement.focus());
        }
    }

    private setHistoryActive(active = true) {
        if (active) {
            this.historyElement.scrollTop = 0;
            if (this.historyItems.length) {
                this.historyItems[0].tabIndex = 0;
                this.historyItems[0].focus({ preventScroll: true });
                this.focusedHistoryItem = this.historyItems[0];
            }
        } else {
            this.historyItems.forEach(node => {
                node.tabIndex = -1;
            });
            this.focusedHistoryItem = undefined;
        }
    }

    private setVoiceSettingsActive(active = true) {
        this.slottedVoiceSettingNodes.forEach(node => {
            node.tabIndex = active ? 0 : -1;
        });
    }
}
