import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import '../views//sidepanes/copilot-sidepane.js';
import apps from '../installedApps.js';
import {
  cornerLayerDefault,
  paddingWindowDefault,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<SidePane>`${(x) => apps[x.id].template}`;

const styles = css`
  :host {
    --tab-bar-height:  /* height of a button + gap */ calc(
      32px + ${paddingWindowDefault}
    );
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - var(--tab-bar-height));
    min-width: 376px;
    max-width: 376px;
    border-radius: ${cornerLayerDefault};
    overflow: hidden;
    margin-block-start: var(--tab-bar-height);
  }
`;

@customElement({ name: 'side-pane', template, styles })
export class SidePane extends FASTElement {
  @attr id: string = '';
}
