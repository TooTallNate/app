import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import tw from "tailwind.macro";

export const FocusTarget = tw.div`focus:shadow-outline focus:outline-none`;
export const FocusInTarget = tw.div`focus-within:shadow-outline focus-within:outline-none`;

export const Button = tw.styled(FocusTarget.withComponent("button"))`
  py-2 px-4 h-10 w-full block
  text-base font-bold text-white leading-none active:text-black 
  bg-black active:bg-white
  border border-black rounded-lg active:border-gray-500
`;

export const View = tw.div`flex flex-col h-full`;

export const Label = tw.label`h-10 py-3 leading-none block text-base font-bold`;

export const Output = tw.output`py-2 px-4 h-10 text-base block`;

export const Title = tw.h1`p-4 font-bold text-3xl border-b border-gray-500`;

export const Group = tw.div`p-0 m-0 mt-4`;

export const StackedContainer = tw.styled(
  FocusInTarget
)`flex flex-col rounded-lg border border-gray-500 overflow-hidden`;

export const StackedItem = styled.div`
  ${tw`
    py-2 px-4 h-10
    text-base font-bold
    border-b border-gray-500
    focus:outline-none focus:bg-blue-200
  `}
  &:last-of-type {
    border-bottom-width: 0;
  }
`;

export const StackedNav = StackedContainer.withComponent("nav");

export const StackedNavLink = tw.styled(StackedItem.withComponent(Link))`
  text-black no-underline
`;
