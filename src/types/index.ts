import type { ComponentType } from "react";

export const UserRole = {
  ADMIN: 0,
  VAZIRLIK: 1,
  BOSHQARMA: 2,
  OPERATOR: 3,
  FINANCE: 4,
  EDOC: 8,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface RouteConfig {
  path: string;
  element: ComponentType;
  name?: string;
  nameKey?: string;
  requiredRole?: number;
  allowedRoles?: number[];
  redirectTo?: string;
}