import { NextRequest, NextResponse } from 'next/server';
import { addPost, deletePost, getPostById, readPostsFromFile, updatePost, } from '@/app/data/postsforjson';

export const GET = async () => {
  try {
    const posts = await readPostsFromFile();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const newPost = await request.json();
    await addPost({ ...newPost, id: Date.now() });
    return NextResponse.json({ message: 'Post added successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add post' }, { status: 500 });
  }
};