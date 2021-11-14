import React, { useState } from "react";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import Title from "../components/view/ViewTitle";
import View from "../components/view/View";
import ViewHeader from "../components/view/ViewHeader";
import ViewContent from "../components/view/ViewContent";
import QRCodeReader from "../components/input/QRCodeReader";
import Divider from "../components/layout/Divider";
import { useHomeViewQuery } from "../graphql";
import { MenuOption } from "../../livestock-activity/graphql";

const HomeView: React.FC = () => {
  const [menu, setMenu] = useState(Array<MenuOption>());
  const { loading } = useHomeViewQuery({
    fetchPolicy: "no-cache",
    onCompleted(data) {
      if (data.menuOptions) {
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
          {/* {menu.map(item => {
            return (
              <>
                <StackedNavLink key={item.name} to={item.route}>
                  {item.name}
                </StackedNavLink>
              </>
            );
          })} */}
          <StackedNavLink to="/livestock-activity">
            Livestock Activity
          </StackedNavLink>
          <StackedNavLink to="/scorecard">Scorecards</StackedNavLink>
          <StackedNavLink to="/fuel">Fuel</StackedNavLink>
          <StackedNavLink to="/maintenance">Maintenance</StackedNavLink>
        </StackedNav>
        <Divider className="py-3" centerText="or" />
        <QRCodeReader />
      </ViewContent>
    </View>
  );
};

export default HomeView;
