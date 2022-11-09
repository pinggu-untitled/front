import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import styled from '@emotion/styled';

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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  > h3 {
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    height: 50px;
    display: flex;
    align-items: center;
  }

  > .arrow-ico {
    color: gray;
  }
`;

export const InnerContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0 20px 20px;
`;

const PreviewSection: FC<IProps> = ({ title, url, children }) => {
  const navigate = useNavigate();

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Base onClick={() => navigate(url)}>
      <Header>
        <h3>{title}</h3>
        <span className="arrow-ico">
          <IoIosArrowForward />
        </span>
      </Header>
      <InnerContent onClick={stopPropagation}>{children}</InnerContent>
    </Base>
  );
};

export default PreviewSection;
