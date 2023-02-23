import styled from "styled-components";

const Quizcontent = styled.div`
  margin: 50px 0px;
`;

const ExInOutput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  padding: 20px;
  border: 1px solid white;
  border-radius: 10px;
  margin: 0px 10px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface QuizProps {
  content: string;
  input: string;
  output: string;
}

function QuizContent({ content, input, output }: QuizProps) {
  return (
    <>
      <Main>
        <Quizcontent>{content}</Quizcontent>
        <ExInOutput>
          <Box>예제 입력 : {input}</Box>
          <Box>예제 출력 : {output}</Box>
        </ExInOutput>
      </Main>
    </>
  );
}

export default QuizContent;
