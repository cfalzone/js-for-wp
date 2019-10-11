const shortid = require('shortid'); 

// Tabs Component Constructor
export function Tabs(data) {
  this.data = data;
  this.id = shortid.generate();

  // Set the current tab if not set
  let currentTabList = this.data.filter(item => item.current === true);
  if (currentTabList.length <= 0) {
    this.data[0].current = true;
  }
  
  // generate an ID for each tab
  this.data.map(item => item.id = shortid.generate());
}

// Generates the HTML Markup for the tabs
Tabs.prototype.generateTabsMarkup = function() {
  let markup = `<div class="tabs-container" id="tabs-${this.id}">`;

  let tabAnchors = `<ul class="tabs-list">`;
  let tabContents = ``;
  for (let i = 0; i < this.data.length; i++) {
    let item = this.data[i];
    let current = '';
    if (item.current === true) {
      current = ' current'
    }
    tabAnchors += `<li class="tab${current}" data-tabid="${item.id}">${item.title}</li>`;
    tabContents += `<div class="tab-body${current}" data-tabid="${item.id}">${item.content}</div>`;
  }
  tabAnchors += `</ul>`;

  markup += `${tabAnchors}${tabContents}</div>`;

  return markup;
};

// Setup the elements
Tabs.prototype.init = function() {
  // cache references to the container, tabs, and bodies
  this.tabContainer = document.querySelector(`#tabs-${this.id}`);
  this.tabElems     = Array.from(this.tabContainer.querySelectorAll('.tab'));
  this.bodyElems    = Array.from(this.tabContainer.querySelectorAll('.tab-body'));

  // hide all the but the current body
  this.bodyElems.map(item => {
    if (!item.classList.contains('current')) {
      item.classList.add('hide');
    }
  });

  this.attachEvents();
}

// Attach events to tabs
Tabs.prototype.attachEvents = function() {
  // atach a click event to each tab
  this.tabElems.map(item => {
    item.addEventListener('click', handleTabClick.bind(this));
  });
};

function handleTabClick(event) {
  event.preventDefault();
  const target = event.target;

  this.tabElems.map(item => {
    if (item.dataset.tabid === target.dataset.tabid) {
      item.classList.add('current');
    } else {
      item.classList.remove('current');
    }
  });

  this.bodyElems.map(item => {
    if (item.dataset.tabid === target.dataset.tabid) {
      item.classList.add('current');
      item.classList.remove('hide');
    } else {
      item.classList.remove('current');
      item.classList.add('hide');
    }
  });
}