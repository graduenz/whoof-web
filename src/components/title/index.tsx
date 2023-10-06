import { IconDog } from "@tabler/icons";
import React from "react";

export const Title : React.FC = () => {
  const divStyle: React.CSSProperties = {
    display: "flex",
  };

  const spanStyle: React.CSSProperties = {
    fontWeight: 600,
    marginLeft: "4px"
  };

  return (
    <div style={divStyle}>
      <IconDog />
      <span style={spanStyle}>Whoof</span>
    </div>
  );
}