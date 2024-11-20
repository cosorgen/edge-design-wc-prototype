import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { expect, test } from "@mai-ui/test-harness";
import { ComposerOption } from "./composer.options.js";

test.describe("Composer", () => {
    test.use({
        innerHTML: "Hello, World!",
        tagName: `${ComponentDesignSystem.prefix}-composer`,
    });

    test("should render a Composer element on the page", async ({
        fastPage,
    }) => {
        await expect(fastPage.element).toBeVisible();
    });
});
