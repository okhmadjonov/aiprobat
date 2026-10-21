import { routes } from "@/constants/routes";
import { UserRole, type RouteConfig } from "@/types";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const Forbidden = lazy(() => import("@/pages/Forbidden"));
const Profile = lazy(() => import("@/pages/Profile"));
const JazoTurlari = lazy(() => import("@/pages/JazoTurlari"));
const JazoDetail = lazy(() => import("@/pages/JazoDetail"));
const ModdiyYordam = lazy(() => import("@/pages/ModdiyYordam"));
const Inspektorlar = lazy(() => import("@/pages/Inspektorlar"));
const InspektorDetail = lazy(() => import("@/pages/InspektorDetail"));
const AiYordamchi = lazy(() => import("@/pages/AiYordamchi"));
const Hujjatlar = lazy(() => import("@/pages/Hujjatlar"));

export const publicRoutes: RouteConfig[] = [
  {
    path: routes.HOME,
    element: Home,
    name: "Standby",
    nameKey: "home",
  },
  {
    path: routes.DASHBOARD,
    element: Dashboard,
    name: "Asosiy menyu",
    nameKey: "dashboard",
  },
  {
    path: routes.MENU,
    element: Dashboard,
    name: "Menyu",
    nameKey: "menu",
  },
  {
    path: routes.LOGIN,
    element: Login,
    name: "Kirish",
    nameKey: "login",
  },
  {
    path: routes.FORBIDDEN,
    element: Forbidden,
    name: "Ruxsat yo'q",
    nameKey: "forbidden",
  },
  {
    path: routes.JAZO_TURLARI,
    element: JazoTurlari,
    name: "Jazo turlari",
    nameKey: "jazo_turlari",
  },
  {
    path: routes.JAZO_DETAIL,
    element: JazoDetail,
    name: "Jazo turlari batafsil",
    nameKey: "jazo_detail",
  },
  {
    path: routes.MODDIY_YORDAM,
    element: ModdiyYordam,
    name: "Moddiy yordam",
    nameKey: "moddiy_yordam",
  },
  {
    path: routes.INSPEKTORLAR,
    element: Inspektorlar,
    name: "Inspektorlar",
    nameKey: "inspektorlar",
  },
  {
    path: routes.INSPEKTORLAR_DETAIL,
    element: InspektorDetail,
    name: "Inspektor ma'lumotlari",
    nameKey: "inspektor_detail",
  },
  {
    path: routes.AI_YORDAMCHI,
    element: AiYordamchi,
    name: "AI Yordamchi",
    nameKey: "ai_yordamchi",
  },
  {
    path: routes.HUJJATLAR,
    element: Hujjatlar,
    name: "Me'yoriy-huquqiy hujjatlar",
    nameKey: "hujjatlar",
  },
];

export const privateRoutes: RouteConfig[] = [
  {
    path: routes.PROFILE,
    element: Profile,
    name: "Profile",
    nameKey: "profile",
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.VAZIRLIK,
      UserRole.BOSHQARMA,
    ],
  },
];