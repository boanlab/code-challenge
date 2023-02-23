import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Header = styled.header`
  z-index: 10;
  width: 100%;
  height: 6%;
  background-color: #8c7ae6;
  display: flex;
  align-items: center;
  position: relative;
  position: fixed;
  top: 0;
`;

const Logo = styled.div`
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 200px;
`;

const Menu = styled.div`
  margin-right: 40px;
`;

const LoginBtn = styled.button`
  width: 55px;
  height: 35px;
  border-radius: 10px;
  border: none;
  position: absolute;
  right: 10px;
  cursor: pointer;
  &:hover {
    background-color: navy;
    color: white;
  }
`;

const SignUpBtn = styled.button`
  width: 55px;
  height: 35px;
  border-radius: 10px;
  border: none;
  position: absolute;
  right: 70px;
  cursor: pointer;
  &:hover {
    background-color: navy;
    color: white;
  }
`;
const ManagerBtn = styled.button`
  width: 55px;
  height: 35px;
  border-radius: 10px;
  border: none;
  position: absolute;
  right: 130px;
  cursor: pointer;
  &:hover {
    background-color: navy;
    color: white;
  }
`;
const ButtonBox = styled.div``;

function Navbar() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [author_id, setAuthor_id] = useState("");
  axios.post("/session_check").then(function (response) {
    setAuthor_id(response.data.author_id);
    setId(response.data.uid);
  });
  const logout = () => {
    axios.post("/logout");
    history.push("/loginForm");
  };
  return (
    <>
      <Header>
        <Logo>
          <Link to="/">CodeChallenge</Link>
        </Logo>
        <Nav>
          <Menu>
            <Link to="/all">전체 문제</Link>
          </Menu>
          <Menu>
            <Link to="/popular">인기 문제</Link>
          </Menu>
          <Menu>
            <Link to="/hard">정답률 높은 문제</Link>
          </Menu>
          <Menu>
            <Link to="/unique">푼 사람이 없는 문제</Link>
          </Menu>
          {id === undefined ? (
            <>
              <SignUpBtn>
                <Link to="/signup">Sign Up</Link>
              </SignUpBtn>
              <LoginBtn>
                <Link to="/loginForm">LogIn</Link>
              </LoginBtn>
            </>
          ) : author_id.length == 3 ? (
            <>
              <ManagerBtn>
                <Link to="/Manager">Manager</Link>
              </ManagerBtn>
              <SignUpBtn onClick={logout}>Logout</SignUpBtn>
              <LoginBtn>
                <Link to="/myPage">myPage</Link>
              </LoginBtn>
            </>
          ) : (
            <>
              <SignUpBtn onClick={logout}>Logout</SignUpBtn>
              <LoginBtn>
                <Link to="/myPage">myPage</Link>
              </LoginBtn>
            </>
          )}
        </Nav>
      </Header>
    </>
  );
}

export default Navbar;
