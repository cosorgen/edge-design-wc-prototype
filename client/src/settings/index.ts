import { css, html, FASTElement, customElement } from '@microsoft/fast-element';
import { spacingHorizontalL, typographyStyles } from '@phoenixui/themes';
import '../windows/controls/mica-material.js';
import '@phoenixui/web-components/button.js';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '../windows/designSystem.js';

const template = html<WindowsSettings>`
  <mica-material></mica-material>
  <div id="content">
    <nav>
      <h1>Settings</h1>
      <div id="caption">
        <phx-button size="large" shape="square" appearance="subtle" icon-only>
            <svg>
                <use x="2" y="2" href="./img/edge/icons.svg#chrome-minimize-20-regular" />
            </svg>
        </phx-button>
      <phx-button size="large" shape="square" appearance="subtle" icon-only>
            <svg>
                <use x="2" y="2" href="./img/edge/icons.svg#chrome-maximize-20-regular" />
            </svg>
        </phx-button>  
      <phx-button size="large" shape="square" appearance="subtle" icon-only id="close">
            <svg>
                <use x="2" y="2" href="./img/edge/icons.svg#chrome-close-20-regular" />
            </svg>
        </phx-button>
    </nav>
</div>
`;

const styles = css`
  #content {
    position: absolute;
    inset: 0;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: ${spacingHorizontalL};
  }

  h1 {
    font-family: ${typographyStyles.subtitle2.fontFamily};
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
    margin: 0;
  }

  #close:hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #close:active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
  }
`;

@customElement({ name: 'windows-settings', template, styles })
export class WindowsSettings extends FASTElement {}
