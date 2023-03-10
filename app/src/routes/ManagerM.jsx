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
      alert("???????????? ?????????????????????.");
      //manager ???????????? ???????????????
    })
      .catch(function (error) {
        alert("id??? ???????????? ????????? ?????? ???????????? ?????? ????????? ?????????.");
      });
  }
  const modiDB = async () => {
    axios.get('/manager/modi/run', {
      params: {
        title, timelimit, memlimit, input, output, explanation, questionnum: location.questionnum
      }
    }).then(function (response) {
      alert("?????? ????????? ??????????????????.");
      history.push('/manager')
      //manager ???????????? ???????????????
    })
      .catch(function (error) {
        alert("?????? ????????? ??????????????????.");
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
          ?????? ?????? : {location.questionnum}
        </Title>
        <Inputdiv>
          ????????????
          <input placeholder='?????? ??????' name="title" value={title} onChange={e => setTitle(e.target.value)} />
          ????????????(ms)
          <input placeholder='?????? ??????' name="timelimit" value={timelimit} onChange={e => setTimelimit(e.target.value)} />
          ???????????????(kb)
          <input placeholder='????????? ??????' name="memlimit" value={memlimit} onChange={e => setMemlimit(e.target.value)} />
        </Inputdiv>
        <div>
          ?????? ??????
          <textarea cols={30} rows={5} placeholder='?????? ??????' name="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} />
          ?????? ??????
          <textarea rows={5} placeholder='?????? ??????' name="input" value={input} onChange={e => setInput(e.target.value)} />
          ?????? ??????
          <textarea rows={5} placeholder='?????? ??????' name="output" value={output} onChange={e => setOutput(e.target.value)} />
        </div>
        <Button onClick={() => modiDB()}>?????? ????????????</Button>
        {groupName===undefined? <div>?????? ????????? ????????? ??????</div> :
        <div>
        <input placeholder="?????? ????????? id" name="newUser" value={newUser} onChange={e => setNewUser(e.target.value)}>
          </input><Button1 onClick={() => addMember()}>?????? ????????? ?????? </Button1>
        <div>????????? ??????</div>
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