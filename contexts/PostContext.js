import React, { createContext, useContext, useReducer } from 'react';

const initialValue = {};
const postReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
    // return state.concat(action.)
  }
};

const PostStateContext = createContext();
const PostDispatchContext = createContext();

export const usePostState = () => {
  const context = useContext(PostStateContext);
  if (!context) {
    throw new Error('Cannot find PostStateContext');
  }

  return context;
};

export const usePostDispatch = () => {
  const context = useContext(PostDispatchContext);

  if (!context) {
    throw new Error('Cannot find PostStateContext');
  }

  return context;
};

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initialValue);
  return (
    <PostStateContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>{children}</PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
};
