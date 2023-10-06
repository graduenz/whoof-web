import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

import { PetTypeSelect } from "../../components";

export const PetCreate: React.FC<IResourceComponentsProps> = () => {
  const {
    getInputProps,
    saveButtonProps,
    refineCore: { formLoading },
  } = useForm({
    initialValues: {
      name: "",
      petType: "",
    },
    validate: {
      name: (value) => value ? null : "'Name' is required",
      petType: (value) => value ? null : "'Pet Type' is required",
    },
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <TextInput mt="sm" label="Name" withAsterisk {...getInputProps("name")} />
      <PetTypeSelect mt="sm" data={[]} withAsterisk {...getInputProps("petType")} />
    </Create>
  );
};
