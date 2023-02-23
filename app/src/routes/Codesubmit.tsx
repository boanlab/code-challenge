import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Textarea } from "../Textarea";
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';

const Ace = styled(AceEditor)`
  width:100px;
  height:100px;
`;
const Container = styled.div`
  display: flex;
  width:80%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  position: relative;
`;
const Form = styled.form`
  display: flex;
  flex:1;
  flex-direction: column;
  align-items: center;
`;
const Codebox = styled.textarea``;
const Button = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
`;
const Button2 = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Select = styled.select`
  width: 100px;
  height: 30px;
`;
const SelectButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;
interface QuizId {
  quizId: string;
  code: string;
}
function Codesubmit({ quizId, code }: QuizId) {
  const [color, setColor] = useState<string>("monokai");
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<String>("python");
  const [submit, setSubmit] = useState(false);
  const editorRef = useRef(null);
  const [code1, setCode1] = useState<string>('');

  const handleCodeChange = (newCode:string) => {
    setCode1(newCode);
  };
  const colorChange = ()=>{
    if(color=="monokai"){
      setColor("github");
    }
    else{
      setColor("monokai")
    }
  }
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // const value = event.currentTarget.value;
    const {
      currentTarget: { value }
    } = event;
    setValue(value);
  };
  console.log(code1)
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var file = {
      code1,
      selectedOption,
      quizId
    };
    axios
      .post("http://10.0.20.119:8080/code", file)
      .then(function (response) {})
      .catch((err) => console.log(err));
    setSubmit(!submit);
  };
  // useEffect(() => {
  // }, []);
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.value;
    setSelectedOption(index);
    if (index === "java") {
      setCode1(
        `public class Main {\n public static void main(String[] args) {\n\n }\n}`
      );
    } else {
      setCode1("");
    }
  };
  const clear = (event: React.MouseEvent<HTMLElement>) => {
    setCode1("");
  };
  const load = (event: React.MouseEvent<HTMLElement>) => {
    setCode1(code);
  };
  return (
    <>
      <Container>
        <Form method="POST" action="submit" onSubmit={onSubmit}>
          <SelectButton>
            <Select onChange={selectChange} required>
              <option selected value="python">
                Python
              </option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </Select>
            <ButtonBox>
              {!submit ? <Button>Send Code</Button> : null}
              {submit ? (
                <Link
                  to={{
                    pathname: `/all/${quizId}/result`,
                    state: { quizId }
                  }}
                >
                  <Button>결과 보러가기</Button>
                </Link>
              ) : null}
              <Button2 type="button" onClick={clear}>
                초기화
              </Button2>
              <Button2 type="button" onClick={load}>
                코드 가져오기
              </Button2>
            </ButtonBox>
          </SelectButton>
          {/* <Codebox rows={50} cols={100} onChange={onChange} required /> */}
          {/* <Textarea
            name="test-textarea"
            value={value}
            onValueChange={(value: string) => setValue(value)}
            numOfLines={40}
          /> */}
          {selectedOption==='cpp'?<AceEditor
            placeholder="여기에 코드를 입력해주세요"
            mode='c_cpp'
            theme={color}
            value={code1}
            fontSize={20}
            onChange={handleCodeChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />:<AceEditor
            placeholder="여기에 코드를 입력해주세요"
            mode={selectedOption}
            theme={color}
            value={code1}
            fontSize={20}
            onChange={handleCodeChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
          />}
          
        </Form>
        <Button onClick={colorChange}>색 변경</Button>
      </Container>
    </>
  );
}
export default Codesubmit;
