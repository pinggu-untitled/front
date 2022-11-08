import {
  Base,
  Info,
  ToggleBall,
  ToggleButton,
} from '@components/PostNew/IsPrivateInput/style';
import { ProfileAvatar } from '@components/Layout/SideNavigation/ProfileButtonModal/style';
import mediaPath from '@utils/mediaPath';
import { useSession } from '@contexts/SessionContext';
import { DispatchWithoutAction } from 'react';

interface IProps {
  value: boolean;
  onChange: DispatchWithoutAction;
}

const IsPrivateInput = ({ value, onChange }: IProps) => {
  const { session } = useSession();
  return (
    <Base>
      <ProfileAvatar style={{ width: '46px', height: '46px' }}>
        <img
          src={mediaPath(session?.profile_image_url)}
          alt={session?.nickname}
        />
      </ProfileAvatar>
      <Info>
        <span className={'nickname'}>{session?.nickname}</span>
        <ToggleButton active={value}>
          <ToggleBall />
          <span className={'label'}>{value ? '나에게만' : '모두에게'}</span>
          <input type={'checkbox'} checked={value} onChange={onChange} />
        </ToggleButton>
      </Info>
    </Base>
  );
};

export default IsPrivateInput;
