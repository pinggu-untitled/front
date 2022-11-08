import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const Li = styled.li`
  > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 0;

    > .icon {
      font-size: 21px;
      margin-bottom: 3px;
    }
    > .title {
      margin: 0;
      font-size: 11px;
      transform: translateY(-4px);
    }
  }
`;
