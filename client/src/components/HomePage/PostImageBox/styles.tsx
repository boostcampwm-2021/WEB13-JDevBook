import styled, { css } from 'styled-components';
import { PostImageBoxStyle } from 'types/post';

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const CropCenter = styled.div<PostImageBoxStyle>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  box-sizing: border-box;

  ${({ leftBorder, rightBorder, topBorder, bottomBorder }) => css`
    border-left: ${leftBorder && `1px solid white`};
    border-right: ${rightBorder && `1px solid white`};
    border-top: ${topBorder && `1px solid white`};
    border-bottom: ${bottomBorder && `1px solid white`};
  `}
`;

export { FlexWrap, CropCenter };
