/**
 * This script generates a CSS file.
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { UNSAFE_getDesignTokensCSS } from "@mai-ui/design-tokens-service";

import ctrlKumoLightTokens from "../src/design-tokens.ctrl.kumo.light.json" assert { type: "json" };
import ctrlKumoDarkTokens from "../src/design-tokens.ctrl.kumo.dark.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../");

const lightWrapper = function(content) {
    return `:root {${content}}`;
}

const darkWrapper = function(content) {
    return `.darkTheme {${content}}`;
}

function writeCSSFiles() {
    fs.writeFileSync(
        path.resolve(__dirname, `./src/ctrl.kumo.light.css`),
        lightWrapper(UNSAFE_getDesignTokensCSS(ctrlKumoLightTokens)),
        { type: "utf-8" }
    );

    fs.writeFileSync(
        path.resolve(__dirname, `./src/ctrl.kumo.dark.css`),
        darkWrapper(UNSAFE_getDesignTokensCSS(ctrlKumoDarkTokens)),
        { type: "utf-8" }
    );
}

writeCSSFiles();