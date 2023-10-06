import {
  Refine,
  Authenticated,
  AuthBindings,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { IconPaw, IconVaccine } from "@tabler/icons";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from "@refinedev/mantine";

import { dataProvider } from "./rest-data-provider";
import {
  MantineProvider,
  Global,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  PetList,
  PetCreate,
  PetEdit,
  PetShow,
} from "./pages/pets";
import {
  VaccineList,
  VaccineCreate,
  VaccineEdit,
  VaccineShow,
} from "./pages/vaccines";
import { Header } from "./components/header";
import { Login } from "./pages/login";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const { isLoading, user, logout, getAccessTokenSilently } = useAuth0();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  if (isLoading) {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      logout({ logoutParams: { returnTo: window.location.origin }});
      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getAccessTokenSilently();
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
          };
          return {
            authenticated: true,
          };
        } else {
          return {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Token not found",
            },
            redirectTo: "/login",
            logout: true,
          };
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: "/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        };
      }
      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{ ...RefineThemes.Orange, colorScheme: colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider("http://localhost:5291", axios)}
                  notificationProvider={notificationProvider}
                  routerProvider={routerBindings}
                  authProvider={authProvider}
                  resources={[
                    {
                      name: "v1/pets",
                      list: "/pets",
                      create: "/pets/create",
                      edit: "/pets/edit/:id",
                      show: "/pets/show/:id",
                      meta: {
                        label: "My pets",
                        canDelete: true,
                        icon: <IconPaw />,
                        apiVersion: 1,
                      },
                    },
                    {
                      name: "v1/vaccines",
                      list: "/vaccines",
                      create: "/vaccines/create",
                      edit: "/vaccines/edit/:id",
                      show: "/vaccines/show/:id",
                      meta: {
                        label: "Vaccines",
                        canDelete: true,
                        icon: <IconVaccine />,
                        apiVersion: 1,
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    projectId: "5HCION-ei6sWO-B6Tbks",
                  }}
                >
                  <Routes>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-inner"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2 Header={() => <Header sticky />}>
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route
                        index
                        element={<NavigateToResource resource="v1/pets" />}
                      />
                      <Route path="/pets">
                        <Route index element={<PetList />} />
                        <Route path="create" element={<PetCreate />} />
                        <Route path="edit/:id" element={<PetEdit />} />
                        <Route path="show/:id" element={<PetShow />} />
                      </Route>
                      <Route path="/vaccines">
                        <Route index element={<VaccineList />} />
                        <Route path="create" element={<VaccineCreate />} />
                        <Route path="edit/:id" element={<VaccineEdit />} />
                        <Route path="show/:id" element={<VaccineShow />} />
                      </Route>
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                        >
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      <Route path="/login" element={<Login />} />
                    </Route>
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
