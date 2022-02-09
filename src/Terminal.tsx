import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import "./Terminal.scss";
import { store } from "./store";

export const Terminal = observer(() => {
  const { terminalStore } = store;
  const {
    info,
    history,
    cursor,
    initCursorFlipper,
    command,
    addChar,
    executing,
    execOut,
  } = terminalStore;

  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 9) {
      event.preventDefault();
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", ({ key }) => {
      addChar(key);
    });
    initCursorFlipper();
  }, []);

  return (
    <div className="c-terminal">
      <div className="c-terminal__text">{`${history}`}</div>
      <div className="c-terminal__text">
        {executing ? execOut.replace("\n", "") : `${info}${command}${cursor}`}
      </div>
    </div>
  );
});
