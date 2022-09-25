import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '@layouts/AppLayout';
import loadable from '@loadable/component';

const Home = loadable(() => import('@pages/Home'));
const Explore = loadable(() => import('@pages/Explore'));
const Nickname = loadable(() => import('@pages/Nickname')); // nested-router - mypings
const Chatrooms = loadable(() => import('@pages/Chatrooms'));
const Settings = loadable(() => import('@pages/Settings'));
const More = loadable(() => import('@pages/More'));
const Results = loadable(() => import('@pages/Results'));
const Posts = loadable(() => import('@pages/Posts'));
const PostsNew = loadable(() => import('@pages/PostsNew'));
const Intro = loadable(() => import('@pages/Intro'));

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route index element={<Home />} />
        <Route path={'/explore'} element={<Explore />} />
        <Route path={'/results'} element={<Results />} />
        <Route path={'/:nickname'} element={<Nickname />} />
        <Route path={'/chatrooms'} element={<Chatrooms />} />
        <Route path={'/chatrooms/:chatroomId'} element={<Chatrooms />} />
        <Route path={'/settings'} element={<Settings />} />
        <Route path={'/more'} element={<More />} />
        <Route path={'/intro'} element={<Intro />} />
        <Route path={'/posts/:postId'} element={<Posts />} />
        <Route path={'/posts/new'} element={<PostsNew />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
