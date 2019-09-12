/** @jsx jsx */
import { jsx } from "@emotion/core";

const ViewTitle: React.FC = ({ children }) => {
  return (
    <h1
      css={{
        borderBottom: "1px solid #9ca1b1",
        padding: "0 16px 16px 16px",
        margin: "16px 0 0 0"
      }}
    >
      {children}
    </h1>
  );
};

export default ViewTitle;
