import {
  html,
  css,
  FASTElement,
  customElement,
  attr,
  Observable,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  colorScrollbarForeground,
  curveEasyEaseMax,
  durationNormal,
  durationUltraSlow,
  shadow28,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingVerticalM,
  spacingVerticalXS,
  spacingVerticalXXL,
  strokeWidthThin,
  typographyStyles,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/copilot-chat-entry.js';
import { CopilotChatEntry } from '../controls/copilot-chat-entry.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';
import { TabService } from '#servicestabService.js';

const template = html<CopilotComposer>`
  <copilot-design-provider>
    <div id="chat">
      <copilot-chat-entry id="test" system></copilot-chat-entry>
    </div>
    <div id="input-row">
      <div id="start">
        <phx-button appearance="subtle" size="large" icon-only>
          <img src="img/edge/copilot-icon.svg" />
        </phx-button>
      </div>
      <div id="input-wrapper">
        <div
          contenteditable
          placeholder="${(x) => x.placeholder}"
          @keydown="${(x, c) => x.handleKeydown(c.event)}"
          @keyup="${(x, c) => x.handleKeyUp(c.event)}"
        ></div>
        <phx-button
          appearance="primary"
          size="large"
          @click="${(x) => x.handleSubmit()}"
          icon-only
          id="send"
        >
          <svg>
            <use href="img/edge/icons.svg#arrow-up-24-regular" />
          </svg>
        </phx-button>
      </div>
      <div id="end">
        <phx-button appearance="subtle" size="large" icon-only slot="end">
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#add-24-regular" />
          </svg>
        </phx-button>
        <phx-button appearance="subtle" size="large" icon-only slot="end">
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#mic-new-24-regular" />
          </svg>
        </phx-button>
        <phx-button
          appearance="subtle"
          size="large"
          icon-only
          slot="end"
          @click="${(x) => x.handleClose()}"
        >
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#dismiss-24-regular" />
          </svg>
        </phx-button>
      </div>
    </div>
  </copilot-design-provider>
`;

const styles = css`
  copilot-design-provider {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    border-radius: 28px;
    box-shadow: ${shadow28};
    overflow: hidden;

    color: ${colorNeutralForeground1};
    font-weight: ${typographyStyles.body2.fontWeight};
    font-family: ${typographyStyles.body2.fontFamily};
    font-size: ${typographyStyles.body2.fontSize};
    line-height: ${typographyStyles.body2.lineHeight};
  }

  #input-row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
  }

  #chat {
    height: 0px;
    transition: height ${durationUltraSlow} ${curveEasyEaseMax};
  }

  #chat:not(:empty) {
    padding: ${spacingVerticalXXL};
    padding-block-end: 0;
    display: flex;
    flex-direction: column;
    height: fit-content;
    max-height: 50vh;
    overflow: hidden auto;
    scrollbar-color: ${colorScrollbarForeground} transparent;
    scrollbar-width: thin;
  }

  #input-wrapper {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
  }

  #send {
    position: absolute;
    right: 6px;
    bottom: 6px;
    border-radius: 14px;
    color: ${colorNeutralForeground1};

    display: none;
    transform: translateY(8px);
    opacity: 0;
    transition:
      transform ${durationNormal} ${curveEasyEaseMax},
      opacity ${durationNormal} ${curveEasyEaseMax},
      display ${durationNormal} ${curveEasyEaseMax} allow-discrete;
  }

  [contenteditable]:not(:empty) + #send {
    display: inline-flex; /* reset display */
    transform: translateY(0);
    opacity: 1;
  }

  [contenteditable] {
    flex: 1;
    box-sizing: border-box;
    min-width: 206px;
    border: none;
    background: ${colorLayerBackgroundDialog};
    border-radius: 20px;
    padding-block: ${spacingVerticalM};
    padding-inline-start: ${spacingHorizontalXL};
    padding-inline-end: 64px;
    box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.03);

    font-size: 18px;
    line-height: 26px;
    color: ${colorNeutralForeground1};

    &:empty::before {
      content: attr(placeholder);
      color: ${colorNeutralForegroundHint};
    }
  }

  [contenteditable]:focus {
    outline: none;
  }

  #start,
  #end {
    display: flex;
    flex-direction: row;
    padding-block: ${spacingVerticalXS};
  }

  @starting-style {
    [contenteditable]:not(:empty) + #send {
      transform: translateY(8px);
      opacity: 0;
    }
  }
`;

@customElement({
  name: 'copilot-composer',
  template,
  styles,
})
export class CopilotComposer extends FASTElement {
  @inject(CopilotService) cs!: CopilotService;
  @inject(TabService) ts!: TabService;
  @attr placeholder = 'Message Copilot';
  _inputElement: HTMLInputElement | null = null;
  _chatElement: HTMLElement | null = null;
  _threadId?: string;
  _updateInterval?: NodeJS.Timeout;
  _lockChatScroll = true;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();

    const chatEl = this.shadowRoot?.querySelector(
      'copilot-chat-entry',
    ) as CopilotChatEntry;
    if (chatEl) {
      chatEl.timestamp = Date.now();
      chatEl.message =
        'Showdown is a Javascript Markdown to HTML converter,based on the original works by John Gruber.It can be used client side(in the browser)or server side(with Node or io).# Installation\n## Download tarball\nYou can download the latest release tarball directly from[releases][releases]\n## Bower\nbower install showdown\n## npm(server-side)\nnpm install showdown\n## CDN\nYou can also use one of several CDNs available:*rawgit CDN\nhttps:*cdnjs\nhttps:[sd-logo]:https:[releases]:https:[atx]:http:[setext]:https:---------\n# Syntax\n## Table of contents-[Introduction](#introduction)-[Paragraphs](#paragraphs)-[Headings](#headings)*[Atx Style](#atx-style)*[Setext style](#setext-style)*[Header IDs](#header-ids)-[Blockquotes](#blockquotes)-[Bold and Italic](#bold-and-italic)-[Strikethrough](#strikethrough)-[Emojis](#emojis)-[Code formatting](#code-formatting)*[Inline formats](#inline-formats)*[Multiple lines](#multiple-lines)-[Lists](#lists)*[Unordered lists](#unordered-lists)*[Ordered lists](#ordered-lists)*[TaskLists(GFM Style)](#tasklists--gfm-style-)*[List syntax](#list-syntax)*[Nested blocks](#nested-blocks)*[Nested lists](#nested-lists)*[Nested code blocks](#nested-code-blocks)-[Links](#links)*[Simple](#simple)*[Inline](#inline)*[Reference Style](#reference-style)-[Images](#images)*[Inline](#inline-1)*[Reference Style](#reference-style-1)*[Image dimensions](#image-dimensions)*[Base64 encoded images](#base64-encoded-images)-[Tables](#tables)-[Mentions](#mentions)-[Handling HTML in markdown documents](#handling-html-in-markdown-documents)-[Escaping entities](#escaping-entities)*[Escaping markdown entities](#escaping-markdown-entities)*[Escaping html tags](#escaping-html-tags)-[Known differences and Gotchas](#known-differences-and-gotchas)\n## Introduction\nShowdown was created by John Fraser as a direct port of the original parser written by markdown\'s creator, John Gruber. Although Showdown has evolved since its inception, in "vanilla mode", it tries to follow the [original markdown spec][md-spec] (henceforth refereed as vanilla) as much as possible. There are, however, a few important differences, mainly due to inconsistencies in the original spec, which we addressed following the author\'s advice as stated in the[markdown\'s "official" newsletter][md-newsletter].\n\nShowdown also support "extra" syntax not defined in the original spec as opt-in features. This means new syntax elements are not enabled by default and require users to enable them through options.\n\nThis document provides a quick description the syntax supported and the differences in output from the original markdown.pl implementation.\n\n## Paragraphs\n\nParagraphs in Showdown are just **one or more lines of consecutive text** followed by one or more blank lines.\n\n```md\nOn July 2, an alien mothership entered Earth\'s orbit and deployed several dozen\nsaucer-shaped "destroyer" spacecraft,each 15 miles(24 km)wide.On July 3,the Black Knights,a squadron of Marine Corps F/A-18 Hornets,participated in an assault on a destroyer near the city of Los Angeles.```\n\nThe implication of the “one or more consecutive lines of text” is that Showdown supports \n“hard-wrapped” text paragraphs. This means the following examples produce the same output:\n\n```md\nA very long line of text\n```\n\n```md\nA very\nlong line\nof text\n```\n\nIf you DO want to add soft line breaks (which translate to `<br>` in HTML) to a paragraph, \nyou can do so by adding 3 space characters to the end of the line (` `).\n\nYou can also force every line break in paragraphs to translate to `<br>` (as Github does) by\nenabling the option **`simpleLineBreaks`**.\n\n## Headings\n\n### Atx Style\n\nYou can create a heading by adding one or more # symbols before your heading text. The number of # you use will determine the size of the heading. This is similar to [**atx style**][atx].\n\n```md\n# The largest heading(an<h1>tag)\n## The second largest heading(an<h2>tag)\n…\n###### The 6th largest heading(an<h6>tag)\n```\n\nThe space between `#` and the heading text is not required but you can make that space mandatory by enabling the option **`requireSpaceBeforeHeadingText`**.\n\nYou can wrap the headings in `#`. Both leading and trailing `#` will be removed.\n\n```md\n## My Heading ##\n```\n\nIf, for some reason, you need to keep a leading or trailing `#`, you can either add a space or escape it:\n\n```md\n# # My header # #\n## My Header # #\n```\n\n### Setext style\n\nYou can also use [**setext style**][setext] headings, although only two levels are available.\n\n```md\nThis is an H1=============This is an H2\n-------------\n```\n\n**Note:**    \nIn live preview editors, when a paragraph is followed by a list it can cause an awkward effect.\n\n![awkward effect][]\n\nYou can prevent this by enabling the option **`smoothPreview`**.\n\n### Header IDs\n\nShowdown generates bookmarks anchors in titles automatically, by adding an id property to an heading.\n\n```md\n# My cool header with ID\n```\n\n```html<h1 id="mycoolheaderwithid">My cool header with ID</h1>```\n\nThis behavior can be modified with options:\n\n - **`noHeaderId`** disables automatic id generation; \n - **`ghCompatibleHeaderId`** generates header ids compatible with github style (spaces are replaced with dashes and a bunch of non alphanumeric chars are removed)\n - **`prefixHeaderId`** adds a prefix to the generated header ids (either automatic or custom).\n - **`headerLevelStart`** sets the header starting level. For instance, setting this to 3 means that `# header` will be converted to `<h3>`.\n\nRead the [README.md][readme] for more info\n\n## Blockquotes\n\nYou can indicate blockquotes with a >.\n\n```md\nIn the words of Abraham Lincoln:>Pardon my french\n```\n\nBlockquotes can have multiple paragraphs and can have other block elements inside.\n\n```md>A paragraph of text>>Another paragraph>>-A list>-with items\n```\n\n## Bold and Italic\n\nYou can make text bold or italic.\n\n    *This text will be italic*\n    **This text will be bold**\n\nBoth bold and italic can use either a * or an _ around the text for styling. This allows you to combine both bold and italic if needed.\n\n    **Everyone _must_ attend the meeting at 5 o\'clock today.**\n\n## Strikethrough\n\nWith the option **`strikethrough`** enabled, Showdown supports strikethrough elements.\nThe syntax is the same as GFM, that is, by adding two tilde (`~~`) characters around\na word or groups of words.\n\n```md\na~~strikethrough~~element\n```\n\na ~~strikethrough~~ element\n\n## Emojis\n\nSince version 1.8.0, showdown supports github\'s emojis. A complete list of available emojis can be foun [here][emoji list].\n\n```md\nthis is a:smile:smile emoji\n```\n\nthis is a :smile: smile emoji\n\n## Code formatting\n\n### Inline formats\n\nUse single backticks (`)to format text in a special monospace format.Everything within the backticks appear as-is,with no other special formatting.```md\nHere\'s an idea: why don\'t we take `SuperiorProject` and turn it into `**Reasonable**Project`.\n```\n```html\n<p>Here\'s an idea: why don\'t we take <code>SuperiorProject</code> and turn it into <code>**Reasonable**Project</code>.</p>\n```\n### Multiple lines\nTo create blocks of code you should indent it by four spaces.```md\n    this is a piece\n    of\n    code\n```\nIf the options**`ghCodeBlocks`**is activated(which is by default),you can use triple backticks(```) to format text as its own distinct block.\n\n    Check out this neat program I wrote:\n\n    ```\nx=0\nx=2+2\nwhat is x\n```\n\n## Lists\n\nShowdown supports ordered (numbered) and unordered (bulleted) lists.\n\n### Unordered lists\n\nYou can make an unordered list by preceding list items with either a *, a - or a +. Markers are interchangeable too.\n\n```md*Item+Item-Item\n```\n\n### Ordered lists\n\nYou can make an ordered list by preceding list items with a number.\n\n```md\n1.Item 1\n2.Item 2\n3.Item 3\n```\n\nIt’s important to note that the actual numbers you use to mark the list have no effect on the HTML output Showdown produces. So you can use the same number in all items if you wish to.\n\n### TaskLists (GFM Style)\n\nShowdown also supports GFM styled takslists if the **`tasklists`** option is enabled.\n\n```md-[x]checked list item-[]unchecked list item\n``` \n\n - [x] checked list item\n - [ ] unchecked list item\n\n### List syntax\n\nList markers typically start at the left margin, but may be indented by up to three spaces. \n\n```md*this is valid*this is too\n```\n\nList markers must be followed by one or more spaces or a tab.\n\nTo make lists look nice, you can wrap items with hanging indents:\n\n```md*Lorem ipsum dolor sit amet,consectetuer adipiscing elit.Aliquam hendrerit mi posuere lectus.Vestibulum enim wisi,viverra nec,fringilla in,laoreet vitae,risus.*Donec sit amet nisl.Aliquam semper ipsum sit amet velit.Suspendisse id sem consectetuer libero luctus adipiscing.```\n\nBut if you want to be lazy, you don’t have to\n\nIf one list item is separated by a blank line, Showdown will wrap all the list items in `<p>` tags in the HTML output.\nSo this input:\n\n```md*Bird*Magic*Johnson\n```\n\nResults in:\n\n```html<ul><li><p>Bird</p></li><li><p>Magic</p></li><li><p>Johnson</p></li></ul>```\n\nThis differs from other markdown implementations such as GFM (github) or commonmark.  \n\n### Nested blocks\n\nList items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:\n\n```md\n1.This is a list item with two paragraphs.Lorem ipsum dolor\nsit amet,consectetuer adipiscing elit.Aliquam hendrerit\nmi posuere lectus.Vestibulum enim wisi,viverra nec,fringilla in,laoreet\nvitae,risus.Donec sit amet nisl.Aliquam semper ipsum\nsit amet velit.2.Suspendisse id sem consectetuer libero luctus adipiscing.```\n\nThis is valid for other block elements such as blockquotes:\n\n```md*A list item with a blockquote:>This is a blockquote>inside a list item.```\n\nor event other lists.\n\n### Nested lists\n\nYou can create nested lists by indenting list items by **four** spaces.\n\n```md\n1.Item 1\n1.A corollary to the above item.2.Yet another point to consider.2.Item 2*A corollary that does not need to be ordered.*This is indented four spaces*You might want to consider making a new list.3.Item 3\n```\n\nThis behavior is consistent with the original spec but differs from other implementations such as GFM or commonmark. Prior to version 1.5, you just needed to indent two spaces for it to be considered a sublist.\nYou can disable the **four spaces requirement** with option **`disableForced4SpacesIndentedSublists`**\n\nTo nest a third (or more) sublist level, you need to indent 4 extra spaces (or 1 extra tab) for each level.\n\n```md\n1.level 1\n1.Level 2*Level 3\n2.level 2\n1.Level 3\n1.Level 1\n```\n\n### Nested code blocks\n\nYou can nest fenced codeblocks the same way you nest other block elements, by indenting by fours spaces or a tab:\n\n```md\n1.Some code:```js\n    var foo = \'bar\';\n    console.log(foo);\n    ```\n```\n\nTo put a *indented style* code block within a list item, the code block needs to be indented twice — 8 spaces or two tabs:\n\n```md\n1.Some code:var foo=\'bar\';console.log(foo);```\n\n## Links\n\n### Simple\n\nIf you wrap a valid URL or email in `<>` it will be turned into a link whose text is the link itself.\n\n```md\nlink to<http:this is my email<somedude@mail.com>```\n\nIn the case of email addreses, Showdown will also perform a bit of randomized decimal and hex entity-encoding to help obscure your address from address-harvesting spambots.\nYou can disable this obfuscation setting **`encodeEmails`** option to `!1`.\n\nWith the option **`simplifiedAutoLink`** enabled, Showdown will automagically turn every valid URL it finds in the text body to links for you, without the need to wrap them in `<>`.\n\n```md\nlink to http:this is my email somedude@mail.com\n```\n\n### Inline\n\nYou can create an inline link by wrapping link text in brackets ( `[]` ), and then wrapping the link in parentheses ( `()` ).\n\nFor example, to create a hyperlink to github.com/showdownjs/showdown, with a link text that says, Get Showdown!, you\'d write this in Markdown: `[Get Showdown!](https:### Reference Style\nYou can also use the reference style,like this:```md\nthis is a [link to google][1]\n\n[1]: www.google.com\n```\nShowdown also supports implicit link references:```md\nthis is a link to [google][]\n\n[google]: www.google.com\n```\n## Images\nMarkdown uses an image syntax that is intended to resemble the syntax for links,also allowing for two styles:inline and reference.### Inline\nInline image syntax looks like this:```md\n![Alt text](url/to/image)\n\n![Alt text](url/to/image "Optional title")\n```\nThat is:+An exclamation mark:!;+followed by a set of square brackets,containing the alt attribute text for the image;+followed by a set of parentheses,containing the URL or path to the image,and an optional title attribute enclosed in double or single quotes.### Reference Style\nReference-style image syntax looks like this:```md\n![Alt text][id]\n```\nWhere “id” is the name of a defined image reference.Image references are defined using syntax identical to link references:```md\n[id]: url/to/image  "Optional title attribute"\n```\nImplicit references are also supported in images,similar to what happens with links:```md\n![showdown logo][]\n\n[showdown logo]: http://showdownjs.github.io/demo/img/editor.logo.white.png\n```\n### Image dimensions\nWhen the option**`parseImgDimension`**is activated,you can also define the image dimensions,like this:```md\n![Alt text](url/to/image =250x250 "Optional title")\n```\nor in reference style:```md\n![Alt text][id]\n\n[id]: url/to/image =250x250\n```\n### Base64 encoded images\nShowdown also supports Base64 encoded images,both reference and inline style.**Since version 1.7.4**,wrapping base64 strings,which are usually extremely long lines of text,is supported.You can add newlines arbitrarily,as long as they are added after the `,` character.**inline style**```md\n![Alt text](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\njmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAY\nSURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=)\n```**reference style**```md\n![Alt text][id]\n\n[id]:\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\njmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D\nAcdvqGQAAAAYSURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=\n```\nPlease note that with reference style base64 image sources,regardless of "wrapping",a double newline is needed after the base64 string to separate them from a paragraph or other text block(but references can be adjacent).**wrapped reference style**```md\n![Alt text][id]\n![Alt text][id2]\n\n[id]:\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\njmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D\nAcdvqGQAAAAYSURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=\n[id2]:\ndata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\njmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D\nAcdvqGQAAAAYSURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=\n\nthis text needs to be separated from the references by 2 newlines\n```\n## Tables\nTables aren\'t part of the core Markdown spec, but they are part of GFM and Showdown supports them by turning on the option `tables`.\n\nColons can be used to align columns.\n\nIn the new version, the outer pipes (`|`) are optional, matching GFM spec. \n\nYou also don\'t need to make the raw Markdown line up prettily.You can also use other markdown syntax inside them.```md\n| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| **col 3 is**  | right-aligned | $1600 |\n| col 2 is      | *centered*    |   $12 |\n| zebra stripes | ~~are neat~~  |    $1 |\n```\n## Mentions\nShowdown supports github mentions by enabling the option**`ghMentions`**.This will turn every `@username` into a link to their github profile.```md\nhey @tivie, check this out\n```\nSince version 1.6.2 you can customize the generated link in mentions with the option**`ghMentionsLink`**.For instance,setting this option to `http://mysite.com/{u}/profile`:```html\n<p>hey <a href="http://mysite.com/tivie/profile">@tivie</a>, check this out</p>\n```\n## Handling HTML in markdown documents\nShowdown,in most cases,leaves HTML tags alone,leaving them untouched in the output document.```md\nsome markdown **here**\n<div>this is *not* **parsed**</div>\n```\n```html\n<p>some markdown <strong>here</strong></p>\n<div>this is *not* **parsed**</div>\n```\nHowever,there are exceptions to this.With `<code>` and `<pre><code>` tags,their contents are always escaped.```md\nsome markdown **here** with <code>foo & bar <baz></baz></code>\n```\n```html\n<p>some markdown <strong>here</strong> with <code>foo &amp; bar &lt;baz&gt;&lt;/baz&gt;</code></p>\n```\nIf you wish to enable markdown parsing inside a specific HTML tag,you can enable it by using the html attribute**`markdown`**or**`markdown="1"`**or**`data-markdown="1"`**.```md\nsome markdown **here**\n<div markdown="1">this is *not* **parsed**</div>\n```\n```html\n<p>some markdown <strong>here</strong></p>\n<div markdown="1"><p>this is <em>not</em> <strong>parsed</strong></p></div>\n```\n## Escaping entities\n### Escaping markdown entities\nShowdown allows you to use backslash(``) escapes to generate literal characters which would otherwise have special meaning in markdown’s syntax. For example, if you wanted to surround a word with literal underscores (instead of an HTML `<em>` tag), you can use backslashes before the unserscores, like this:\n\n```md\n_literal underscores_\n```\n\nShowdown provides backslash escapes for the following characters:\n\n```\n backslash\n`   backtick\n*   asterisk\n_   underscore\n{}  curly braces\n[]  square brackets\n()  parentheses\n#   hash mark\n+   plus sign\n-   minus sign (hyphen)\n.   dot\n!   exclamation mark\n```\n### Escaping HTML tags\nSince[version 1.7.2](https:```md\n<div>a literal div</div>\n```\n## Known differences and Gotchas\nIn most cases,Showdown\'s output is identical to that of Perl Markdown v1.0.2b7.  What follows is a list of all known deviations.  Please file an issue if you find more.\n\n* **Since version 1.4.0, showdown supports the markdown="1" attribute**, but for older versions, this attribute is ignored. This means:\n\n        <div markdown="1">\n             Markdown does *not* work in here.\n        </div>\n\n\n* You can only nest square brackets in link titles to a depth of two levels:\n\n        [[fine]](http://www.github.com/)\n        [[[broken]]](http://www.github.com/)\n\n    If you need more, you can escape them with backslashes.\n\n\n* A list is **single paragraph** if it has only **1 line-break separating items** and it becomes **multi paragraph if ANY of its items is separated by 2 line-breaks**:\n\n   ```md\n    - foo\n   \n    - bar\n    - baz\n   ```\n   becomes\n\n    ```html\n    <ul>\n      <li><p>foo</p></li>\n      <li><p>bar</p></li>\n      <li><p>baz</p></li>\n    </ul>\n    ```\n\nThis new ruleset is based on the comments of Markdown\'s author John Gruber in the[Markdown discussion list][md-newsletter].[md-spec]:http:[md-newsletter]:https:[atx]:http:[setext]:https:[readme]:https:[awkward effect]:http:[emoji list]:https:';
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.unsestElements();
  }

  setElements() {
    this._inputElement = this.shadowRoot?.querySelector(
      '[contenteditable]',
    ) as HTMLInputElement;
    this._chatElement = this.shadowRoot?.querySelector('#chat') as HTMLElement;
  }

  unsestElements() {
    this._inputElement = null;
    this._chatElement = null;
  }

  addEventListeners() {
    Observable.getNotifier(this.cs).subscribe(this, 'threadsById');
    Observable.getNotifier(this.ts).subscribe(this, 'activeTabId');
    this._updateInterval = setInterval(() => this.updateChat(), 60000); // update chat every minute for time updates
    this._chatElement?.addEventListener('scroll', this.toggleChatScrollLock);
  }

  removeEventListeners() {
    Observable.getNotifier(this.cs).unsubscribe(this);
    clearInterval(this._updateInterval);
    this._chatElement?.removeEventListener('scroll', this.toggleChatScrollLock);
  }

  handleChange(subject: unknown, key: string) {
    if (key === 'threadsById') {
      this.updateChat();
    }
    if (key === 'activeTabId' || key === 'tabsById') {
      this.updateContext();
    }
  }

  handleKeydown(e: Event) {
    if (!(e instanceof KeyboardEvent)) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit();
      return;
    }
    if (e.key === 'Escape') {
      this.handleClose();
      return;
    }

    return true;
  }

  handleKeyUp(e: Event) {
    if (!(e instanceof KeyboardEvent)) return;
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      this._inputElement?.innerText === '\n'
    ) {
      this._inputElement!.innerHTML = ''; // need to clear innerHTML to show the placeholder
    }

    return true;
  }

  focus() {
    this._inputElement?.focus();
  }

  handleSubmit() {
    if (!this._inputElement) return;
    const message = this._inputElement.innerText;
    if (!message) return;
    if (!this._threadId) {
      this._threadId = this.cs.newThread();
      if (this.ts.activeTabId) {
        this.cs.browserContextChanged(
          this._threadId,
          this.ts.tabsById[this.ts.activeTabId],
        );
      }
    }
    this.cs.send(message, this._threadId);
    this._inputElement.innerHTML = '';
  }

  handleClose() {
    this.clearChat();
    this.$emit('close');
  }

  updateChat() {
    if (this._threadId && this._chatElement) {
      const messages = this.cs.threadsById[this._threadId].messages;
      const messageIds = Object.keys(messages);

      // Skip the first two messages since it's the user input and system prompt
      for (let x = 0; x < messageIds.length; x++) {
        const message = messages[messageIds[x]];
        if (message.id === 'system-prompt') continue; // skip system prompt
        if (message.role === 'context') continue; // skip context messages

        let entry = this._chatElement.querySelector(
          `#${message.id}`,
        ) as CopilotChatEntry;
        if (!entry) {
          entry = document.createElement(
            'copilot-chat-entry',
          ) as CopilotChatEntry;
          entry.setAttribute('id', message.id);
          entry.setAttribute('inline', '');
          if (message.role === 'system') entry.setAttribute('system', '');
          this._chatElement.appendChild(entry);
        }

        if (message.status === 'pending') {
          entry.setAttribute('pending', '');
        } else {
          entry.message = message.content;
          entry.removeAttribute('pending');
          entry.setAttribute(
            'style',
            `--text-transition-duration: ${Math.min(2000, message.content.split(' ').length * 100)}ms`,
          );
        }

        // Update time regardless of message change
        entry.timestamp = message.timestamp;

        if (this._lockChatScroll)
          this._chatElement.scrollTop = this._chatElement.scrollHeight;
      }
    }
  }

  clearChat() {
    if (!this._chatElement || !this._inputElement) return;
    this._chatElement.innerHTML = '';
    this._inputElement.innerHTML = '';
    this._threadId = undefined;
  }

  updateContext() {
    if (this.ts.activeTabId && this._threadId) {
      this.cs.browserContextChanged(
        this._threadId,
        this.ts.tabsById[this.ts.activeTabId],
      );
    }
  }

  toggleChatScrollLock = () => {
    if (!this._chatElement) return;
    const { scrollTop, scrollHeight, clientHeight } = this._chatElement;
    this._lockChatScroll = scrollTop + clientHeight >= scrollHeight;
  };
}
