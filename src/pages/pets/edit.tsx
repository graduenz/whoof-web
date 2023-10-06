import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/mantine";
import { TextInput } from "@mantine/core";

import { PetTypeSelect } from "../../components";

export const PetEdit: React.FC<IResourceComponentsProps> = () => {
    const {
        getInputProps,
        saveButtonProps,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            name: "",
            petType: "",
            id: "",
        },
        validate: {
          name: (value) => value ? null : "'Name' is required",
          petType: (value) => value ? null : "'Pet Type' is required",
        },
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <TextInput mt="sm" disabled label="Id" {...getInputProps("id")} />
            <TextInput mt="sm" label="Name" withAsterisk {...getInputProps("name")} />
            <PetTypeSelect mt="sm" data={[]} withAsterisk {...getInputProps("petType")} />
        </Edit>
    );
};
