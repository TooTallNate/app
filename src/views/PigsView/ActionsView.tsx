/** @jsx jsx */
import { jsx } from "@emotion/core";
import { RouteComponentProps, Link } from "react-router-dom";
import ViewTitle from "../../components/ViewTitle";

const ActionsView: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <div>
      <ViewTitle>Pigs</ViewTitle>
      <h2>Select Action</h2>
      <Link to={`${match.url}/purchase`}>Purchase</Link>
    </div>
  );
};

export default ActionsView;
