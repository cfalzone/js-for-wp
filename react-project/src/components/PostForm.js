import React from "react";
import Quill from "react-quill";
import { Redirect } from "react-router-dom";

import 'react-quill/dist/quill.snow.css';

class PostForm extends React.Component {
  state = {
    title: "",
    content: "",
    saved: false
  }

  handleNewPost = event => {
    event.preventDefault();

    if (this.state.title) {
      const post = {
        title: this.state.title,
        content: this.state.content
      };
      this.props.addNewPost(post);
      this.setState({ saved: true });
    } else {
      alert("Title Required");
    }
  }

  render = () =>  {
    if (this.state.saved === true) {
      return <Redirect to="/" />
    }

    return (
      <form className="container" onSubmit={this.handleNewPost}>
        <h1>Add a New Post</h1>

        <label htmlFor="form-title">Title:</label><br />
        <input id="form-title" value={this.state.title} onChange={e => this.setState({title: e.target.value})} />

        <p><label htmlFor="form-content">Content:</label></p>
        <Quill onChange={(content, delta, source, editor) => {
          this.setState({ content: editor.getContents() });
        }} />

        <p><button type="submit">Save</button></p>
      </form>
    );
  };
}

export default PostForm;