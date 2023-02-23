import Navbar from "../Navbar";
import { useState } from 'react';
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";


const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  padding: 20px 0px;
`;

const Box = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  font-size: 20px;
`;

const ExBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 50px;
`

const Inputdiv = styled.div`
  margin-bottom: 30px;
`

const Button = styled.button`
  width: 70px;
  height: 40px;
  margin-top: 30px;
  cursor: pointer;
`

function ManagerN() {
  const [title, setTitle] = useState("")
  const [timelimit, setTimelimit] = useState("")
  const [memlimit, setMemlimit] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [explanation, setExplanation] = useState("")
  const [groupName, setGroupName] = useState("")
  const history = useHistory();

  const testapp = async () => {
    axios.get('/manager/tc', {
      params: {
        title
      }
    })
  }
  const insert = async () => {
    axios.get('/manager/insert'
      , {
        params: {
          title, timelimit, memlimit, input, output, explanation, input, output, groupName
        }
      }
    ).then(function (response) {
      testapp()
      alert("문제 추가에 성공했습니다.")
      history.push('/manager')


    })
      .catch(function (error) {
        alert("문제 추가에 실패했습니다.");
      });
  }
  const test = async () => {
    axios.get('/testcase', {
      params: {
        questionnum: "9"
      }
    })
  }
  
  return (
    <div>
      <Navbar />
      <Parent>
        <Title>
          문제 추가
        </Title>
        <Main>
          <Header><div><input  maxLength={15} placeholder='문제 이름' name="title" value={title} onChange={e => setTitle(e.target.value)} /></div></Header>
          <Content><textarea cols={100} rows={20} placeholder='문제 설명' name="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} /></Content>
          <ExBox>
            <Box>예제 입력 : <textarea rows={5} placeholder='예제 입력' name="input" value={input} onChange={e => setInput(e.target.value)} /></Box>
            <Box>예제 출력 : <textarea rows={5} placeholder='예제 출력' name="output" value={output} onChange={e => setOutput(e.target.value)} /></Box>
          </ExBox>
          <Footer><div>시간 제한(ms) : <input placeholder='시간 제한(ms)' name="timelimit" value={timelimit} onChange={e => setTimelimit(e.target.value)} /> 메모리 제한(kb) : <input placeholder='메모리 제한(kb)' name="memlimit" value={memlimit} onChange={e => setMemlimit(e.target.value)} /></div></Footer>
          {/* <Inputdiv>
            <input placeholder='문제 이름' name="title" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder='시간 제한' name="timelimit" value={timelimit} onChange={e => setTimelimit(e.target.value)} />
            <input placeholder='메모리 제한' name="memlimit" value={memlimit} onChange={e => setMemlimit(e.target.value)} />
          </Inputdiv>
          <div>
            <textarea cols={30} rows={5} placeholder='문제 설명' name="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
            <textarea rows={5} placeholder='예제 입력' name="input" value={input} onChange={e => setInput(e.target.value)} />
            <textarea rows={5} placeholder='예제 출력' name="output" value={output} onChange={e => setOutput(e.target.value)} />
          </div> */}

          
          <br/>
          <br/>
          <p>그룹문제가 아닐 시 아래 내용은 생략 해 주세요<br/>그룹문제는 관리자가 지정한 사용자만 문제를 열람 할 수 있습니다.<br/>
          구성원 추가는 문제 수정 페이지에서 할 수 있습니다.</p>
          <br/>
        <input style={{marginBottom:20}} placeholder='그룹 이름' name="groupName" value={groupName} onChange={e => setGroupName(e.target.value)} />
        <Button onClick={() => insert()}>추가</Button>
        </Main>
      </Parent>
    </div>

  );

}
export default ManagerN