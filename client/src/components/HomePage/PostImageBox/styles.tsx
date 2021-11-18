import styled, { css } from 'styled-components';

const FlexWrap = styled.div`
  display: flex;
  align-items: center;
`;

const CropCenter = styled.div<{ width: number; height: number }>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export { FlexWrap, CropCenter };
