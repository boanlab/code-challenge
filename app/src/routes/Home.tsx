import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
// const session = require("express-session");
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ImageSlider, { Slide } from "react-auto-image-slider";

const Wrapper = styled.div`
  height: 300px;
`;

const Main = styled.main`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f4f0;
`;
const Content1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding: 100px 0px;
  color: black;
`;
const Content2 = styled.div`
  width: 80%;
  height: 44%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Ranks = styled.ul`
  border: white 3px solid;
  border-radius: 25px;
  padding: 20px;
  background-color: white;
  color: black;
  font-size: 30px;
  width: 550px;
  height: 400px;
`;
const Rank = styled.table`
  margin-top: 18px;
  font-size: 25px;
  color: black;
`;
const Td = styled.td`
  display: inline-block;
  margin-top: 18px;
  font-size: 25px;
`;
const Box = styled.div`
  padding: 20px;
  font-size: 50px;
`;
const Footer = styled.footer`
  width: 100%;
  bottom: 0px;
  height: 6vh;
  background-color: #FFFFFF;
  color: #FFA500;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgBox = styled.div`
  margin-top: 6%;
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
interface rankInterface {
  submitter: string;
  count_yes:string;
}
const Button = styled.li`
  border: none;
  background-color: none;
  color: black;
  &:hover {
    font-weight: bolder;
    cursor: pointer;
  }
`;

function Home() {
  const history = useHistory();
  const [author_id, setAuthor_id] = useState("");
  const [id, setId] = useState("");
  const [quizList, setQuizList] = useState<QuizListInterface[]>();
  const [rank, setRank] = useState<rankInterface[]>();
  axios.get("/popularquizDB").then(function (response) {
    setQuizList(response.data);
  });
  axios.get("/ranking").then(function(response){
    setRank(response.data);
  });
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear"
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
  return (
    <>
      <Navbar></Navbar>
      <ImageSlider effectDelay={500} autoPlayDelay={2000}>
        <Slide>
          <img alt="img0" src="assets/img/img0.png" />
        </Slide>
        <Slide>
          <img alt="img1" src="assets/img/img1.png" />
         </Slide>
        <Slide>
          <img alt="hm" src="assets/img/hm.png" />
        </Slide>
      </ImageSlider>
      <Main>
        <Content1>
          <Box>『여러 문제를 풀며 코딩 실력을 키워보세요』</Box>
        </Content1>
        <Content2>
          <Ranks>
            <div>인기 문제</div>
            <table>
              <tbody>
                {quizList?.slice(0, 5).map((quiz, index) => (
                  <tr>
                    <Td>{index + 1}위 : </Td>
                    <Td>
                      <Button onClick={() => onClickEvent(quiz)}>
                        {quiz.title}
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Ranks>
          <Ranks>
            <div>명예의 전당</div>
            <table>
              <tbody>
                {rank?.map((v, index) => (
                  <tr>
                    <Td>{index + 1}위 : </Td>
                    <Td>
                      <Button onClick={()=>history.push({
          pathname: `/MyPage2`,
          state: {
            id:v.submitter
          }
        })}>
                        {v.submitter}
                      </Button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Ranks>
        </Content2>
      </Main>
      <Footer>
        만든이 : 단국대학교 컴퓨터공학과 김용원, 김건우, 박민규, 양승건
      </Footer>
    </>
  );
}
export default Home;
