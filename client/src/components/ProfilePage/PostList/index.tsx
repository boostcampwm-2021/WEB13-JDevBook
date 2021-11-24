import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { postListStore } from 'recoil/store';
import styled from 'styled-components';

import fetchApi from 'api/fetch';

import { Post } from 'components/HomePage';
import { Skeleton } from 'components/common';

const PostListContainer = styled.div`
  width: 538px;
  /* min-width: 680px; */
  position: relative;
  box-sizing: border-box;
  margin-bottom: 48px;
`;

const Observer = styled.div`
  width: 680px;
  height: 0px;
  background: transparent;
`;

const PostList = ({ username }: { username: string }) => {
  const [posts, setPosts] = useRecoilState(postListStore);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver>();
  const abortController = useRef<AbortController | null>(null);

  const observer = (element: HTMLDivElement) => {
    if (isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && hasMore) {
          const lastIdx = posts.length !== 0 ? posts[posts.length - 1].idx : -1;
          fetchPostsMore(lastIdx);
        }
      },
      {
        rootMargin: '840px 0px'
      }
    );
    element && observerRef.current.observe(element);
  };

  const fetchPostsMore = async (lastIdx: number = -1, count: number = 10) => {
    try {
      abortController.current = new AbortController();
      setFetching(true);
      const result = await fetchApi.getPosts(
        lastIdx,
        count,
        username,
        abortController.current.signal
      );
      if (result.length < count) {
        setHasMore(false);
      }
      setPosts((prev) => prev.concat(result));
      setFetching(false);
    } finally {
      abortController.current = null;
    }
  };

  const getSkeletons = (count: number) => {
    return Array(count)
      .fill(undefined)
      .map((v, i) => {
        return <Skeleton key={`s${i}`} isProfile />;
      });
  };

  useEffect(() => {
    fetchPostsMore();

    return () => {
      if (abortController.current) {
        abortController.current.abort();
        abortController.current = null;
      }
      setPosts([]);
    };
  }, [username]);

  return (
    <>
      <PostListContainer>
        {posts.map((post) => (
          <div key={post.idx}>
            <Post key={post.idx} post={post} isProfile />
          </div>
        ))}
        {isFetching && getSkeletons(3)}
        <Observer ref={observer} />
      </PostListContainer>
    </>
  );
};

export default PostList;
