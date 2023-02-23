import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Quiz from "./routes/Quiz";
import Allquiz from "./routes/All";
import Stepquiz from "./routes/Popular";
import Typequiz from "./routes/Hard";
import MemberInfo from "./routes/Popular";
import Codesubmit from "./routes/Codesubmit";
import Result from "./routes/Result";
import Manager from "./routes/Manager";
import JoinForm from "./routes/SignUpForm";
import LoginForm from "./routes/LoginForm";
import ManagerM from "./routes/ManagerM";
import ManagerN from "./routes/ManagerN";
import Testcase from "./routes/Testcase";
import MyPage from "./routes/MyPage";
import Hardquiz from "./routes/Hard";
import Unique from "./routes/Unique";
import GroupQuiz from "./routes/GroupQuiz";
import MyPage2 from "./routes/MyPage2";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/testcase">
          <Testcase></Testcase>
        </Route>
        <Route path="/MyPage2">
          <MyPage2></MyPage2>
        </Route>
        <Route path="/managerM">
          <ManagerM></ManagerM>
        </Route>
        <Route path="/managerN">
          <ManagerN></ManagerN>
        </Route>
        <Route path="/manager">
          <Manager></Manager>
        </Route>
        <Route path="/all/:quizId/result">
          <Result></Result>
        </Route>
        <Route path="/all/:quizId/">
          <Quiz></Quiz>
        </Route>
        <Route path="/all">
          <Allquiz />
        </Route>
        <Route path="/popular">
          <Stepquiz />
        </Route>
        <Route path="/hard">
          <Hardquiz />
        </Route>
        <Route path="/unique">
          <Unique />
        </Route>
        <Route path="/signup">
          <JoinForm />
        </Route>
        <Route path="/loginForm">
          <LoginForm />
        </Route>
        <Route path="/myPage">
          <MyPage />
        </Route>
        <Route path="/groupQuiz">
          <GroupQuiz />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
