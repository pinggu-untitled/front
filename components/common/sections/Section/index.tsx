import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
interface IProps {
  title: string;
  url: string;
  children: React.ReactNode;
}

export const Base = styled.section`
  width: 100%;
  border-top: 1px solid #dfdfdf;
  cursor: pointer;

  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #dfdfdf;

    h3 {
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      height: 50px;
      display: flex;
      align-items: center;
    }

    > .navigate-icon {
      color: gray;
    }
  }
`;

const Section: FC<IProps> = ({ title, url, children }) => {
  const navigate = useNavigate();
  return (
    <Base onClick={() => navigate(url)}>
      <div className="header">
        <h3>{title}</h3>
        <span className="navigate-icon">
          <IoIosArrowForward />
        </span>
      </div>
      <div>{children}</div>
    </Base>
  );
};

export default Section;
