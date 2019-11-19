import React from "react";
import { useState, useEffect } from "react";

const FakeCSSTransition = jest.fn(props => {
  const [state, setState] = useState(props.in);

  // Trigger the onExited event is triggered when props.in changes to false.
  useEffect(() => {
    if (state !== props.in) {
      setState(props.in);
      if (props.in === false) {
        props.onExited && props.onExited();
      }
    }
  }, [props, props.in, state]);

  return <div className="fake-transition">{state ? props.children : null}</div>;
});

export const CSSTransition = FakeCSSTransition;
