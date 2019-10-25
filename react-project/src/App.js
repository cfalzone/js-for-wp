import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Header from './components/Header';
import NotFound from './components/NotFound';
import Post from './components/Post';
import PostForm from './components/PostForm';
import Posts from './components/Posts';

import './App.css';

class App extends React.Component {
  state = {
    posts: []
  };

  addNewPost = post => {
    post.id = this.state.posts.length + 1;
    post.slug = encodeURIComponent(post.title.toLowerCase().split(" ").join("-"));
    this.setState({
      posts: [...this.state.posts, post]
    });
  }

  render = () => (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Posts posts={this.state.posts} />} />

          <Route exact path="/new" render={props => (
            <PostForm addNewPost={this.addNewPost} />
          )} />

          <Route path="/post/:postSlug" render={props => {
            const post = this.state.posts.find(
              post => post.slug === props.match.params.postSlug
            );
            if (post) {
              return <Post post={post} />
            } else {
              return <NotFound />
            }
          }} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
