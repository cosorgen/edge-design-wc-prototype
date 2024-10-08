import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
  ViewTemplate,
} from '@microsoft/fast-element';
import './copilot-sidepane.js';
import {
  borderRadiusLayerBase,
  colorLayerBackgroundDialog,
  shadow2,
} from '@phoenixui/themes';

const appsById: Record<string, ViewTemplate> = {
  copilot: html`<copilot-sidepane></copilot-sidepane>`,
};

const template = html<SidePane>`${(x) => appsById[x.appId]}`;

const styles = css`
  :host {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - 36px);
    min-width: 376px;
    max-width: 376px;
    background: ${colorLayerBackgroundDialog};
    border-radius: ${borderRadiusLayerBase};
    box-shadow: ${shadow2};
    overflow: hidden;
    margin-block-start: 36px;
  }
`;

@customElement({
  name: 'side-pane',
  template,
  styles,
})
export class SidePane extends FASTElement {
  @attr({ attribute: 'app-id' }) appId = '';
}
