import { DataSources } from "./common/datasources";
import FarmConfigModel from "./common/models/FarmConfig";

export interface NavConfig {
  subdomain: string;
  url: string;
  user: string;
  accessKey: string;
}

export interface GraphqlContext {
  dataSources: DataSources;
  navConfig?: NavConfig;
  session: Express.Session;
  user?: Express.SessionUser;
}

export interface CreateContextOptions {
  req: {
    subdomains: string[];
    session: Express.Session;
  };
}

export async function createContext({
  req
}: CreateContextOptions): Promise<Omit<GraphqlContext, "dataSources">> {
  let navConfig;
  if (process.env.VERCEL_ENV === "production") {
    const farmConfig = await FarmConfigModel.findOne({
      subdomain: req.subdomains[0]
    }).lean();

    if (farmConfig) {
      navConfig = farmConfig;
    } else {
      // Add this once everyone migrates over to subdomain.
      // throw new Error(`subdomain ${req.subdomains[0]} not configured`);
    }
  }
  // convert this to else statement after everyone moves over to subdomain.
  if (!navConfig) {
    navConfig = {
      subdomain: "moglerfarms",
      url: `${process.env.NAV_BASE_URL}`,
      user: process.env.NAV_USER,
      accessKey: process.env.NAV_ACCESS_KEY
    };
  }
  return {
    navConfig,
    session: req.session,
    user: req.session.user
  };
}
