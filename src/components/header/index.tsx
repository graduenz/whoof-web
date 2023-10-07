import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Header as MantineHeader,
  Sx,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useGetIdentity } from "@refinedev/core";
import {
  HamburgerMenu,
  RefineThemedLayoutV2HeaderProps,
} from "@refinedev/mantine";
import { IconMoonStars, IconSun, IconBrandGithub, IconBook } from "@tabler/icons";
import React from "react";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { data: user } = useGetIdentity<IUser>();

  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const borderColor = dark ? theme.colors.dark[6] : theme.colors.gray[2];

  let stickyStyles: Sx = {};
  if (sticky) {
    stickyStyles = {
      position: `sticky`,
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <MantineHeader
      zIndex={199}
      height={64}
      py={6}
      px="sm"
      sx={{
        borderBottom: `1px solid ${borderColor}`,
        ...stickyStyles,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        sx={{
          height: "100%",
        }}
      >
        <HamburgerMenu />
        <Group>
          <Group spacing="xs">
            <ActionIcon
              color="dark"
              component="a"
              href="https://github.com/graduenz/whoof-web"
              title="GitHub repository"
            >
              <IconBrandGithub size={18} />
            </ActionIcon>
            <ActionIcon
              color="dark"
              component="a"
              href="https://whoof-docs.rdnz.dev/"
              title="Official docs"
            >
              <IconBook size={18} />
            </ActionIcon>
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "primary"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
          </Group>
          {(user?.name || user?.avatar) && (
            <Group spacing="xs">
              {user?.name && <Title order={6}>{user?.name}</Title>}
              <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
            </Group>
          )}
        </Group>
      </Flex>
    </MantineHeader>
  );
};
