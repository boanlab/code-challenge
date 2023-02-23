import React, { useMemo, useRef } from "react";
import styled, { css } from "styled-components";

type TextareaProps = {
  value: string;
  numOfLines: number;
  onValueChange: (value: string) => void;
  placeholder?: string;
  name?: string;
};

const StyledTextareaWrapper = styled.div`
  border-radius: 2px;
  width: 40vw;
  height: 500px;
`;

const sharedStyle = css`
  margin: 0;
  padding: 10px 0;
  height: 65vh;
  border-radius: 0;
  resize: none;
  outline: none;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.2;
  &:focus-visible {
    outline: none;
  }
`;

const StyledTextarea = styled.textarea`
  ${sharedStyle}
  padding-left: 1.8rem;
  width: 100%;
  border: none;
  &::placeholder {
    color: grey;
  }
`;

const StyledNumbers = styled.div`
  ${sharedStyle}
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  box-shadow: none;
  position: absolute;
  color: grey;
  border: none;
  background-color: lightgrey;
  padding: 10px;
  width: 1.5rem;
`;

const StyledNumber = styled.div<{ active: boolean }>`
  color: ${(props) => (props.active ? "blue" : "inherit")};
`;

export const Textarea = ({
  value,
  numOfLines,
  onValueChange,
  placeholder = "여기에 코드를 입력하세요",
  name,
}: TextareaProps) => {
  const lineCount = useMemo(() => value.split("\n").length, [value]);
  const linesArr = useMemo(
    () =>
      Array.from({ length: Math.max(numOfLines, lineCount) }, (_, i) => i + 1),
    [lineCount, numOfLines]
  );

  const lineCounterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onValueChange(event.target.value);
  };

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <StyledTextareaWrapper>
      <StyledNumbers ref={lineCounterRef}>
        {linesArr.map((count) => (
          <StyledNumber active={count <= lineCount} key={count}>
            {count}
          </StyledNumber>
        ))}
      </StyledNumbers>
      <StyledTextarea
        name={name}
        onChange={handleTextareaChange}
        onScroll={handleTextareaScroll}
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
        wrap="off"
      />
    </StyledTextareaWrapper>
  );
};