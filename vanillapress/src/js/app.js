export class App {
  constructor(obj) {
    this.app = document.getElementById('app');
    this.sidebar = document.getElementById('sidebar');
    this.wpApi = "https://firebrandtalent.com/wp-json/wp/v2";
  }

  renderMainNav() {
    // Generate the Menu HTML
    const menuHtml = `
      <div class="nav">
        <a href="#home">Home</a>
        <a href="#about" data-pageid="8878">About Firbrand</a>
        <a href="#policy" data-pageid="29757">CSR Policy</a>
        <a href="#posts">Posts</a>
      </div>
    `;

    // Insert the Menu on the page
    this.app.insertAdjacentHTML('afterbegin', menuHtml);
    
    // Save a referene to the Menu
    this.menu = this.app.querySelector('.nav');

    // Setup menu events
    const menuItems = Array.from(this.menu.querySelectorAll('a'));
    menuItems.forEach(menuItem => {
      if (menuItem.getAttribute('href') === '#home') {
        menuItem.addEventListener('click', this.renderHome.bind(this));
      } else if (menuItem.getAttribute('href') === '#posts') {
        menuItem.addEventListener('click', this.renderPosts.bind(this));
      } else {
        menuItem.addEventListener('click', this.renderPage.bind(this));
      }
    });
  }

  renderHome() {
    const homeHtml = `<p>Welcome to VanillaPress. Use the menu to navigate the site.</p>`;

    this.replaceContent(homeHtml);
  }

  renderPosts(event, target = 'content') {
    // Pull the posts from the WP API
    fetch(`${this.wpApi}/posts`).then(resp => {
      return resp.json();
    }).then(data => {
      // Add the posts to the page
      let postsHtml = `<ul class="postlist">`;
      data.forEach(post => {
        postsHtml += `<li><a href="#post-${post.id}" data-postid="${post.id}">${post.title.rendered}</a></li>`
      });
      postsHtml += `</ul>`;

      let posts = null;
      if (target === 'content') {
        this.replaceContent(postsHtml);
        posts = this.app.querySelectorAll('.postlist a');
      } else {
        this.replaceSidebar(postsHtml);
        posts = this.sidebar.querySelectorAll('.postlist a');
      }

      // Attach Click events to the page
      posts.forEach(post => {
        post.addEventListener('click', this.renderPost.bind(this));
      });
    });
  }

  renderPage(event) {
    const target = event.target;
    const pageId = target.dataset.pageid;

    fetch(`${this.wpApi}/pages/${pageId}`).then(resp => {
      return resp.json();
    }).then(data => {
      this.replaceContent(data.content.rendered);
    });
  }

  renderPost(event) {
    const target = event.target;
    const postId = target.dataset.postid;

    fetch(`${this.wpApi}/posts/${postId}`).then(resp => {
      return resp.json();
    }).then(data => {
      const postHtml = `
        <h3>${data.title.rendered}</h3>
        <div class="postcontent">${data.content.rendered}</div>
      `;
      this.replaceContent(postHtml);
    });

    this.renderPosts(null, 'sidebar');
  }

  replaceContent(content) {
    const contDiv = this.app.querySelector('.content');
    if (contDiv) {
      contDiv.remove();
    }

    this.app.insertAdjacentHTML('beforeend', `
      <div class="content">${content}</div>
    `);
  }

  replaceSidebar(content) {
    const contDiv = this.sidebar.querySelector('.sbcontent');
    if (contDiv) {
      contDiv.remove();
    }

    this.sidebar.insertAdjacentHTML('beforeend', `
      <div class="sbcontent">${content}</div>
    `);
  }

}