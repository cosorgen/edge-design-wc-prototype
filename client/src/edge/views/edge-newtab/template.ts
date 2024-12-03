import { html, repeat } from '@microsoft/fast-element';
import '../../controls/newtab-composer.js';
import '../../controls/newtab-top-site.js';

const topSites = [
  {
    title: 'YouTube',
    url: 'https://www.youtube.com',
    icon: 'img/edge/newtab/youtube.png',
  },
  {
    title: 'Netflix',
    url: 'https://www.netflix.com',
    icon: 'img/edge/newtab/netflix.png',
  },
  {
    title: 'Instagram',
    url: 'https://www.instagram.com',
    icon: 'img/edge/newtab/instagram.png',
  },
  {
    title: 'The New York Times',
    url: 'https://www.nytimes.com',
    icon: 'img/edge/newtab/nytimes.png',
  },
  {
    title: 'Target',
    url: 'https://www.target.com',
    icon: 'img/edge/newtab/target.png',
  },
];

export const template = html` <div id="content">
  <div id="background"></div>
  <div id="content-header">
    <newtab-composer
      @submit="${(x, c) => x.handleComposerSubmit(c.event)}"
    ></newtab-composer>
    <div id="top-sites">
      ${repeat(
        topSites,
        html`
          <newtab-top-site
            @click="${(x, c) => c.parent.handleLinkClick(x.url)}"
          >
            <img src="${(x) => x.icon}" alt="${(x) => x.title}" />
          </newtab-top-site>
        `,
      )}
      <newtab-top-site>
        <svg>
          <use x="2" y="2" href="img/edge/icons.svg#add-24-regular"></use>
        </svg>
      </newtab-top-site>
      <button id="lets-talk">
        <img src="img/edge/copilot-icon.svg" alt="Copilot icon" />
        Let's talk
      </button>
    </div>
  </div>
  <div class="section">
    <div class="section-header">
      <h2>Let’s prepare for your day, Elena</h2>
    </div>
    <div class="section-content" id="today">
      <div class="card" id="msn">
        <h3>MSN Daily</h3>
        <p>
          Candidates focus on swing states, IRS introduces new 401(k) limits,
          and more
        </p>
        <mai-button>
          <svg width="20px" height="20px" slot="start">
            <use
              x="2px"
              y="2px"
              href="img/edge/icons.svg#headphones-20-regular"
            />
          </svg>
          Listen
        </mai-button>
      </div>
      <div class="card" id="todo">
        <div id="todo-header">
          <img />
          <p>To Do</p>
        </div>
        <div id="todo-list">
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Get tires checked</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                <div class="todo-due-date today">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Buy new slippers</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                <div class="todo-due-date today">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Finish business presentation</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Work</div>
                <div class="todo-due-date today">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Send invites for Q4 planning</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Work</div>
                <div class="todo-due-date">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Tomorrow
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" />
            <div class="todo-info">
              <div class="todo-title">Take the kids for a haircut</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                <div class="todo-due-date">
                  <svg>
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Tomorrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" id="weather"></div>
      <div class="card" id="sports"></div>
      <div class="card" id="election"></div>
    </div>
  </div>
</div>`;
