import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import StackedNav from "../../common/components/nav/StackedNav";
import StackedNavLink from "../../common/components/nav/StackedNavLink";
import Title from "../../common/components/view/ViewTitle";
import View from "../../common/components/view/View";
import ViewHeader from "../../common/components/view/ViewHeader";
import BackButton from "../../common/components/view/BackButton";
import ViewContent from "../../common/components/view/ViewContent";
import { useLivestockActivityJobsQuery, ItemJournalTemplate } from "../graphql";
import { useFlash } from "../../common/contexts/flash";

const ActivitySelectionView: React.FC = () => {
  const [navigationLinks, setNavigationLinks] = useState(
    new Array<ItemJournalTemplate | NavLinkType>()
  );
  const match = useRouteMatch();
  const { setMessage } = useFlash();

  const { loading, data } = useLivestockActivityJobsQuery({
    onCompleted() {
      let sortedData = (data && data.itemJournalTemplates) || [];
      try {
        // Try custom sort specified above
        setNavigationLinks(
          [...sortedData].sort((a, b) => T[a.name].sort - T[b.name].sort)
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
        <Title>Livestock Activity</Title>
      </ViewHeader>
      <ViewContent loading={loading}>
        <StackedNav>
          {navigationLinks.map(template => {
            const navLink = { ...template, ...T[template.name || ""] };
            return (
              <>
                {navLink.route && (
                  <StackedNavLink
                    key={`activityLink-${template.name}`}
                    to={`${match.url}${navLink.route}`}
                  >
                    {navLink.description || navLink.defaultLabel}
                  </StackedNavLink>
                )}
              </>
            );
          })}
        </StackedNav>
      </ViewContent>
    </View>
  );
};

export default ActivitySelectionView;

interface NavLinkType extends Partial<ItemJournalTemplate> {
  sort: number;
  route: string;
  defaultLabel: string;
}

interface TypeMap {
  [key: string]: NavLinkType;
}

const T: TypeMap = {
  WEAN: { sort: 1, route: "/wean", defaultLabel: "Wean" },
  MORTALITY: { sort: 2, route: "/mortality", defaultLabel: "Mortality" },
  MOVE: { sort: 3, route: "/move", defaultLabel: "Move" },
  GRADEOFF: { sort: 4, route: "/grade-off", defaultLabel: "Grade Off" },
  QTYADJ: { sort: 5, route: "/adjustment", defaultLabel: "Adjustment" },
  PURCHASE: { sort: 6, route: "/purchase", defaultLabel: "Purchase" }
};
