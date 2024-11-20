import {
    type Meta,
    type StoryArgs,
    type StoryObj,
    renderComponent,
} from "@mai-ui/storybook";
import { html } from "@microsoft/fast-element";
import { definition } from "./composer.definition.js";
import type { Composer } from "./composer.js";

type Story = StoryObj<Composer>;

function simulateVoiceConnect(evt: Event) {
    setTimeout(() => {
        (evt.target as Composer).connectVoice();
    }, 1000);
}

const storyTemplate = html<StoryArgs<Composer>>`
    <style>
        .container {
            background-color: #f8f4f2;
            padding: 4rem 2rem;
        }
        .container.darkTheme {
            background-color: #101524;
        }
        mai-composer {
            margin: auto;
        }
        mai-composer:state(search-mode) {
            inline-size: 80%;
        }
    </style>
    <div class="container${x => (x.darkMode ? " darkTheme" : "")}">
        <mai-composer
            mode="${story => story.mode}"
            label-input="${x => x.labelInput}"
            ?disabled="${story => story.disabled}"
            @voicestart="${(_, c) => simulateVoiceConnect(c.event as Event)}"
        >
            <h3 slot="history-heading">Our conversations together</h3>
            <h4 slot="history">Today</h4>
            <button slot="history">Lorem ipsum dolor sit amet, consectetur adipiscing elit</button>
            <button slot="history">Duis pretium ligula vel eleifend malesuada.</button>
            <h4 slot="history">Yesterday</h4>
            <button slot="history">In sollicitudin sapien eget eleifend blandit.</button>
            <button slot="history">Sed vitae ante ac lectus mattis tincidunt.</button>
            <h4 slot="history">Wednesday</h4>
            <button slot="history">Aliquam vulputate metus quis cursus accumsan.</button>
            <button slot="history">Cras malesuada nulla sit amet tortor feugiat, ac mattis massa laoreet.</button>
            <h4 slot="history">Fri, Sep 13</h4>
            <button slot="history">Nunc tristique urna non dolor tempus posuere.</button>
            <button slot="history">In lobortis risus a quam vulputate vulputate.</button>
            <button slot="history">Cras aliquet sem a nisi mollis aliquet.</button>

            <button slot="voice-setting" aria-pressed="true">Grove</button>
            <button slot="voice-setting">Wave</button>
            <button slot="voice-setting">Meadow</button>
            <button slot="voice-setting">Canyon</button>
        </mai-composer>
    </div>
`;

export default {
    title: "Copilot/Composer",
    component: definition.name,
    render: renderComponent(storyTemplate),
    argTypes: {
        disabled: {
            type: "boolean",
        },
        mode: {
            type: "string",
            control: "select",
            options: ["copilot", "search"],
        },
        slottedContent: {
            control: false,
            description: "The default slot",
            table: { category: "slots", type: {} },
        },
        darkMode: {
            type: "boolean",
            table: { disable: true },
        },
    },
} as Meta<Composer>;

export const Default: Story = {
    args: {
        disabled: false,
        mode: "copilot",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        mode: "copilot",
    },
};

export const DarkMode: Story = {
    args: {
        darkMode: true,
        mode: "copilot",
    },
};

export const SearchMode: Story = {
    args: {
        mode: "search",
        labelInput: "Ask me anything…",
    },
};

export const SearchModeInDark: Story = {
    args: {
        mode: "search",
        labelInput: "Ask me anything…",
        darkMode: true,
    },
};
