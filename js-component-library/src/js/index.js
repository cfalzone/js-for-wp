import { Example } from './components/example';
import { Tabs } from './components/tabs';
import { Accordion } from './components/accordion';
import { Modal } from './components/modal';

// Get the app Element
const app = document.querySelector('#app');

// ===============
// Tabs
// ===============

// Create New Tab Examples
const tabsData1 = [
  {
    title: 'Tab One',
    content: 'Tab One Content: Veniam culpa nisi id ad incididunt laborum occaecat ad ea sit amet fugiat ea nostrud.'
  },
  {
    title: 'Tab Two',
    content: 'Tab Two Content: Commodo non aute magna consequat adipisicing laboris esse officia.'
  },
  {
    title: 'Tab Three',
    content: 'Tab Three Content: Et culpa eiusmod magna proident labore duis commodo mollit minim ut eu minim.'
  },
];
const tabs1 = new Tabs(tabsData1);
const tabsEx1 = new Example("Tabs 1", tabs1.generateTabsMarkup());

const tabsData2 = [
  {
    title: 'Tab 1',
    content: 'Tab 1 Content: Incididunt nulla ut nisi incididunt magna.'
  },
  {
    title: 'Tab 2',
    content: 'Tab 2 Content: Enim pariatur aliqua ad est ut culpa est aliqua dolore tempor velit esse nisi.',
    current: true
  },
  {
    title: 'Tab 3',
    content: 'Tab 3 Content: Magna nisi reprehenderit Lorem duis.'
  },
];
const tabs2 = new Tabs(tabsData2);
const tabsEx2 = new Example("Tabs 2", tabs2.generateTabsMarkup());

// Add the tabs examples to the page
app.insertAdjacentHTML('beforeend', tabsEx1.generateExampleMarkup());
app.insertAdjacentHTML('beforeend', tabsEx2.generateExampleMarkup());

// Initialize the tab examples
tabs1.init();
tabs2.init();


// ===============
// Accordions
// ===============


// Create New Tab Examples
const accData1 = [
  {
    title: 'Accordion One',
    content: 'Accordion One Content: Veniam culpa nisi id ad incididunt laborum occaecat ad ea sit amet fugiat ea nostrud.'
  },
  {
    title: 'Accordion Two',
    content: 'Accordion Two Content: Commodo non aute magna consequat adipisicing laboris esse officia.'
  },
  {
    title: 'Accordion Three',
    content: 'Accordion Three Content: Et culpa eiusmod magna proident labore duis commodo mollit minim ut eu minim.'
  },
];
const acc1 = new Accordion(accData1);
const accEx1 = new Example("Accordion 1", acc1.generateAccordionMarkup());

const accData2 = [
  {
    title: 'Accordion 1',
    content: 'Accordion 1 Content: Incididunt nulla ut nisi incididunt magna.'
  },
  {
    title: 'Accordion 2',
    content: 'Accordion 2 Content: Enim pariatur aliqua ad est ut culpa est aliqua dolore tempor velit esse nisi.',
    current: true
  },
  {
    title: 'Accordion 3',
    content: 'Accordion 3 Content: Magna nisi reprehenderit Lorem duis.'
  },
];
const acc2 = new Accordion(accData2);
const accEx2 = new Example("Accordion 2", acc2.generateAccordionMarkup());

// Add the accordion examples to the page
app.insertAdjacentHTML('beforeend', accEx1.generateExampleMarkup());
app.insertAdjacentHTML('beforeend', accEx2.generateExampleMarkup());

// Initialize the Accordion examples
acc1.init();
acc2.init();

// ===============
// Modals
// ===============

// Create New Modal Examples
const modal1 = new Modal('Modal One', 'Modal One Content: Veniam ad cupidatat Lorem nostrud ullamco commodo reprehenderit ut ut.');
const modalEx1 = new Example('Modal One', modal1.generateModalMarkup());
const modal2 = new Modal('Modal Two', 'Modal Two Content: Laboris voluptate commodo officia minim voluptate exercitation ullamco anim nostrud deserunt ex laborum nisi.');
const modalEx2 = new Example('Modal Two', modal2.generateModalMarkup());

// Add the modal exmaples to the page
app.insertAdjacentHTML('beforeend', modalEx1.generateExampleMarkup());
app.insertAdjacentHTML('beforeend', modalEx2.generateExampleMarkup());

// Initialize the Mocal examples
modal1.init();
modal2.init();

// ===============
// Nested Example
// ===============

const nestedTabs1 = new Tabs(tabsData1);
const nestedTabs2 = new Tabs(tabsData2);
const nestedAccData = [
  {
    title: 'Nested Accordion 1',
    content: nestedTabs1.generateTabsMarkup()
  },
  {
    title: 'Nested Accordion 2',
    content: nestedTabs2.generateTabsMarkup()
  }
];
const nestedAcc = new Accordion(nestedAccData);
const nestedModal = new Modal('Nested Modal',
  nestedAcc.generateAccordionMarkup()
);
const nextedExample = new Example('Nested Example', nestedModal.generateModalMarkup());

app.insertAdjacentHTML('beforeend', nextedExample.generateExampleMarkup());

nestedTabs1.init();
nestedTabs2.init();
nestedAcc.init();
nestedModal.init();
