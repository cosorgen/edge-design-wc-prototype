/**
 * This file generates JSON files containing all kumo light and dark tokens.
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { UNSAFE_getDesignTokensMap } from "@mai-ui/design-tokens-service";

import ctrlKumoLight from "../data/kumo.light.json" assert { type: "json" };
import ctrlKumoDark from "../data/kumo.dark.json" assert { type: "json" };

import ctrlKumoLightPreviousTokens from "../src/design-tokens.ctrl.kumo.light.json" assert { type: "json" };
import ctrlKumoDarkPreviousTokens from "../src/design-tokens.ctrl.kumo.dark.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../");

function writeDesignTokensMap() {
    const designTokensLightMap = UNSAFE_getDesignTokensMap(
        ctrlKumoLight,
        "ctrl",
        // ctrlKumoLightPreviousTokens, // TODO: replace with below empty object when components have been migrated
        {},
        {
            optimizeName: true
        }
    );

    fs.writeFileSync(
        path.resolve(__dirname, `./src/design-tokens.ctrl.kumo.light.json`),
        JSON.stringify(designTokensLightMap, null, 2),
        { type: "utf-8" }
    );

    const designTokensDarkMap = UNSAFE_getDesignTokensMap(
        ctrlKumoDark,
        "ctrl",
        // ctrlKumoDarkPreviousTokens, // TODO: replace with below empty object when components have been migrated
        {},
        {
            optimizeName: true
        }
    );

    fs.writeFileSync(
        path.resolve(__dirname, `./src/design-tokens.ctrl.kumo.dark.json`),
        JSON.stringify(designTokensDarkMap, null, 2),
        { type: "utf-8" }
    );
}

writeDesignTokensMap();
