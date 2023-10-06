import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput, Textarea, NumberInput } from "@mantine/core";

import { PetTypeSelect } from "../../components";

export const VaccineEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { queryResult },
  } = useForm({
    initialValues: {
      name: "",
      description: "",
      petType: "",
      duration: "",
      id: "",
    },
    validate: {
      name: (value) => value ? null : "'Name' is required",
      petType: (value) => value ? null : "'Pet Type' is required",
      duration: (value) => value ? null : "'Duration' is required",
    }
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" disabled label="Id" {...getInputProps("id")} />
      <TextInput mt="sm" label="Name" withAsterisk {...getInputProps("name")} />
      <Textarea mt="sm" label="Description" {...getInputProps("description")} />
      <PetTypeSelect mt="sm" data={[]} withAsterisk {...getInputProps("petType")} />
      <NumberInput mt="sm" label="Duration (in days)" withAsterisk {...getInputProps("duration")} />
    </Edit>
  );
};
