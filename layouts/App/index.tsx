import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@layouts/AppLayout';
import loadable from '@loadable/component';

const Home = loadable(() => import('@pages/Home'));
const Explore = loadable(() => import('@pages/Explore'));
const Profile = loadable(() => import('@pages/Profile'));
const ProfilePosts = loadable(() => import('@pages/ProfilePosts'));
const ProfileMyPings = loadable(() => import('@pages/ProfileMyPings'));
const ProfileFriends = loadable(() => import('@pages/ProfileFriends'));
const MyPingsNew = loadable(() => import('@pages/MyPingsNew'));
const MyPingsDetail = loadable(() => import('@pages/MyPingsDetail'));
const MyPingsEdit = loadable(() => import('@pages/MyPingsEdit'));
const Chatrooms = loadable(() => import('@pages/Chatrooms'));
const Settings = loadable(() => import('@pages/Settings'));
const More = loadable(() => import('@pages/More'));
const Results = loadable(() => import('@pages/Results'));
const PostsDetail = loadable(() => import('@pages/PostsDetail'));
const PostsNew = loadable(() => import('@pages/PostsNew'));
const Intro = loadable(() => import('@pages/Intro'));
const Introduce = loadable(() => import('@pages/Introduce'));
const PostsEdit = loadable(() => import('@pages/PostsEdit'));
const ProfileEdit = loadable(() => import('@pages/ProfileEdit'));
const NotFound = loadable(() => import('@pages/NotFound'));

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path={'/home'} element={<Home />} />
        <Route path={'/explore'} element={<Explore />} />
        <Route path={'/results'} element={<Results />} />
        <Route path={'/:userId'} element={<Profile />}>
          <Route index element={<ProfilePosts />} />
          <Route path={'/:userId/mypings'} element={<ProfileMyPings />} />
          <Route path={'/:userId/friends'} element={<ProfileFriends />} />
        </Route>
        <Route path={'/mypings/new'} element={<MyPingsNew />} />
        <Route path={'/mypings/:mypingsId'} element={<MyPingsDetail />} />
        <Route path={'/mypings/:mypingsId/edit'} element={<MyPingsEdit />} />
        <Route path={'/:userId/edit'} element={<ProfileEdit />} />
        <Route path={'/chatrooms'} element={<Chatrooms />} />
        <Route path={'/chatrooms/:chatroomId'} element={<Chatrooms />} />
        <Route path={'/intro'} element={<Intro />} />
        <Route path={'/settings'} element={<Settings />} />
        <Route path={'/more'} element={<More />} />
        <Route path={'/posts/:postId/edit'} element={<PostsEdit />} />
        <Route path={'/posts/:postId'} element={<PostsDetail />} />
        <Route path={'/posts/new'} element={<PostsNew />} />
        <Route path={'/introduce'} element={<Introduce />} />
        <Route path={'/#notfound'} element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
