import { useState } from 'react';
import { Post } from '../types';

interface PostFormProps {
  initialPost?: Post;
  onSubmit: (post: Post) => void;
}

export default function PostForm({ initialPost, onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [author, setAuthor] = useState(initialPost?.author || '');

  const handleSubmit = () => {
    const newPost: Post = {
      id: initialPost?.id || Date.now(),
      title,
      content,
      author,
    };
    onSubmit(newPost);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <div>
        <label>Author</label>
        <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
