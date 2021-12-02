import styled, { keyframes } from 'styled-components';

import { ClickableProfilePhoto } from 'components/common';
import style from 'theme/style';
import { IComment } from 'types/comment';
import textUtil from 'utils/textUtil';

const Animation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const CommentsWrap = styled.div`
  display: flex;
  align-items: center;
  padding: ${style.padding.small} ${style.padding.small} 0 ${style.padding.small};

  animation-name: ${Animation};
  animation-duration: 0.5s;
  color: ${(props) => props.theme.black};
`;

const CommentBox = styled.div`
  display: inline-block;
  border-radius: 15px;
  background-color: ${(props) => props.theme.lightgray};
  margin-left: ${style.margin.normal};
  padding-left: ${style.padding.small};
  padding-right: ${style.padding.small};
`;

const CommentContent = styled.div`
  margin: ${style.margin.smallest};
  word-break: break-word;
`;

const CommentTitle = styled.div`
  display: flex;
`;

const CommentDate = styled.div`
  margin-left: 6px;
  padding-top: 2.5px;
  font-size: ${style.font.small};
  opacity: 0.5;
`;

const CommentText = styled.div`
  font-weight: normal;
`;

const CommentListView = ({ commentList }: { commentList: IComment[] }) => {
  const comments = commentList.map((comment: IComment, idx: number) => (
    <CommentsWrap key={idx}>
      <ClickableProfilePhoto userName={comment.writer} size={'30px'} />
      <CommentBox>
        <CommentContent>
          <CommentTitle>
            {comment.writer}
            <CommentDate>{textUtil.timeToString(comment.createdAt)}</CommentDate>
          </CommentTitle>
          <CommentText>{comment.text}</CommentText>
        </CommentContent>
      </CommentBox>
    </CommentsWrap>
  ));
  return <>{comments}</>;
};

export default CommentListView;
