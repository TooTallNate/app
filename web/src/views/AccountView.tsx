/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import { View } from "../components/styled";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/auth";
import { Title } from "../components/styled";

const AccountView: React.FC<RouteComponentProps> = () => {
  const { logout } = useAuth();

  return (
    <View>
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
    </View>
  );
};

export default AccountView;
