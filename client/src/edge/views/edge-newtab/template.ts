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
  <mai-button id="settings" size="large" appearance="subtle" icon-only>
    <svg>
      <use href="img/edge/icons.svg#settings-24-regular"></use>
    </svg>
  </mai-button>
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
    </div>
  </div>
  <div id="widgets">
    <div id="widgets-header">
      <h2>Let’s prepare for your day, Elena</h2>
    </div>
    <div id="widgets-content">
      <div class="card" id="msn">
        <h3>MSN Daily</h3>
        <div id="msn-content">
          <svg>
            <use href="img/edge/icons.svg#play-circle-24-filled"></use>
          </svg>
          <p>Thursday, Decemeber 5</p>
        </div>
      </div>
      <div class="card" id="weather">
        <div id="weather-header">
          <svg width="10px" height="10px">
            <use href="img/edge/icons.svg#pin-10-regular" />
          </svg>
          <h4>Seattle, WA</h4>
        </div>
        <div id="weather-content">
          <div id="weather-today">
            <div id="weather-icon">
              <img
                src="img/edge/newtab2/partlySunny.svg"
                alt="Sun with clouds"
              />
            </div>
            <div id="weather-temperature">
              <h1>75°</h1>
              <p>Partly sunny</p>
            </div>
            <div id="weather-details">
              <p>H 81°</p>
              <p>L 66°</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card" id="election">
        <div id="election-header">2024 Election</div>
        <div id="election-content">
          <div id="election-info">
            <h4>Election day is tomorrow</h4>
            <p>Explore your ballot & find your nearest dropbox</p>
          </div>
          <img src="img/edge/newtab2/election.jpg" alt="Election" />
        </div>
      </div>
      <div class="card" id="todo">
        <div id="todo-header">
          <img src="img/edge/newtab2/todo.svg" alt="Todo logo" />
          <h4>To Do</h4>
        </div>
        <div id="todo-list">
          <div class="todo-item">
            <div class="todo-checkbox">
              <input type="checkbox" class="todo-checkbox" />
            </div>
            <div class="todo-info">
              <div class="todo-title">Get tires checked</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                ·
                <div class="todo-due-date today">
                  <svg width="10px" height="10px">
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <div class="todo-checkbox">
              <input type="checkbox" class="todo-checkbox" />
            </div>
            <div class="todo-info">
              <div class="todo-title">Buy new slippers</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                ·
                <div class="todo-due-date today">
                  <svg width="10px" height="10px">
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <div class="todo-checkbox">
              <input type="checkbox" class="todo-checkbox" />
            </div>
            <div class="todo-info">
              <div class="todo-title">Finish business presentation</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Work</div>
                ·
                <div class="todo-due-date today">
                  <svg width="10px" height="10px">
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Today
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <div class="todo-checkbox">
              <input type="checkbox" class="todo-checkbox" />
            </div>
            <div class="todo-info">
              <div class="todo-title">Send invites for Q4 planning</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Work</div>
                ·
                <div class="todo-due-date">
                  <svg width="10px" height="10px">
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Tomorrow
                </div>
              </div>
            </div>
          </div>
          <div class="todo-item">
            <div class="todo-checkbox">
              <input type="checkbox" class="todo-checkbox" />
            </div>
            <div class="todo-info">
              <div class="todo-title">Take the kids for a haircut</div>
              <div class="todo-subtitle">
                <div class="todo-list-name">Personal</div>
                ·
                <div class="todo-due-date">
                  <svg width="10px" height="10px">
                    <use href="img/edge/icons.svg#calendar-10-regular" />
                  </svg>
                  Tomorrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
