import { css, html, FASTElement, customElement } from '@microsoft/fast-element';
import '../views/copilot-sidepane.js';
import {
  borderRadiusLayerBase,
  colorLayerBackgroundDialog,
  shadow2,
} from '@phoenixui/themes';
import { spacingFrame } from '../designSystem.js';
import apps from '../installedApps.js';

const template = html<SidePane>`${(x) => apps[x.id].template}`;

const styles = css`
  :host {
    --tab-bar-height:  /* height of a button + gap */ calc(
      32px + ${spacingFrame}
    );
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - var(--tab-bar-height));
    min-width: 376px;
    max-width: 376px;
    background: ${colorLayerBackgroundDialog};
    border-radius: ${borderRadiusLayerBase};
    box-shadow: ${shadow2};
    overflow: hidden;
    margin-block-start: var(--tab-bar-height);
  }
`;

@customElement({
  name: 'side-pane',
  template,
  styles,
})
export class SidePane extends FASTElement {}
