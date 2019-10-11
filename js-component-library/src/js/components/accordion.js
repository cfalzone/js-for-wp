const shortid = require('shortid'); 

// Accordion Component Constructor
export function Accordion(data) {
  this.data = data;
  this.id = shortid.generate();

  // Set the current panel if not set
  let currentPanelList = this.data.filter(item => item.current === true);
  if (currentPanelList.length <= 0) {
    this.data[0].current = true;
  }
  
  // generate an ID for each panel
  this.data.map(item => item.id = shortid.generate());
}

// Generates the HTML Markup for the accordion
Accordion.prototype.generateAccordionMarkup = function() {
  let markup = `<div class="accordion-container" id="accordion-${this.id}">`;

  markup += `<dl class="accordion-list">`;
  for (let i = 0; i < this.data.length; i++) {
    let item = this.data[i];
    let current = '';
    if (item.current === true) {
      current = ' current'
    }
    markup += `<dt class="${current}" data-accid="${item.id}">${item.title}</dt>`;
    markup += `<dd class="${current}" data-accid="${item.id}">${item.content}</dd>`;
  }
  markup += `</dl>`;

  markup += `</div>`;

  return markup;
};

// Setup the elements
Accordion.prototype.init = function() {
  // cache references to the container, tabs, and bodies
  this.container  = document.querySelector(`#accordion-${this.id}`);
  this.titleElems = Array.from(this.container.querySelectorAll('dt'));
  this.bodyElems  = Array.from(this.container.querySelectorAll('dd'));

  // hide all the but the current body
  this.bodyElems.map(item => {
    if (!item.classList.contains('current')) {
      item.classList.add('hide');
    }
  });

  this.attachEvents();
};

// Attach events to tabs
Accordion.prototype.attachEvents = function() {
  // atach a click event to each item
  this.titleElems.map(item => {
    item.addEventListener('click', handleAccordionClick.bind(this));
  });
}

function handleAccordionClick(event) {
  event.preventDefault();
  const target = event.target;

  this.titleElems.map(item => {
    if (item.dataset.accid === target.dataset.accid) {
      item.classList.add('current');
    } else {
      item.classList.remove('current');
    }
  });

  this.bodyElems.map(item => {
    if (item.dataset.accid === target.dataset.accid) {
      item.classList.add('current');
      item.classList.remove('hide');
    } else {
      item.classList.remove('current');
      item.classList.add('hide');
    }
  });
}