import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const inputFocus = `
  box-shadow: 0 0 2px 1px #9ca1b1;
  outline: none;
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
  &:focus {
    ${inputFocus}
  }
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

export const BaseTextInput = styled.input`
  font-size: 1rem;
  padding: 12px;
  border: 1px solid #9ca1b1;
  border-radius: 8px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    ${inputFocus}
  }
`;

export const BaseTextarea = styled(BaseTextInput.withComponent("textarea"))`
  resize: vertical;
  min-height: 88px;
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

export const FieldGroup = styled(FormGroup)`
  ${FormGroup} & {
    margin-top: 0;
  }
`;

export const StackedContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #9ca1b1;
  overflow: hidden;
  &:focus-within {
    ${inputFocus}
  }
`;

export const StackedItem = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding: 12px;
  border: solid #9ca1b1;
  border-width: 0 0 1px 0;
  &:last-of-type {
    border-bottom-width: 0;
  }
`;

export const StackedNav = StackedContainer.withComponent("nav");

export const StackedNavLink = styled(StackedItem.withComponent(Link))`
  color: inherit;
  text-decoration: none;
`;
