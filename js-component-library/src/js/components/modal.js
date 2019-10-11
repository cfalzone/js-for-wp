const shortid = require('shortid'); 

// Modal Component Constructor
export function Modal(title, content) {
  this.title = title;
  this.content = content;
  this.id = shortid.generate();
}

// Generates the HTML Markup for the modal
Modal.prototype.generateModalMarkup = function() {
  let markup = `
    <button class="modal-open" data-modalid="${this.id}">Open</button>
    <div class="modal hide" id="modal-${this.id}">
      <div class="modal-title">
        <h4>${this.title}</h4>
        <button class="modal-close">&times;</button>
      </div> 
      <div class="modal-content">${this.content}</div>
    </div>`;

  return markup;
};

// Setup the elements
Modal.prototype.init = function() {
  // cache references to the modal and buttons
  this.modalElem     = document.querySelector(`#modal-${this.id}`);
  this.modalOpenBtn  = document.querySelector(`button[data-modalid="${this.id}"]`);
  this.modalCloseBtn = this.modalElem.querySelector('.modal-close');

  this.attachEvents();
}

// Attach events to modal buttons
Modal.prototype.attachEvents = function() {
  this.modalOpenBtn.addEventListener('click', modalOpen.bind(this));
  this.modalCloseBtn.addEventListener('click', modalClose.bind(this));
  document.addEventListener('keyup', handleModalKeyUp.bind(this));
  document.addEventListener('click', handleModalClickOut.bind(this));
};

function modalOpen(event) {
  event.preventDefault();
  console.log('Modal Open Called');
  this.modalElem.classList.remove('hide');
}

function modalClose(event) {
  event.preventDefault();
  console.log('Modal Closed Called');
  this.modalElem.classList.add('hide');
}

function handleModalKeyUp(event) {
  if (event.defaultPrevented) {
    return;
  }

  const key = event.key || event.keyCode;

  if (key === 'Escape' || key === 'Esc' || key === 27) {
    this.modalElem.classList.add('hide');
  }
}

function handleModalClickOut(event) {
  if (event.defaultPrevented) {
    return;
  }
  
  if (event.target.closest(`#modal-${this.id}`)) return;
  this.modalElem.classList.add('hide');
}