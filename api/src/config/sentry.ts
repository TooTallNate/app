import { Scope } from "@sentry/node";
import { sentry } from "graphql-middleware-sentry";
import { GraphqlContext } from "../context";
import { ApolloError, AuthenticationError } from "apollo-server-express";
import { ErrorCode } from "../common/utils";
import pkg from "../../../package.json";

export const sentryEnabled = !!process.env.SENTRY_DSN_API;

export const sentryMiddleware =
  sentryEnabled &&
  sentry<GraphqlContext>({
    config: {
      dsn: process.env.SENTRY_DSN_API,
      release: pkg.version,
      environment: process.env.NODE_ENV
    },
    withScope(scope: Scope, error: Error, context: GraphqlContext) {
      if (context.user) {
        scope.setUser({
          id: context.user.securityId
        });
      }
    },
    reportError(res: any) {
      if (res instanceof AuthenticationError) {
        return false;
      } else if (res instanceof ApolloError) {
        return res.extensions["code"] === ErrorCode.Unknown;
      } else if (res instanceof Error) {
        return res.message !== ErrorCode.Unauthorized;
      }
      return true;
    }
  });
