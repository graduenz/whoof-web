import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, DateField } from "@refinedev/mantine";
import { Title, Tabs, Code } from "@mantine/core";
import { IconPaw, IconReportSearch, IconVaccine } from "@tabler/icons";

export const PetShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      title={<Title size="h3">{record?.name}</Title>}
    >
      <Tabs defaultValue="pet">
        <Tabs.List>
          <Tabs.Tab value="pet" icon={<IconPaw size={14} />}>Pet</Tabs.Tab>
          <Tabs.Tab value="audit" icon={<IconReportSearch size={14} />}>Audit</Tabs.Tab>
          <Tabs.Tab value="vaccines" icon={<IconVaccine size={14} />}>Vaccines</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="pet" pt="xs">
          <Title my="xs" order={5}>
            Id
          </Title>
          <Code>{record?.id}</Code>
          <Title my="xs" order={5}>
            Name
          </Title>
          <TextField value={record?.name} />
          <Title my="xs" order={5}>
            Pet Type
          </Title>
          <TextField value={record?.petType} />
        </Tabs.Panel>
        <Tabs.Panel value="audit" pt="xs">
          <Title my="xs" order={5}>
            Created At
          </Title>
          <DateField value={record?.createdAt} format="lll" />
          <Title my="xs" order={5}>
            Created By
          </Title>
          <TextField value={record?.createdBy} />
          <Title my="xs" order={5}>
            Modified At
          </Title>
          <DateField value={record?.modifiedAt} format="lll" />
          <Title my="xs" order={5}>
            Modified By
          </Title>
          <TextField value={record?.modifiedBy} />
        </Tabs.Panel>
        <Tabs.Panel value="vaccines" pt="xs">
          Coming soon!
        </Tabs.Panel>
      </Tabs>
    </Show>
  );
};
