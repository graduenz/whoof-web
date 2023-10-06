import React from "react";
import { Text } from '@mantine/core';

export const Footer : React.FC = () => {
  const divStyle: React.CSSProperties = {
    display: "block",
    textAlign: "center",
    fontSize: "12px",
    color: "#999"
  };

  return (
    <div style={divStyle}>
      <Text>
        Whoof @ {new Date().getFullYear()} ― MIT licensed, open source project created by <Text component="a" href="https://rdnz.dev">Guilherme Raduenz</Text>.
      </Text>
    </div>
  );
}