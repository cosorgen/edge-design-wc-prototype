import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  colorNeutralForegroundHint,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
} from '@phoenixui/themes';

const template = html<OmniboxInput>`
  <div
    part="input"
    contenteditable
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    placeholder="Search or enter web address"
    @keyup="${(x, c) => x.handleKeyUp(c.event as KeyboardEvent)}"
    @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
    @blur="${(x) => x.handleBlur()}"
    @focus="${(x) => x.handleFocus()}"
    role="searchbox"
    aria-label="Address and search bar"
  ></div>
`;

const styles = css`
  :host {
    flex: 1;
  }

  [part='input'] {
    width: 100%;
    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    cursor: text;
    outline: none;

    &:empty::before {
      content: attr(placeholder);
      color: ${colorNeutralForegroundHint};
    }
  }

  .metadata {
    color: ${colorNeutralForegroundHint};
  }
`;

@customElement({
  name: 'omnibox-input',
  template,
  styles,
})
export class OmniboxInput extends FASTElement {
  @attr initialValue: string = '';
  input?: HTMLDivElement | null;

  connectedCallback(): void {
    super.connectedCallback();
    this.input = this.shadowRoot?.querySelector('[part="input"]');

    if (this.input) {
      this.input.innerText = this.initialValue;
      this.input.focus(); // Focus the input when it's created.
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    // Register input if it's not already registered.
    if (!this.input) {
      this.input = event.target as HTMLDivElement;
    }

    // Alert parent component that the input has changed.
    this.$emit('onChange', this.input?.innerText);

    // Save the caret position.
    const selection = this.saveSelection(this.input);

    // Format the input text.
    this.input.innerHTML = this.formatUrl(this.input.innerText);

    // Restore the caret position.
    this.restoreSelection(this.input, selection);

    return true; // Allow default behavior.
  }

  handleKeyDown(event: KeyboardEvent) {
    // Register input if it's not already registered.
    if (!this.input) {
      this.input = event.target as HTMLDivElement;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      this.$emit('onSubmit', this.input?.innerText);
      this.input?.blur();
    }
    if (event.key === 'Escape') {
      this.input?.blur();
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.$emit('onArrowUp');
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.$emit('onArrowDown');
    }

    return true; // Allow default behavior.
  }

  handleBlur() {
    this.disselectAll();
    return true; // Allow default behavior.
  }

  handleFocus() {
    this.selectAll(this.input as HTMLElement);
    return true; // Allow default behavior.
  }

  selectAll(el: HTMLElement) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  disselectAll() {
    const sel = window.getSelection();
    sel?.removeAllRanges();
  }

  recursiveFindTextNodes(
    startNode: Node,
    onTextFound: (textNode: Text) => void,
  ) {
    let curNode = startNode.firstChild;
    while (curNode) {
      if (curNode.nodeType === Node.TEXT_NODE) {
        onTextFound(curNode as Text);
      } else {
        this.recursiveFindTextNodes(curNode, onTextFound);
      }

      curNode = curNode.nextSibling;
    }
  }

  formatUrl(htmlString: string) {
    // Clear previous formatting.
    let cleanHtml = htmlString.replace(
      /(?:<span class="metadata">)(.*?)(?:<\/span>)/g,
      '$1',
    );

    // Not sure how these get in there??? But they do.
    cleanHtml = cleanHtml.replace(/<br>/g, '');
    cleanHtml = cleanHtml.replace(
      /<font(?:.*)>(.*)<\/font>/g,
      (match, p1) => p1,
    );

    // If string has a whitespace it's not a url
    if (/\s/.test(cleanHtml)) return cleanHtml;

    // Format new string.
    return cleanHtml.replace(
      /^((?:http[s]?|ftp|file|edge)(?::\/\/))?([^/:?]*)(.*)?$/,
      (match, p1, p2, p3) => {
        // p2 is the main text.
        let output = p2;

        // p1 is the protocol prefix.
        if (p1) output = `<span class="metadata">${p1}</span>${output}`;

        // p3 is any port/path/variables
        if (p3) output = `${output}<span class="metadata">${p3}</span>`;

        return output;
      },
    );
  }

  absoluteCharacterOffsetFromOffsetAndContainer(
    startNode: Node,
    container?: Node | null,
    offset?: number,
  ) {
    let found = false;
    let absOffset = 0;
    this.recursiveFindTextNodes(startNode, (textNode) => {
      if (!found) {
        if (textNode === container) {
          absOffset += offset || 0;
          found = true;
        } else {
          absOffset += textNode.length;
        }
      }
    });
    return absOffset;
  }

  absoluteCharacterOffsetToOffsetAndContainer = (
    startNode: Node,
    absOffset: number,
  ) => {
    let found = false;
    let offset = 0;
    let container = startNode;
    this.recursiveFindTextNodes(startNode, (textNode) => {
      if (!found) {
        if (offset + textNode.length >= absOffset) {
          offset = absOffset - offset;
          container = textNode;
          found = true;
        } else {
          offset += textNode.length;
        }
      }
    });

    return {
      container,
      offset,
    };
  };

  saveSelection(el: HTMLElement) {
    // getSelection on shadowRoot only works in Edge/Chrome
    // @ts-expect-error: getSelection is not defined on shadowRoot.
    const range = this.shadowRoot?.getSelection()?.getRangeAt(0);
    const startOffset = this.absoluteCharacterOffsetFromOffsetAndContainer(
      el,
      range?.startContainer,
      range?.startOffset,
    );
    const endOffset = this.absoluteCharacterOffsetFromOffsetAndContainer(
      el,
      range?.endContainer,
      range?.endOffset,
    );
    return {
      startOffset,
      endOffset,
    };
  }

  restoreSelection(
    el: HTMLElement = this.input as HTMLElement,
    { startOffset, endOffset }: { startOffset: number; endOffset: number },
  ) {
    if (startOffset && endOffset) {
      // getSelection on shadowRoot only works in Edge/Chrome
      // @ts-expect-error: getSelection is not defined on shadowRoot.
      const sel = this.shadowRoot?.getSelection();
      const range = document.createRange();
      const startData = this.absoluteCharacterOffsetToOffsetAndContainer(
        el,
        startOffset,
      );
      range.setStart(startData.container, startData.offset);
      const endData = this.absoluteCharacterOffsetToOffsetAndContainer(
        el,
        endOffset,
      );
      range.setEnd(endData.container, endData.offset);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }
}
