import styled from '@emotion/styled';

export const Card = styled.div`
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid #dfdfdf;
  align-items: center;
  width: 100%;
  /* justify-content: space-between; */
`;

export const Info = styled.div`
  align-items: center;
  display: flex;

  > .nickname {
  font-size: 15px;
  font-weight: 600;
  margin-left: 10px;
 
  > .actions {
    display: flex;
    position: absolute;
    right: 10px;
    background-color:blue;
    top: 10px;
  }

`;
