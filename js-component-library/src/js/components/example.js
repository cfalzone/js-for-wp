// The Example Component
export function Example(title, content) {
  this.title = title;
  this.content = content;
}

Example.prototype.generateExampleMarkup = function() {
  return `
    <div class="example-wrapper">
      <h2>Example: ${this.title}</h2>
      <div class="example">${this.content}</div>
    </div>
  `;
};