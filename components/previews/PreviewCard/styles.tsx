import styled from '@emotion/styled';

export const Base = styled.div`
  display: inline-block;
  display: flex;
  flex-direction: column;

  > .title {
    margin-top: 5px;
    font-size: 14px;
    font-weight: 500;
  }
`;
export const ImageWrapper = styled.div`
  height: 120px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
