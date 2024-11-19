import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import { borderRadiusLayerBase, shadow2 } from '@phoenixui/themes';
import apps from '../installedApps.js';

const template = html<SidePane>`${(x) => apps[x.id].template}`;

const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 376px;
    max-width: 376px;
    border-radius: ${borderRadiusLayerBase};
    overflow: hidden;
    box-shadow: ${shadow2};
  }
`;

@customElement({
  name: 'side-pane',
  template,
  styles,
})
export class SidePane extends FASTElement {
  @attr id: string = '';
}
