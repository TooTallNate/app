/** @jsx jsx */
import { jsx } from "@emotion/core";
import Spinner from "./ui/Spinner";

const FullPageSpinner: React.FC = ({ children }) => {
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Spinner />
      <div
        css={{
          margin: 32,
          fontWeight: "bold"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FullPageSpinner;
