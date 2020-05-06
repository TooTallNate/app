import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import tw from "tailwind.macro";

export const FocusTarget = tw.div`focus:shadow-outline focus:outline-none`;
export const FocusInTarget = tw.div`focus-within:shadow-outline focus-within:outline-none`;

export const ButtonLink = tw.styled(FocusTarget.withComponent(Link))`
  inline-flex items-center px-4 h-11
  text-base font-bold text-white leading-none active:text-black 
  bg-black active:bg-white
  border border-black rounded-lg active:border-gray-500
`;

export const Output = tw.output`flex items-center px-4 h-11 text-base`;

export const StackedContainer = tw.styled(
  FocusInTarget
)`flex flex-col rounded-lg border border-gray-500 overflow-hidden`;

export const StackedItem = styled.div`
  ${tw`
    flex items-center px-4 h-11
    text-base font-medium
    border-b border-gray-500
    focus:outline-none focus:bg-blue-300
  `}
  &:last-of-type {
    border-bottom-width: 0;
  }
`;

export const StackedNav = StackedContainer.withComponent("nav");

export const StackedNavLink = tw.styled(StackedItem.withComponent(Link))`
  text-black no-underline
`;
