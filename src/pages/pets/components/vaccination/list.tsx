import React, { useState } from "react";
import { IResourceComponentsProps, useList, useParsed } from "@refinedev/core";
import { DeleteButton, SaveButton, useModalForm, useSelect } from "@refinedev/mantine";
import { Box, Button, Modal, Stack, Text, Timeline, Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconEdit, IconPlus } from "@tabler/icons";
import dayjs from "dayjs";

interface PetVaccinationListProps extends IResourceComponentsProps {
  pet: any;
}

export const PetVaccinationList: React.FC<PetVaccinationListProps> = ({ pet }) => {
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

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const {
    getInputProps,
    saveButtonProps,
    modal: { show, close, title, visible },
  } = useModalForm({
    refineCoreProps: {
      resource: "pet_vaccination",
      action: "create",
    },
    initialValues: {
      vaccineId: "",
      appliedAt: new Date(),
    },
    transformValues: (values) => ({
      ...values,
      petId: pet?.id
    }),
    validate: {
      vaccineId: (value) => value ? null : "'Vaccine' is required",
      appliedAt: (value) => value ? null : "'Applied At' is required",
    },
  });

  const { selectProps: vaccineSelectProps } = useSelect({
      resource: "vaccine",
      optionLabel: "name",
      optionValue: "id",
      filters: [
        {
          field: "petType",
          operator: "eq",
          value: pet?.petType
        }
      ]
  });

  return (
    <>
      <Modal opened={visible} onClose={close} title={title}>
        <Select label="Vaccine" withinPortal {...vaccineSelectProps} {...getInputProps("vaccineId")} />
        <DatePicker mt="sm" label="Applied At" withAsterisk {...getInputProps("appliedAt")} />
        <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveButton {...saveButtonProps} />
        </Box>
      </Modal>
      <Stack align="flex-start">
        <Button onClick={toggleEditMode} variant="subtle" compact>
          <IconEdit size={18} />&nbsp;
          {editMode ? "Back to read-only" : "Edit vaccines"}
        </Button>
        {editMode && (
          <Button onClick={() => show()}>
            <IconPlus size={18} />&nbsp;Add new vaccination
          </Button>
        )}
        <Timeline>
          {petVaccinationData?.data?.map((item) => (
            <Timeline.Item key={item.id} title={item.vaccine.name}>
              <Stack align="flex-start" spacing="xs">
                <Text color="dimmed" size="sm">Applied at {dayjs(item.appliedAt).format("ll")}</Text>
                {editMode && (
                  <DeleteButton compact resource="pet_vaccination" recordItemId={item.id} />
                )}
              </Stack>
            </Timeline.Item>
          ))}
        </Timeline>
      </Stack>
    </>
  );
};
