import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { postListStore } from 'recoil/post';
import { profileState } from 'recoil/user';

import fetchApi from 'api/fetch';

import { Post } from 'components/HomePage';
import { FakePost } from 'components/common';

const PostListContainer = styled.div`
  width: 532px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 48px;
`;

const Observer = styled.div`
  width: 680px;
  height: 0px;
  background: transparent;
`;

const NoPost = styled.div`
  width: 532px;
  min-width: 532px;
  height: 180px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 5px;
  margin-top: 24px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};

  &::after {
    content: '등록된 게시글이 없습니다';
  }
`;

const PostList = () => {
  const { nickname } = useRecoilValue(profileState);
  const [posts, setPosts] = useRecoilState(postListStore);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver>();
  const abortControllerMap = useRef<{ [name: string]: AbortController }>({});

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
      abortControllerMap.current[nickname] = new AbortController();
      setFetching(true);
      const result = await fetchApi.getPosts(abortControllerMap.current[nickname].signal, {
        lastIdx,
        count,
        username: nickname
      });
      if (result.length < count || posts.length + result.length >= 300) {
        setHasMore(false);
      }
      setPosts((prev) => prev.concat(result));
      setFetching(false);
    } finally {
      delete abortControllerMap.current[nickname];
    }
  };

  const getSkeletons = (count: number) => {
    return Array(count)
      .fill(undefined)
      .map((v, i) => {
        return <FakePost key={`s${i}`} isProfile />;
      });
  };

  useEffect(() => {
    if (nickname) {
      fetchPostsMore();
    }

    return () => {
      if (abortControllerMap.current[nickname]) {
        abortControllerMap.current[nickname].abort();
        delete abortControllerMap.current[nickname];
      }
      setPosts([]);
    };
  }, [nickname]);

  return (
    <>
      <PostListContainer>
        {posts.length === 0 && !isFetching ? (
          <NoPost />
        ) : (
          posts.map((post) => (
            <div key={post.idx}>
              <Post key={post.idx} post={post} isProfile />
            </div>
          ))
        )}
        {isFetching && getSkeletons(3)}
        <Observer ref={observer} />
      </PostListContainer>
    </>
  );
};

export default PostList;
