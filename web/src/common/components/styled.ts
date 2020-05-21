import { Link } from "react-router-dom";
import tw from "tailwind.macro";

export const FocusTarget = tw.div`focus:shadow-outline focus:outline-none`;

export const ButtonLink = tw.styled(FocusTarget.withComponent(Link))`
  inline-flex items-center px-4 h-11
  text-base font-bold text-white leading-none active:text-black 
  bg-black active:bg-white
  border border-black rounded-lg active:border-gray-500
`;

export const Output = tw.output`flex items-center px-4 h-11 text-base`;
