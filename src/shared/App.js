import React from 'react';
import './App.css';
import {Flex} from '../elements'
import { Route } from "react-router";
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
const App = () => {

  return (
    <Flex styles={{border: "1px solid red", minHeight: "100vh"}}>
      <Route path="/mypage" exact component={MyPage}></Route>
      <Route path="/login" exact component={Login}></Route>
    </Flex>
  );
}

export default App;
