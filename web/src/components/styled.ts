import styled from "@emotion/styled";

const inputFocus = `
  &:focus {
    box-shadow: 0 0 2px 1px #9ca1b1;
    outline: none;
  }
`;

export const Button = styled.button`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: black;
  padding: 12px;
  border: 1px solid black;
  border-radius: 8px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  ${inputFocus}
  &:active {
    background-color: white;
    border-color: #9ca1b1;
    color: black;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  height: 44px;
  line-height: 44px;
  display: block;
`;

export const Output = styled.output`
  font-size: 1rem;
  padding: 13px;
  display: block;
  width: 100%;
  box-sizing: border-box;
`;

export const Textarea = styled.textarea`
  font-size: 1rem;
  padding: 12px;
  border: 1px solid #9ca1b1;
  border-radius: 8px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 88px;
  ${inputFocus}
`;

export const TextInput = styled.input`
  font-size: 1rem;
  padding: 12px;
  border: 1px solid #9ca1b1;
  border-radius: 8px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  ${inputFocus}
`;

export const Title = styled.h1`
  border-bottom: 1px solid #9ca1b1;
  padding: 0 16px 16px 16px;
  margin: 16px 0 0 0;
`;

export const FormGroup = styled.div`
  margin: 16px 0 0 0;
  padding: 0;
`;
