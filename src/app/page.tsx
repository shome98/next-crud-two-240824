// src/app/page.tsx
"use client";
import { useEffect, useState } from 'react';
import PostForm from './components/PostForm';
import { Post } from './types';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddOrUpdatePost = async (post: Post) => {
    try {
      const response = editingPost
        ? await fetch(`/api/posts/${post.id}`, { method: 'PUT', body: JSON.stringify(post) })
        : await fetch('/api/posts', { method: 'POST', body: JSON.stringify(post) });

      const data = await response.json();
      if (editingPost) {
        setPosts(posts.map(p => (p.id === post.id ? post : p)));
      } else {
        setPosts([...posts, post]);
      }
      setEditingPost(null);
    } catch (err) {
      setError('Failed to save post');
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
  };

  const handleDeletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <PostForm initialPost={editingPost || undefined} onSubmit={handleAddOrUpdatePost} />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><em>by {post.author}</em></p>
            <button onClick={() => handleEditPost(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

