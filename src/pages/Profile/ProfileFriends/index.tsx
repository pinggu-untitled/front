import PageHeader from '@components/headers/PageMainHeader';
import { PageMain } from '@pages/Home/style';
import { useSession } from '@contexts/SessionContext';
import PagePrevHeader from '@components/headers/PagePrevHeader';
import { IMenuItem } from '@components/Layout/MenuList/MenuItem';
import { BiEditAlt, BiLinkAlt } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileSummary from '@components/Profile/ProfileSummary';
import { IoMdGrid } from 'react-icons/io';
import { MdBookmarkBorder } from 'react-icons/md';
import { TbUsers } from 'react-icons/tb';
import TapZone from '@components/Profile/TapZone';
const ProfileFriends = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { session } = useSession();

  if (!userId) return <div>로딩중...</div>;
  return <div>zzzz</div>;
};

export default ProfileFriends;
