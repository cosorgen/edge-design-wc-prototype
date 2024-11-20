/**
 * This script generates an index file for each component with variables that can be used
 * in css tag template literals (or any other .ts or .js file).
 */
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../");

function getCSSVar(name, fallback, prefix) {
    return `var(--${prefix ? `${prefix}-` : ""}${name}${fallback ? `, ${fallback}` : ""})`;
}

function getExportConst(dependency) {
    const startCSSString = `export const ${dependency.name} = "`;
    const endCSSString = `";\n`;
    let commentString = "";

    if (dependency.$comment) {
        commentString = `// ${dependency.$comment}\n`
    }

    if (dependency.smtc) {
        if (dependency.ctrl) {
            return `${commentString}${startCSSString}${getCSSVar(dependency.smtc, getCSSVar(dependency.smtc, getCSSVar(dependency.f2), "smtc"), "ctrl")}${endCSSString}`;
        } else {
            return `${commentString}${startCSSString}${getCSSVar(dependency.smtc, getCSSVar(dependency.f2), "smtc")}${endCSSString}`;
        }
    } else {
        return `${commentString}${startCSSString}${getCSSVar(dependency.f2)}${endCSSString}`;
    }
}

function getExportCSS(dependency) {
    const startCSSString = `export const ${dependency.name}Css = "`;
    const endCSSString = `";\n`;

    return `${startCSSString}--smtc-${dependency.smtc}: ${dependency.smtc_css}${endCSSString}`;
}

async function writeTSFiles() {
    const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);

    const components = getDirectories(path.resolve(__dirname, "./src"));

    components.map(async (component) => {
        try {
            const dependencies = await import(`../src/${component}/dependencies.json`, {
                assert: { type: 'json' }
            });

            if (dependencies) {
                let content = "";
                const names = [];

                dependencies.default.forEach((dependency) => {
                    let name = dependency.name;

                    if (names.includes(name)) {
                        const err = new Error(`The name ${name} has already been used.`);
                        console.error(err);
                        throw err;
                    }

                    content += getExportConst(dependency);

                    if (dependency.smtc_css) {
                        content += getExportCSS(dependency);
                    }

                    names.push(name);
                });

                fs.writeFileSync(
                    path.resolve(__dirname, `./src/${component}/index.ts`),
                    content,
                    { type: "utf-8" }
                );
            }
        } catch (e) {
            // do nothing
        }
    });
}

writeTSFiles();
