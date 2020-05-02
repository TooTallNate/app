import { AnimalResolvers } from "./types";

export const Animal: AnimalResolvers = {
  number: animal => animal.No,
  description: animal => animal.Description
};
