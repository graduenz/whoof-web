import React from "react";
import { IResourceComponentsProps, useList, useParsed } from "@refinedev/core";
import { Text, Timeline } from "@mantine/core";
import dayjs from "dayjs";

export const PetVaccinationList: React.FC<IResourceComponentsProps> = () => {
  const { id: petId } = useParsed();

  const { data: petVaccinationData } = useList({
    resource: "pet_vaccination",
    filters: [
      { field: "petId", operator: "eq", value: petId },
    ],
    sorters: [
      { field: "appliedAt", order: "desc" },
    ],
    pagination: {
      mode: "off",
    },
  });

  return (
    <Timeline>
      {petVaccinationData?.data?.map((item) => (
        <Timeline.Item key={item.id} title={item.vaccine.name}>
          <Text color="dimmed" size="sm">Applied at {dayjs(item.appliedAt).format("lll")}</Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};
