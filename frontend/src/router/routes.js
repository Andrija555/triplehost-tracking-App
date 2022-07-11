import { lazy } from "react";

// Pages
const Login = lazy(() => import("pages/login"));
const Start = lazy(() => import("pages/start"));
const Map = lazy(() => import("pages/map"));
const Table = lazy(() => import("pages/table"));
const Statistics = lazy(() => import("pages/statistics"));
const Settings = lazy(() => import("pages/settings"));
const Users = lazy(() => import("pages/users"));
const Profile = lazy(() => import("pages/profile"));
//Layouts
const PublicLayout = lazy(() => import("layouts/PublicLayout"));
const PrivateLayout = lazy(() => import("layouts/PrivateLayout"));

export const publicRoutes = [
  {
    key: "login",
    path: "",
    index: true,
    page: Login,
    layout: PublicLayout,
  },
];

export const privateRoutes = [
  {
    key: "start",
    path: "start",
    page: Start,
    layout: PrivateLayout,
  },
  {
    key: "map",
    path: "map",
    page: Map,
    layout: PrivateLayout,
  },
  {
    key: "table",
    path: "table",
    page: Table,
    layout: PrivateLayout,
  },
  {
    key: "statistics",
    path: "statistics",
    page: Statistics,
    layout: PrivateLayout,
  },
  {
    key: "settings",
    path: "settings",
    page: Settings,
    layout: PrivateLayout,
  },
  {
    key: "users",
    path: "users",
    page: Users,
    layout:PrivateLayout
  },
  {
    key: "profile",
    path: "profile",
    page: Profile,
    layout: PrivateLayout,
  },
];
