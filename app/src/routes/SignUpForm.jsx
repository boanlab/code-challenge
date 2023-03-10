import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, TableBody, TableRow, TableCell, Container } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
// const TableCell = styled(TableCell)`
//   margin-left: 100px;
// `
const Input = styled.input`
  flex-direction: row;
  font-weight: bold;
  margin:5px;
  justify-content : center;
  background-color: white;
  border : 1px solid black;
  height: 30px;
  width: 50%;
  &:hover{
    background-color: #C4C2C2;
  }
`;
const Button = styled.button`
  flex-direction: row;
  margin:10px;
  font-weight: bold;
  justify-content : center;
  background-color: white;
  border : 1px solid black;
  height: 30px;
  width: 10%;
  &:hover{
    background-color: #C4C2C2;
  }
`;
const JoinForm = () => {
  const navigate = useHistory();
  const [formData, setFormData] = useState({
    userid: "",
    userpass: "",
    userpassck: "",
    username: "",
    userstate: "",
    usermanager: "No"
  });
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [idMessage, setIdMessage] = React.useState("");
  const [nameMessage, setNameMessage] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =  React.useState("");
  const [emailMessage, setEmailMessage] = React.useState("");
  const [isId, setIsId] = React.useState(false);
  const [isname, setIsName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [state,setState] = React.useState(false);
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12?????? ???????????? ?????? ????????? ????????? ?????????!");
      setIsId(false);
    } else {
      setIdMessage("??????????????? ????????? ?????????.");
      setIsId(true);
      setState(true);
    }
  };
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (currentName.length < 2 || currentName.length > 10) {
      setNameMessage("????????? 10?????? ????????? ??????????????????!");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("????????? ???????????? ?????????.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("??????????????? ???????????? ????????????.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("????????? ??????????????? ??????????????????.");
      setIsPasswordConfirm(true);
    }
  };
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("???????????? ????????? ???????????? ????????????!");
      setIsEmail(false);
    } else {
      setEmailMessage("?????? ????????? ????????? ?????????.");
      setIsEmail(true);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const onSumbit = (e) => {
    // form??? ?????? ????????? ???????????? ??????
    e.preventDefault();
    console.log(formData);
    // Input??? ?????? ????????? ????????????
    // ????????? ?????????????????? post??????
    addMember();
  };
  const [isDuplicate, SetDuplicate] = React.useState(false);
  const duplicate = async ()=>{
    axios.post("/duplicate",{params:{
      id:formData.userid
    }}).then(function(response){
      console.log(response.data)
      if(response.data.length===0){
        SetDuplicate(true);
        alert("????????? ????????? id?????????");
      }
      else{
        alert("?????? ???????????? id?????????.");
        SetDuplicate(false);
      }
    })
  }
  function addMember() {
    axios
      .post(`/join`, formData)
      .then((response) => {
        alert("?????????????????????.");
        navigate.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <Container style={{marginTop:80,width:700}}>
      <p style={{textAlign:"center",fontSize:40, marginBottom:60}}>????????????</p>
      <form onSubmit={onSumbit}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell style={{textAlign:'center'}}>
                <Input
                  name="userid"
                  type="text"
                  value={formData.userid}
                  onChange={onChangeId}
                />
                <button onClick={()=>duplicate()}>????????????</button>
                <p>{idMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>????????????</TableCell>
              <TableCell style={{textAlign:'center'}}>
                <Input
                  name="userpass"
                  type="password"
                  value={formData.userpass}
                  onChange={onChangePassword}
                />
                <p>{passwordMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>??????????????????</TableCell>
              <TableCell style={{textAlign:'center'}}>
                <Input
                  name="userpassck"
                  type="password"
                  value={formData.userpassck}
                  onChange={onChangePasswordConfirm}
                />
                <p>{passwordConfirmMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>??????</TableCell>
              <TableCell style={{textAlign:'center'}}>
                <Input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={onChangeName}
                />
                <p>{nameMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>?????????</TableCell>
              <TableCell style={{textAlign:'center'}}>
                <Input
                  name="usermail"
                  type="text"
                  value={formData.usermail}
                  onChange={onChangeEmail}
                />
                <p>{emailMessage}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>??????</TableCell>
              <TableCell style={{textAlign:'center'}}>
                <Input
                  name="userstate"
                  type="text"
                  value={formData.userstate}
                  onChange={onChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{textAlign:"right"}}>
            <Button type="submit" disabled={!(isId&&isEmail&&isname&&isPassword&&isPasswordConfirm&&isDuplicate)}>??????</Button>
            <Button type="reset">?????????</Button>
            <Button onClick={()=>{navigate.push('/LoginForm')}}>??????</Button>
          </div>
      </form>
    </Container>
  );
};
export default JoinForm;