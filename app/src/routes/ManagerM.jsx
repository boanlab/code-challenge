import Navbar from "../Navbar";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosHeaders } from "axios";
import styled from 'styled-components';


const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 50px;
`

const Inputdiv = styled.div`
  margin-bottom: 30px;
`

const Button = styled.button`
  width: 120px;
  height: 40px;
  margin-top: 30px;
  cursor: pointer;
`
const Button1 = styled.button`
  width: 120px;
  height: 40px;
  margin-top: 30px;
  text-align: right;
  cursor: pointer;
`

function ManagerM() {
  const [title, setTitle] = useState("")
  const [timelimit, setTimelimit] = useState("")
  const [memlimit, setMemlimit] = useState("")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [explanation, setExplanation] = useState("")
  const [groupName, setGroupName] = useState("")
  const [newUser,setNewUser] = useState("");
  const [user,setUser] = useState([]);
  const location = useLocation().state;
  const history = useHistory()


  // ${location.questionnum}
  const fetchGroup = async ()=>{
    axios.get('/manager/groupId',{ params:{questionnum:location.questionnum}}).then(function (response) {
      console.log(response.data)
      setUser(response.data)
    })
  }
  const fetchResult = async () => {
    axios.get(`/manager/modi`, { params: { questionnum: location.questionnum } }).then(function (response) {
      console.log(response.data)
      setTitle(response.data[0].title)
      setTimelimit(response.data[0].timelimit)
      setMemlimit(response.data[0].memlimit)
      setInput(response.data[0].input)
      setOutput(response.data[0].output)
      setExplanation(response.data[0].explanation)
      setGroupName(response.data[0].groupName)
      // setState({title : response.data[0].title,
      //   timelimit : response.data[0].timelimit,
      //   memlimit : response.data[0].memlimit,
      //   input : response.data[0].input,
      //   output : response.data[0].output,
      //   explanation : response.data[0].explanation
      // })
    });
  };
  const addMember = async()=>{
    axios.get('/manager/addMember', {
      params: {
        groupName,newUser
      }
    }).then(function (response) {
      alert("구성원이 추가되었습니다.");
      //manager 페이지로 리다이렉트
    })
      .catch(function (error) {
        alert("id가 존재하지 않거나 이미 포함되어 있는 구성원 입니다.");
      });
  }
  const modiDB = async () => {
    axios.get('/manager/modi/run', {
      params: {
        title, timelimit, memlimit, input, output, explanation, questionnum: location.questionnum
      }
    }).then(function (response) {
      alert("문제 수정에 성공했습니다.");
      history.push('/manager')
      //manager 페이지로 리다이렉트
    })
      .catch(function (error) {
        alert("문제 수정에 실패했습니다.");
      });
  }

  useEffect(() => {
    fetchResult()
    fetchGroup()
    console.log(location.questionnum, title, timelimit, memlimit, input, output, explanation)
  }, []);

  return (
    <div>
      <Navbar />
      <Main>
        <Title>
          문제 수정 : {location.questionnum}
        </Title>
        <Inputdiv>
          문제이름
          <input placeholder='문제 이름' name="title" value={title} onChange={e => setTitle(e.target.value)} />
          시간제한(ms)
          <input placeholder='시간 제한' name="timelimit" value={timelimit} onChange={e => setTimelimit(e.target.value)} />
          메모리제한(kb)
          <input placeholder='메모리 제한' name="memlimit" value={memlimit} onChange={e => setMemlimit(e.target.value)} />
        </Inputdiv>
        <div>
          문제 설명
          <textarea cols={30} rows={5} placeholder='문제 설명' name="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
          예제 입력
          <textarea rows={5} placeholder='예제 입력' name="input" value={input} onChange={e => setInput(e.target.value)} />
          예제 출력
          <textarea rows={5} placeholder='예제 출력' name="output" value={output} onChange={e => setOutput(e.target.value)} />
        </div>
        <Button onClick={() => modiDB()}>문제 수정하기</Button>
        {groupName===undefined? <div>없음 표시용 나중에 삭제</div> :
        <div>
        <input placeholder="추가 구성원 id" name="newUser" value={newUser} onChange={e => setNewUser(e.target.value)}>
          </input><Button1 onClick={() => addMember()}>그룹 구성원 추가 </Button1>
        <div>구성원 명단</div>
        {user?.map((v) => (
            <div>{v.groupUserId}</div>
          ))}
        </div>
        }
        
        
      </Main>
    </div>
  );
}

export default ManagerM