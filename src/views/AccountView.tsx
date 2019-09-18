/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import ButtonInput from "../components/ui/ButtonInput";
import { useAuth } from "../contexts/auth";
import ViewTitle from "../components/ui/ViewTitle";

const AccountView: React.FC<RouteComponentProps> = () => {
  const { logout } = useAuth();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <ViewTitle>Account</ViewTitle>
      <div
        css={{
          flexGrow: 1,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column-reverse"
        }}
      >
        <ButtonInput
          css={{
            marginBottom: 32
          }}
          onClick={logout}
        >
          Log Out
        </ButtonInput>
      </div>
    </div>
  );
};

export default AccountView;
