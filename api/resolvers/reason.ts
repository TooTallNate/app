import { ReasonResolvers } from "./types";

export const Reason: ReasonResolvers = {
  code: reason => reason.Code,
  description: reason => reason.Description
};
