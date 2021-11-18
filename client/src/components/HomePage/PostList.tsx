import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { postListStore } from 'recoil/store';
import styled, { css } from 'styled-components';

import fetchApi from 'api/fetch';
import arrayUtil from 'utils/arrayUtil';

import { Post } from 'components/HomePage';
import { Problem } from 'components/GroupPage';
import { NewPostAlert, Skeleton } from 'components/common';

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
  const [problems, setProblems] = useState([]);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const problemOrders = useRef<number[]>([]);
  const observerRef = useRef<IntersectionObserver>();

  const observer = (element: HTMLDivElement) => {
    if (isFetching) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && hasMore) {
          const lastIdx = posts.length !== 0 ? posts[posts.length - 1].idx : -1;
          fetchPostsMore(lastIdx, 10);
        }
      },
      {
        rootMargin: '840px 0px'
      }
    );
    element && observerRef.current.observe(element);
  };

  const fetchInit = async () => {
    setFetching(true);
    const fetchPosts = await fetchApi.getPosts();
    const fetchProblems = await fetchApi.getProblems();
    const result = await Promise.all([fetchPosts, fetchProblems]);
    setPosts((prev) => prev.concat(result[0]));
    setProblems(result[1]);
    problemOrders.current = arrayUtil.shuffle(
      Array(result[1].length)
        .fill(undefined)
        .map((_, idx) => idx)
    );
    setFetching(false);
  };

  const fetchPostsMore = async (lastIdx: number, count: number) => {
    setFetching(true);
    const result = await fetchApi.getPosts(lastIdx, count);
    if (result.length < count) {
      setHasMore(false);
    }
    setPosts((prev) => prev.concat(result));
    setFetching(false);
  };

  const getSkeletons = (count: number) => {
    return Array(count)
      .fill(undefined)
      .map((v, i) => {
        return <Skeleton key={`s${i}`} />;
      });
  };

  useEffect(() => {
    setPosts([]);
    fetchInit();
  }, []);

  const getNextProblem = (idx: number) => {
    if (problemOrders.current.length * 5 <= idx) return null;
    return idx % 5 === 4
      ? problems[problemOrders.current[Math.floor(idx / 5)]]
      : null;
  };

  return (
    <>
      <NewPostAlert />
      <PostListContainer>
        {Array(posts.length)
          .fill(undefined)
          .map((_, idx) => {
            const nextProblem = getNextProblem(idx);
            return (
              <div key={idx}>
                <Post key={posts[idx].idx} post={posts[idx]} />
                {nextProblem && (
                  <Problem
                    key={`p${(nextProblem as any).idx}`}
                    problem={nextProblem}
                    isHome
                  />
                )}
              </div>
            );
          })}
        {isFetching && getSkeletons(3)}
        <Observer ref={observer} />
      </PostListContainer>
    </>
  );
};

export default PostList;
