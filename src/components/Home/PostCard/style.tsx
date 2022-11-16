import styled from '@emotion/styled';

export const Card = styled.li`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  display: flex;
`;

export const Inner = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 6px 0;
`;

export const PostImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  position: relative;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  padding: 6px 0;
  height: 100%;

  > h3 {
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  > .created-at {
    font-size: 12px;
    color: gray;
    font-weight: 500;
    margin-top: 4px;
  }
`;

export const TotalCount = styled.div`
  padding: 5px 8px 3px;
  font-size: 11px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  color: #fff;
  border-radius: 20px;
  top: 5px;
  right: 5px;
  font-weight: 400;
  > .current {
    color: #dfdfdf;
  }
`;

export const CountsInfo = styled.div`
  display: inline-block;
  font-size: 14px;
  color: gray;
  position: absolute;
  bottom: 6px;

  > .info {
    margin-right: 8px;
    & .current {
      display: inline-block;
      color: #191919;
      font-weight: 700;
      font-size: 14px;
      transform: translateY(0.7px);
    }
  }
`;

export const NoMedia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #bdbdbd;
  width: 100%;
  height: 100%;
  font-size: 26px;
`;
