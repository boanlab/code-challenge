import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const Main = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InOutBox = styled.textarea`

`

const Title = styled.div`
    font-size: 30px;
    margin-bottom: 50px;
`

interface IState {
    questionnum: number;
}

function Testcase () {
    const [testnum,setTestnum] = useState("");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const {state} = useLocation<IState>();
    const [questionnum, setQuestionnum] = useState(0);
    useEffect(() => {
        setQuestionnum(state.questionnum);
    }, [])
    const onChangeIn = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // const value = event.currentTarget.value;
        const {
          currentTarget: { value }
        } = event;
        setInput(value);
    };
    const onChangeOut = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // const value = event.currentTarget.value;
        const {
          currentTarget: { value }
        } = event;
        setOutput(value);
    };
    const modify = async () => {
        axios.get('/testcase/modi'
            , {
                params: {
                    input, output, questionnum, num:testnum
                }
            }
        )
    }
    const read = async () => {
        axios.get('/testcase/read/'
            , {
                params: {
                    questionnum, num:testnum
                }
            }
        ).then(function(response){
            console.log(response.data)
            setInput(response.data.input)
            setOutput(response.data.output)
        })
    }
    const append = async () => {
        axios.get('/testcase/add/'
            , {
                params: {
                    input, output, questionnum
                }
            }
        )
        alert(`테스트케이스가 추가되었습니다.`)
    }
    
    return (
        <>
            <Main>
                <Title>테스트 케이스 수정&추가</Title>
                <div>
                    <input placeholder="수정할 테스트 케이스 번호" name="testnum" value={testnum} onChange={e=>setTestnum(e.target.value)}/><button onClick={read}>찾기</button>
                </div>
                input
                <InOutBox rows={5} value={input} onChange={onChangeIn} />
                output
                <InOutBox rows={5} value={output} onChange={onChangeOut} />
                <div>
                    <button onClick={() => modify()}>수정</button>
                    <button onClick={() => append()}>추가</button>
                </div>
            </Main>
        </>
    )
}

export default Testcase;