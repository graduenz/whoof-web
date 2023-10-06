import React from "react";
import { Select } from "@mantine/core";

export const PetTypeSelect: React.FC<React.ComponentProps<typeof Select>> = (props) => {
  const data = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Capybara", label: "Capybara" },
    { value: "Other", label: "Other" },
  ];

  return <Select
    {...props}
    label="Pet Type"
    data={data}
  />;
};
