import React, { useState } from "react";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import ViewContent from "../components/view/ViewContent";
import QRCodeReader from "./QRCodeReader";
import Divider from "../components/layout/Divider";
import { useHomeViewQuery } from "../graphql";
import { MenuOption } from "../../livestock-activity/graphql";
import { useHistory } from "react-router-dom";

const HomeView: React.FC = () => {
  const [menu, setMenu] = useState(Array<MenuOption>());
  const history = useHistory();
  const { loading } = useHomeViewQuery({
    fetchPolicy: "no-cache",
    onCompleted(data) {
      if (data && data.user && data.user.menuOptions.list.length > 0) {
        setMenu(data.user.menuOptions.list);
      } else {
        setMenu(data.menuOptions);
      }
    }
  });

  return (
    <View>
      <ViewHeader>
        <Title>Home</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        <StackedNav>
          {menu.map(item => {
            return (
              <>
                <StackedNavLink key={item.name} to={item.route}>
                  {item.name}
                </StackedNavLink>
              </>
            );
          })}
        </StackedNav>
        <Divider className="py-3" centerText="or" />
        <QRCodeReader />
      </ViewContent>
    </View>
  );
};

/*
  potential update -- replace map with below list if error loading the menu
          <StackedNavLink to="/livestock-activity">Livestock Activity</StackedNavLink>
          <StackedNavLink to="/scorecard">Scorecards</StackedNavLink>
          <StackedNavLink to="/fuel">Fuel</StackedNavLink>
          <StackedNavLink to="/maintenance">Maintenance</StackedNavLink>
*/

export default HomeView;
