import { IconDog } from "@tabler/icons";
import React from "react";

export const Title : React.FC = () => {
  const divStyle: React.CSSProperties = {
    display: "flex",
  };

  return (
    <div style={divStyle}>
      <IconDog />
    </div>
  );
}