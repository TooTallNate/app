/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { Button } from "../components/styled";
import { useAuth } from "../contexts/auth";
import { Title } from "../components/styled";

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
      <Title>Account</Title>
      <div
        css={{
          flexGrow: 1,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column-reverse"
        }}
      >
        <Button
          css={{
            marginBottom: 32
          }}
          onClick={logout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default AccountView;
