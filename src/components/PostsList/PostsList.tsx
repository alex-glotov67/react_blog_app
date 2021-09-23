import React from 'react';
import classNames from 'classnames';
import { deletePost } from '../../api/posts';

interface Props {
  changePostId: (postId: number) => void;
  selectedPostId: number;
  posts: Post[];
}

export const PostsList: React.FC<Props> = (props) => {
  const {
    changePostId,
    selectedPostId,
    posts,
  } = props;

  return (
    <div className="container col-10">
      <h2>Posts:</h2>
      {posts.map(post => (
        <div className="card mb-4" key={post.id}>
          <div className="card-header">
            Featured
          </div>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <button
              type="button"
              className={classNames(
                'me-2',
                'btn',
                'btn-primary',
                { 'btn-info': selectedPostId === post.id },
              )}
              onClick={() => {
                if (selectedPostId === post.id) {
                  changePostId(0);
                } else {
                  changePostId(post.id);
                }
              }}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>

            <button
              type="button"
              className="btn btn-danger me-2"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>

          </div>
        </div>

      ))}
    </div>
  );
};
