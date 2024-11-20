import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { expect, test } from "@mai-ui/test-harness";
import { ButtonAppearance, ButtonSize } from "./button.options.js";

test.describe("Button", () => {
    test.use({
        innerHTML: "Hello, World!",
        tagName: `${ComponentDesignSystem.prefix}-button`,
    });

    test("should render a button on the page", async ({ fastPage }) => {
        await expect(fastPage.element).toBeVisible();
    });

    test("should apply the `icon` state when the `icon-only` attribute is set", async ({
        fastPage,
    }) => {
        await fastPage.setTemplate({ attributes: { "icon-only": true } });

        await expect(fastPage.element).toHaveState("icon");
    });

    for (const size in ButtonSize) {
        test(`should apply the \`${size}\` state when the \`size\` attribute is set to \`${size}\``, async ({
            fastPage,
        }) => {
            await fastPage.setTemplate({ attributes: { size } });

            await expect(fastPage.element).toHaveState(size);
        });
    }

    for (const appearance in ButtonAppearance) {
        test(`should apply the "${appearance}" state when the \`appearance\` attribute is set to \`${appearance}\``, async ({
            fastPage,
        }) => {
            await fastPage.setTemplate({ attributes: { appearance } });

            await expect(fastPage.element).toHaveState(appearance);
        });
    }
});
