import fs from 'fs/promises';
import path from 'path';
import { Post } from '../types';

const dataFilePath = path.join(process.cwd(), 'src/app/data/posts.json');

export const ensureFileExists = async () => {
  try {
    await fs.access(dataFilePath);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify([]));
  }
};

export const readPostsFromFile = async (): Promise<Post[]> => {
  await ensureFileExists();
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(fileContents) as Post[];
};

export const writePostsToFile = async (posts: Post[]): Promise<void> => {
  await fs.writeFile(dataFilePath, JSON.stringify(posts, null, 2));
};

export const addPost = async (post: Post): Promise<void> => {
  const posts = await readPostsFromFile();
  posts.push(post);
  await writePostsToFile(posts);
};

export const updatePost = async (id: number, updatedPost: Post): Promise<void> => {
  let posts = await readPostsFromFile();
  posts = posts.map(post => (post.id === id ? updatedPost : post));
  await writePostsToFile(posts);
};

export const deletePost = async (id: number): Promise<void> => {
  let posts = await readPostsFromFile();
  posts = posts.filter(post => post.id !== id);
  await writePostsToFile(posts);
};

export const getPostById = async (id: number): Promise<Post | undefined> => {
  const posts = await readPostsFromFile();
  return posts.find(post => post.id === id);
};
