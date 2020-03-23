import { ResourceResolvers } from "./types";

export const Resource: ResourceResolvers = {
  number: resource => resource.No,
  name: resource => resource.Name
};
