import axios from "axios";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top:3%;
  height:100%;
  flex-direction: column;
  justify-content: center;
  background-color: #f5f4f0;
`;

const Head = styled.div`
  margin-top:10%;
  display: flex;
  height:40%;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  width:40%;
  margin:auto;
`;

const Name = styled.div`
  flex:1;
  font-size : 40px;
  text-align: start;
  color:black;
`;
const State = styled.div`
  font-size : 25px;
  flex:1;
  text-align: start;
  color:black;
`;

const Middle = styled.div`
  display: flex;
  flex:3;
  flex-direction: row;
  height:40%;
  justify-content: space-around;
`;

const Left = styled.div`
  display: flex;
  flex:1;
  height:500px;
  background-color: antiquewhite;
  border: 1px solid black;
  padding:2%;
  border-radius: 20px;
  justify-content: center;
  flex-direction:column;
  margin:6%;
  box-shadow: inset;
`;
const Left_C = styled.div`
  flex:1;
  color:black;
`;

const Center = styled.div`
  display:flex;
  flex:3;
  width:60%;
  flex-direction: column;
  border:1px solid black;
  background-color: aliceblue;
  border-radius: 20px;
  margin:6%;

`;
const Graph = styled.div`
  display:flex;
  flex:1;
  margin:10%;
`;
const Solve = styled.div`
  display:flex;
  flex:1;
  color:black;
  flex-direction: column;
  margin:10%;

`;
const List = styled.div`
  color:black;

`;

function MyPage() {
  const history = useHistory();
  const location = useLocation().state;
  const [data,setData] = useState([])
  const [profile,setProfile] = useState({})
  const [groupName, setGroupName] = useState([])
  const load = async () => {
    axios.get('/profile2',{params:{id:location.id}}).then(function(response){
      console.log(response.data[0])
      setProfile(response.data[0])
    })
    axios.get(`/mySolve2`,{params:{id:location.id}}).then(function (response) {
      console.log(response.data)
      setData(response.data)
    });
    axios.get(`/group2`,{params:{id:location.id}}).then(function (response) {
      console.log('response')
      console.log(response.data)
      setGroupName(response.data)
    });
  }
  const groupSelect = async(groupname) => {
    axios.get('/groupSelect',
    {params: {groupname : groupname}}
    ).then(function(response){
      history.push('/groupQuiz')
    })
  }

  useEffect(() => {
    load()
  },[]);
  return (
    <>
      <Navbar></Navbar>
      <Container>
      <Head>
        <Name>{profile.name}</Name>
        <State>{profile.state}</State>
      </Head>
      <Middle>
        <Left>
              <Left_C>id : {profile.id}</Left_C>
              <Left_C>email : {profile.email}</Left_C>
              <Left_C>group :
            {groupName?.map((v)=>(
              <div>{v.groupname}</div>
            ))}
            </Left_C>
        </Left>
        <Center>
          <Graph>
            {/* 그래프 등등(nivo chart) */}
            </Graph>
          <Solve>해결한 문제 :
            <List>
            {data?.map((v)=>(
              <div>
              <Link to={`/all/${v.questionnum}/quiz`} >{v.questionnum}</Link>
              , </div>
            ))}
            </List>
          </Solve>
          
        </Center>
      </Middle>
      </Container>
    </>
  );
}

export default MyPage;