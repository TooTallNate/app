/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps } from "react-router";
import View from "../components/ui/View";
import ViewHeader from "../components/ui/ViewHeader";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/auth";
import Title from "../components/ui/ViewTitle";

const AccountView: React.FC<RouteComponentProps> = () => {
  const { logout } = useAuth();

  return (
    <View>
      <ViewHeader>
        <Title>Account</Title>
      </ViewHeader>
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
