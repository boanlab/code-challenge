import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import Navbar from '../Navbar';
const Container = styled.div`
height:100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #f5f4f0;
`;
const Contents = styled.div`
width:30%;
height:40%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const Top = styled.div`
  flex:1;
  display: flex;
  width: 50%;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;
const Text = styled.p`
  flex:1;
  font-size: 40px;
  color: black;
`;
const Middle = styled.div`
flex:4;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
`;
const InputBox = styled.input`
  height:60px;
  width:100%;
  display: flex;
  flex:1;
  flex-direction: column;
  justify-content: space-around;
  padding:10px;
  border:1px solid black;
`;
const Bottom = styled.div`
  flex:1;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: right;
  text-align: right;
`;
const Button = styled.button`
  flex-direction: row;
  margin:10px;
  font-weight: bold;
  justify-content : center;
  background-color: white;
  border : 1px solid black;
  height: 80%;
  width: 20%;
  &:hover{
    background-color : black;
    color : white;
    cursor: pointer;
    }
`;
function LoginForm() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const history = useHistory()
    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const onClickLogin = () => {
        axios.post('/login_process', {
            loginID : inputId,
            loginPassword : inputPw
        }, {
            params: {
            'loginID': inputId,
            'loginPassword': inputPw
            }
        })
        .then(res => {
            if(res.data.message == "success"){
                history.push("/")
              }
            else{
                alert("id 비밀번호를 다시 확인해주세요.")
                history.push("/loginForm")
            }
        })
        .catch()
    }
    return(
        <Container>
            <Navbar/>
            <Contents>
            <Top><Text>로그인</Text></Top>
            <Middle>
                <div>
                    {/* <label htmlFor='input_id'>ID : </label> */}
                    <InputBox placeholder="id를 입력해 주세요" type='text' name='input_id' value={inputId} onChange={handleInputId} />
                </div>
                <div>
                    {/* <label htmlFor='input_pw'>PW : </label> */}
                    <InputBox placeholder="password를 입력해주세요." type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
                </div>
            </Middle>
            <Bottom>
                <Button type='button' onClick={onClickLogin}>로그인</Button>
                <Button onClick={()=>{history.push('/signup')}}>회원가입</Button>
            </Bottom>
            </Contents>
        </Container>
    )
}
export default LoginForm;