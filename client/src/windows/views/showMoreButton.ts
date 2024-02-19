import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralBackground2Hover,
  spacingHorizontalXS,
} from '@phoenixui/themes';

const template = html<ShowMoreButton>`
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_110857)">
      <path
        d="M2.66406 10.3906C2.66406 10.2083 2.72917 10.0521 2.85938 9.92188L7.53125 5.25C7.66146 5.11979 7.81771 5.05469 8 5.05469C8.18229 5.05469 8.33854 5.11979 8.46875 5.25L13.1406 9.92188C13.2708 10.0521 13.3359 10.2083 13.3359 10.3906C13.3359 10.5781 13.2682 10.737 13.1328 10.8672C13.0026 10.9922 12.8464 11.0547 12.6641 11.0547C12.4818 11.0547 12.3255 10.9896 12.1953 10.8594L8 6.66406L3.80469 10.8594C3.67448 10.9896 3.51823 11.0547 3.33594 11.0547C3.15365 11.0547 2.99479 10.9922 2.85938 10.8672C2.72917 10.737 2.66406 10.5781 2.66406 10.3906Z"
        fill="currentColor"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_1_110857">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 0.390625)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${spacingHorizontalXS};
    user-select: none;
    padding: 0 ${spacingHorizontalXS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
  }
  :host(:hover) {
    background: ${colorNeutralBackground2Hover};
  }
`;

@customElement({
  name: 'show-more-button',
  template,
  styles,
})
export default class ShowMoreButton extends FASTElement {}
