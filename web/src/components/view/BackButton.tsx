import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const history = useHistory();

  return (
    <button
      type="button"
      className={`h-11 w-11 -ml-4 ${className || ""}`}
      aria-label="Back"
      onClick={() => history.goBack()}
    >
      <FontAwesomeIcon icon="chevron-left" />
    </button>
  );
};

export default BackButton;
