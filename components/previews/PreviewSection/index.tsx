import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { Base, Header, InnerContent } from './styles';

interface IProps {
  title: string;
  url: string;
  children: React.ReactNode;
}

const PreviewSection: FC<IProps> = ({ title, url, children }) => {
  const navigate = useNavigate();

  return (
    <Base onClick={() => navigate(url)}>
      <Header>
        <h3>{title}</h3>
        <span className="arrow-ico">
          <IoIosArrowForward />
        </span>
      </Header>
      <InnerContent>{children}</InnerContent>
    </Base>
  );
};

export default PreviewSection;
