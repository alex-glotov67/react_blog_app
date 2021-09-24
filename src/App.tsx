import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';

import { getAllPosts } from './api/posts';
import { NewPostForm } from './components/NewPostForm';
import { Navbar } from './components/Navbar';
import { PostPage } from './components/PostsPage';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { UpdatePostForm } from './components/UpdatePostForm';

const App: React.FC = () => {
  const [posts, setPosts] = useState([] as Post[]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(false);
    getAllPosts()
      .then(response => {
        setPosts(response);
        setLoader(true);
      });
  }, []);

  const setMaxId = () => Math.max(...posts.map(post => post.id));

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/posts">
          <PostPage posts={posts} loader={loader} />
        </Route>

        <Route path="/add_post">
          <NewPostForm maxId={setMaxId()} />
        </Route>

        <Route
          path="/update_post/:postId"
          component={UpdatePostForm}
        />

        <Redirect path="/home" to="/" />

        <NotFoundPage />
      </Switch>
    </div>
  );
};

export default App;
