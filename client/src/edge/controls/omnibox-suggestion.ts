import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';

const template = html<OmniboxSuggestion>` ${(x) => x.title} `;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
  }
`;

@customElement({
  name: 'omnibox-suggestion',
  template,
  styles,
})
export class OmniboxSuggestion extends FASTElement {
  @attr title = '';
  @attr value = '';
}
