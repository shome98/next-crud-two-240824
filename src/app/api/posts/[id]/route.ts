import { NextRequest, NextResponse } from 'next/server';
import { deletePost, getPostById, updatePost } from '@/app/data/postsforjson';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const post = await getPostById(Number(params.id));
    if (post) {
      return NextResponse.json(post);
    } else {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const updatedPost = await request.json();
    await updatePost(Number(params.id), updatedPost);
    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await deletePost(Number(params.id));
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
};