import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import { usePigActivityJobsQuery, ItemJournalTemplate } from "../graphql";
import { useFlash } from "../../common/contexts/flash";

const ActivitySelectionView: React.FC = () => {
  const [navigationLinks, setNavigationLinks] = useState([]);
  const match = useRouteMatch();
  const { setMessage } = useFlash();

  const { loading, data } = usePigActivityJobsQuery({
    onCompleted() {
      let sortedData = (data && data.itemJournalTemplates) || [];
      try {
        // Try custom sort specified above
        setNavigationLinks(
          [...sortedData].sort(
            (a, b) => T["a.reasonCode"].sort - T[b.reasonCode].sort
          )
        );
      } catch {
        // On sort failure, use api response
        setNavigationLinks(sortedData);
      }
    },
    onError(e) {
      // on api error, use default activities
      setNavigationLinks(Object.keys(T).map(x => T[x]));
      setMessage({
        message: "Unable to get activity template. Loading default.",
        level: "info"
      });
    }
  });
  return (
    <View>
      <ViewHeader>
        <BackButton />
        <Title>Pig Activity</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        <StackedNav>
          {navigationLinks.map(template => {
            const navLink = { ...template, ...T[template.reasonCode] };
            return (
              <StackedNavLink
                key={`activityLink-${navLink.id}`}
                to={`${match.url}${navLink.route}`}
              >
                {navLink.description || navLink.label}
              </StackedNavLink>
            );
          })}
        </StackedNav>
      </ViewContent>
    </View>
  );
};

export default ActivitySelectionView;

interface NavLinkType {
  sort: number;
  route: string;
  id: string;
  label: string;
}

interface TypeMap {
  [key: string]: NavLinkType;
}

const T: TypeMap = {
  WEAN: { sort: 1, route: "/wean", id: "WEAN", label: "Wean" },
  "DEAD-NAT": {
    sort: 2,
    route: "/mortality",
    id: "DEAD-NAT",
    label: "Mortality"
  },
  MOVE: { sort: 3, route: "/move", id: "MOVE", label: "Move" },
  "GR-UNTHRIF": {
    sort: 4,
    route: "/grade-off",
    id: "GR-UNTHRIF",
    label: "Grade Off"
  },
  ADJ: { sort: 5, route: "/adjustment", id: "ADJ", label: "Adjustment" },
  PURCH: { sort: 6, route: "/purchase", id: "PURCH", label: "Purchase" }
};
