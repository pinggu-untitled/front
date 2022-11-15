import styled from '@emotion/styled';

export const ImagesContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid #dfdfdf;
  display: grid;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const More = styled.div`
  position: relative;
  height: 200px;

  > .button {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 3000;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #fff;
    opacity: 0;
    transition: 0.2s;
  }

  &:hover .button {
    opacity: 1;
  }
`;

export const TextZone = styled.div`
  width: 100%;
  padding: 20px;

  & .title {
    font-size: 22px;
  }

  & .created-at {
    font-size: 14px;
    margin-top: 10px;
    color: gray;
  }

  & .content {
    font-size: 16px;
    margin: 20px 0;
    max-height: 400px;
    overflow: scroll;
  }

  & .meta {
    font-size: 14px;
    color: gray;
  }
`;

export const PostImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #dfdfdf;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
