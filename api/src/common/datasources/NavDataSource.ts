import {
  RESTDataSource,
  RequestOptions,
  Response,
  Request
} from "apollo-datasource-rest";
import { GraphqlContext } from "../../context";
import { ApolloError, AuthenticationError } from "apollo-server-express";
import { ErrorCode } from "../utils";
import { FilterFunction, compileFilter } from "../nav/filter";
import logger from "../../config/logging";

export default class NavDataSource extends RESTDataSource<GraphqlContext> {
  get config() {
    if (this.context.navConfig) {
      return this.context.navConfig;
    } else {
      throw new Error("NAV not initialized");
    }
  }

  get authHeader() {
    return `Basic ${Buffer.from(
      `${this.config.user}:${this.config.accessKey}`
    ).toString("base64")}`;
  }

  get baseURL() {
    return this.config.url;
  }

  // Attach authorization header if user is logged in on the context.
  willSendRequest(request: RequestOptions) {
    if (this.context.user && !request.headers.has("Authorization")) {
      request.headers.set("Authorization", this.authHeader);
    }
  }

  protected buildFilter(fn: FilterFunction) {
    return compileFilter(fn);
  }

  protected didReceiveResponse(response: Response, request: Request) {
    if (process.env.NODE_ENV === "production") {
      logger.info(`${request.method} ${request.url} ${response.status}`);
    }
    return super.didReceiveResponse(response, request);
  }

  // Convert ODATA response to a more typical REST response.
  protected async parseBody(response: Response) {
    const data = (await super.parseBody(response)) as any;
    if (typeof data === "object" && Array.isArray(data.value)) {
      return data.value;
    } else {
      return data;
    }
  }

  // Convert NAV errors to GraphQL errors.
  protected async errorFromResponse(response: Response) {
    let body: any = "";
    let error = new ApolloError("Unknown Error", ErrorCode.Unknown);

    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }

    logger.error(`Nav Error: 
URL: ${response.url}
Status Code: ${response.status}
Response: ${JSON.stringify(body, null, 2)}`);

    if (body && body.error) {
      switch (body.error.code) {
        case "Authentication_InvalidCredentials": {
          error = new AuthenticationError("NAV credentials are invalid");
          break;
        }
        default: {
          // Simultaneous license doesn't have a dedicated error code,
          // so we have to detect it from the error message.
          if (
            body.error.message.includes(
              "Your program license does not permit more users to work simultaneously"
            )
          ) {
            error = new ApolloError(
              "Your NAV license does not allow more users to work simultaneously",
              ErrorCode.NoAvailableLicense
            );
          } else {
            error = new ApolloError(body.error.message, ErrorCode.Unknown);
          }
        }
      }
    }

    Object.assign(error.extensions, {
      response: {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        body
      }
    });

    return error;
  }
}
