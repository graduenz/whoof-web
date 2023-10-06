import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TextField, DateField } from "@refinedev/mantine";
import { Title, Tabs, Code } from "@mantine/core";
import { IconVaccine, IconReportSearch } from '@tabler/icons';

export const VaccineShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Tabs defaultValue="vaccine">
        <Tabs.List>
          <Tabs.Tab value="vaccine" icon={<IconVaccine size={14} />}>Vaccine</Tabs.Tab>
          <Tabs.Tab value="audit" icon={<IconReportSearch size={14} />}>Audit</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="vaccine" pt="xs">
          <Title my="xs" order={5}>
            Id
          </Title>
          <Code>{record?.id}</Code>
          <Title my="xs" order={5}>
            Name
          </Title>
          <TextField value={record?.name} />
          <Title my="xs" order={5}>
            Description
          </Title>
          <TextField value={record?.description} />
          <Title my="xs" order={5}>
            Pet Type
          </Title>
          <TextField value={record?.petType} />
          <Title my="xs" order={5}>
            Duration
          </Title>
          <TextField value={`${record?.duration ?? ""} days`} />
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
      </Tabs>
    </Show>
  );
};
