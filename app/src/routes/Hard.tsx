import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import ManagerPage from "./ManagerPage";

const Main = styled.main`
  margin-top:10vh;
  padding: 0px 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Allquiz = styled.ul``;

const Button = styled.li`
  border: none;
  background-color: none;
  color: white;

  &:hover {
    font-weight: bolder;
    cursor: pointer;
  }
`;
const Quiz = styled.li`
  padding: 15px;
  border: 3px white solid;
  height: 70px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
  a {
    display: block;
  }
`;

const Element = styled.div`
  margin-right: 20px;
  border-right: 2px white solid;
  padding-right: 20px;
`;

const GotoChallenge = styled.div`
  color: black;
`;

interface QuizListInterface {
  correctnum: string;
  creationtime: string;
  explanation: string;
  image: Blob;
  input: string;
  output: string;
  presenter: string;
  questionnum: number;
  timelimit: string;
  title: string;
  trynum: string;
}

function Hardquiz() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const history = useHistory();
  const [id, setId] = useState("");
  const [author_id, setAuthor_id] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [len, setLen] = useState(0);
  const offset = (page - 1) * limit;

  const [quizList, setQuizList] = useState<QuizListInterface[]>();
  const fetchResult = async () => {
    setError(null);
    setLoading(true);
    axios.get("/hardquizDB").then(function (response) {
      console.log(response.data);
      setQuizList(response.data);
      setLen(response.data.length);
    });
  };
  const onClickEvent = (quiz: QuizListInterface) => {
    axios.post("/session_check").then(function (response) {
      setAuthor_id(response.data.author_id);
      setId(response.data.uid);

      if (response.data.uid === undefined) {
        alert("로그인 후 이용해주세요");
        history.push("/");
      } else {
        history.push({
          pathname: `/all/${quiz.questionnum}/quiz`,
          state: {
            title: quiz.title,
            correctnum: quiz.correctnum,
            explanation: quiz.explanation,
            input: quiz.input,
            output: quiz.output,
            presenter: quiz.presenter,
            questionnum: quiz.questionnum,
            trynum: quiz.trynum,
            timelimit: quiz.timelimit,
            memlimit: quiz.timelimit
          }
        });
      }
    });
  };
  useEffect(() => {
    fetchResult();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Main>
        <Allquiz>
          {quizList?.slice(offset, offset + limit).map((quiz) => (
            <Quiz key={quiz.questionnum}>
              <Element>문제 번호 : {quiz.questionnum}</Element>
              <Element>문제 이름 : {quiz.title}</Element>
              <Element>
                정답률 :{" "}
                {Number(quiz.correctnum) === 0 && Number(quiz.trynum) === 0
                  ? 0
                  : Math.ceil(
                      (Number(quiz.correctnum) / Number(quiz.trynum)) * 100
                    )}
                %
              </Element>
              <Element>도전 횟수 : {quiz.trynum}</Element>
              <Button onClick={() => onClickEvent(quiz)}>도전하러가기</Button>
            </Quiz>
          ))}
        </Allquiz>
        <ManagerPage total={len} limit={limit} page={page} setPage={setPage} />
      </Main>
    </>
  );
}

export default Hardquiz;
