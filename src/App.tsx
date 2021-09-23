import React, { useEffect, useState } from 'react';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getAllPosts } from './api/posts';
import { Loader } from './components/Loader';
import { NewPostForm } from './components/NewPostForm';
import { Navbar } from './components/Navbar';

const App: React.FC = () => {
  const [posts, setPosts] = useState([] as Post[]);
  const [selectedPostID, setSelectedPostID] = useState(0);
  const [loader, setLoader] = useState(false);

  const changePostId = (postId: number) => {
    setSelectedPostID(postId);
  };

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
      <main className="App__main">
        <div className="App__sidebar">
          {loader ? (
            <>
              {posts.length !== 0
                ? (
                  <PostsList
                    changePostId={changePostId}
                    selectedPostId={selectedPostID}
                    posts={posts}
                  />
                )
                : <h2>have any posts yet</h2>}
            </>
          )
            : <Loader />}

        </div>

        {selectedPostID !== 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostID} />
          </div>
        )}

        <NewPostForm maxId={setMaxId()} />

      </main>
    </div>
  );
};

export default App;
