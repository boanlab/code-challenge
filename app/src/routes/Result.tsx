import Navbar from "../Navbar";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import { useQuery } from "react-query";
import { StringDecoder } from "string_decoder";
const Code = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
`;
const Res = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Main = styled.div`
  height: 93vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoadingBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ResultInfo = styled.div`
  display: flex;
  align-items: center;
`;
interface IQuizId {
  quizId: string;
}
function Result() {
  const { state } = useLocation<IQuizId>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("");
  const [quesnum, setQuesnum] = useState("");
  const [submitter, setSubmitter] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");
  const [length, setLength] = useState("");
  const [quizId, setQuizId] = useState("");
  const [code, setCode] = useState("");
  console.log(state.quizId);
  useEffect(() => {
    setQuizId(state.quizId);
  }, []);
  const fetchResult = async () => {
    setError(null);
    axios
      .get("/solveDB", {
        params: {
          submitter: "12345",
          questionnum: state.quizId
        }
      })
      .then(function (response) {
        console.log("response:" + response.data[0]);
        setData(response.data[0]);
        setQuesnum(response.data[0].questionnum);
        setSubmitter(response.data[0].submitter);
        setTime(response.data[0].executiontime);
        setResult(response.data[0].result);
        setLength(response.data[0].length);
        setLanguage(response.data[0].language);
        setCode(response.data[0].code);
        setLoading(false);
      });
  };
  useEffect(() => {
    setTimeout(() => fetchResult(), 5000);
  }, []);
  console.log(state.quizId);
  console.log(code);
  if (error) return <div>에러가 발생했습니다</div>;
  return (
    <>
      <Navbar></Navbar>
      <Main>
        {loading ? (
          <LoadingBar>
            <Audio height="80" width="80" color="white" ariaLabel="loading" />
            <br />
            열심히 계산하는 중이에요
          </LoadingBar>
        ) : (
          <ResultInfo>
            <Code>제출코드 : {code}</Code>
            <Res>
              <div>언어 : {language}</div>
              <br />
              <div>문제 번호 : {quesnum}</div>
              <br />
              <div>제출자 : {submitter}</div>
              <br />
              <div>
                코드 길이 :{" "}
                {language === "python"
                  ? parseInt(length) - 16
                  : parseInt(length) - 17}
                byte
              </div>
              <br/>
              <div>결과 : {result}</div>
              <br/>
              <div>런타임 : {time}ms</div>
            </Res>
          </ResultInfo>
        )}
      </Main>
    </>
  );
}
export default Result;
