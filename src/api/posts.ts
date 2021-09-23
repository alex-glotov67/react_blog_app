import { BASE_URL } from './api';

export const getAllPosts = ():Promise<Post[]> => {
  return fetch(`${BASE_URL}posts`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};

export const getPostDetails = (postId: number):Promise<Post> => {
  return fetch(`${BASE_URL}posts/${postId}?_embed=comments`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error');
      }

      return response.json();
    });
};

export const addComment = (newComment: Partial<Comment>) => {
  return fetch(`${BASE_URL}comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};

export const addPost = (newPost: Post) => {
  return fetch(`${BASE_URL}posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newPost),
  });
};

export const deletePost = (postId: number) => {
  return fetch(`${BASE_URL}posts/${postId}`, {
    method: 'DELETE',
  });
};
