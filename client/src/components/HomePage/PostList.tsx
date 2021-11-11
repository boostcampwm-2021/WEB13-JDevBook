import getData from 'api/fetch';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { postListStore } from 'recoil/store';
import styled, { css } from 'styled-components';
import { PostData } from 'utils/types';
import { Post, Skeleton } from './index';

const PostListContainer = styled.div`
  width: 680px;
  min-width: 680px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 48px;
`;

const Observer = styled.div`
  width: 680px;
  height: 0px;
  background: transparent;
`;

const PostList = () => {
  const [posts, setPosts] = useRecoilState(postListStore);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver>();

  const observer = (element: HTMLDivElement) => {
    if (isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && hasMore) {
          const lastIdx = posts[posts.length - 1].idx;
          fetchPosts(lastIdx);
        }
      },
      {
        rootMargin: '840px 0px'
      }
    );
    element && observerRef.current.observe(element);
  };

  const fetchPosts = async (lastIdx: number = -1, count: number = 10) => {
    setFetching(true);
    const result = await getData.getPosts(lastIdx, count);
    if (result.length < count) {
      setHasMore(false);
    }
    setPosts((prev) => prev.concat(result));
    setFetching(false);
  };

  const getSkeletions = (count: number) => {
    return Array(count)
      .fill(undefined)
      .map((v, i) => {
        return <Skeleton key={`s${i}`} />;
      });
  };

  useEffect(() => {
    setPosts([]);
    fetchPosts();
  }, []);

  return (
    <PostListContainer>
      {posts.map((post) => (
        <Post key={post.idx} post={post} />
      ))}
      {isFetching && getSkeletions(3)}
      <Observer ref={observer} />
    </PostListContainer>
  );
};

export default PostList;
