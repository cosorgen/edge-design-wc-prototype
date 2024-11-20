import type { ValuesOf } from "@fluentui/web-components/utilities.js";

/**
 * An example Composer option
 * @public
 */
export const ComposerOption = {};

/**
 * An example ComposerOption type
 * @public
 */
export type ComposerOption = ValuesOf<typeof ComposerOption>;

/**
 * The valid composer views.
 * @public
 */
export enum ComposerView {
    HOME = "home",
    COMPOSE = "compose",
    HISTORY = "history",
    VOICE = "voice",
}
export const COMPOSER_VIEWS = Array.from(Object.values(ComposerView));

/**
 * The voice source.
 * @public
 */
export enum ComposerVoiceSource {
    COPILOT = "copilot",
    USER = "user",
}
export const COMPOSER_VOICE_SOURCES = Array.from(
    Object.values(ComposerVoiceSource),
);
