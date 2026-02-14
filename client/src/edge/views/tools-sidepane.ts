import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '../controls/sidepane-header.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#services/edgeWindowService.js';
import { backgroundLayerSecondary } from '@mai-ui/design-tokens/tokens.js';

const template = html<ToolsSidepane>`<sidepane-header
  @close="${(x) => x.handleClose()}"
>
  Tools
</sidepane-header>`;

const styles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: ${backgroundLayerSecondary};
  }
`;

@customElement({ name: 'tools-sidepane', template, styles })
export class ToolsSidepane extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  handleClose(): void {
    this.ews.closeSidepaneApp();
  }
}
