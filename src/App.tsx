import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Introduce from './pages/Introduce';
import SessionProvider from '@contexts/SessionContext';
import Chatrooms from '@pages/Chatrooms';
import PostNew from '@pages/PostNew';
import PostDetail from '@pages/PostDetail';
import More from '@pages/More';
import Explore from '@pages/Explore';
import ProfilePosts from '@pages/Profile/ProfilePosts';
import ProfileFriends from '@pages/Profile/ProfileFriends';
import ProfileMypings from '@pages/Profile/ProfileMypings';
import MypingsDetail from '@pages/MypingsDetail';
import MypingsNew from '@pages/MypingsNew';
import MypingsEdit from '@pages/MypingsEdit';

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={'/explore'} element={<Explore />} />
            <Route path={'/chatrooms'} element={<Chatrooms />} />
            <Route path={'/posts/new'} element={<PostNew />} />
            <Route path={'/posts/:postId'} element={<PostDetail />} />
            <Route path={'/mypings/new'} element={<MypingsNew />} />
            <Route path={'/mypings/:mypingsId'} element={<MypingsDetail />} />
            <Route path={'/mypings/:mypingsId/edit'} element={<MypingsEdit />} />
            <Route path={'/more'} element={<More />} />
            <Route path={'/:userId'} element={<Profile />}>
              <Route index element={<ProfilePosts />} />
              <Route path={'/:userId/mypings'} element={<ProfileMypings />} />
              <Route path={'/:userId/friends'} element={<ProfileFriends />} />
            </Route>
          </Route>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/introduce'} element={<Introduce />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
