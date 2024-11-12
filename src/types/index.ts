import type { Dayjs } from "dayjs";

export interface Product {
  product_id: number;
  product_code: string;
  product_name: string;
  description: string;
  product_status: string;
}

export interface ProductFormData {
  product_code: string;
  product_name: string;
  description: string;
  product_status: string;
}

export interface Plan {
  plan_id: number;
  name: string;
  discount_rate: number;
  start_date: string;
  end_date: string;
  plan_type: string;
  plan_status: string;
}

export interface PlanFormData {
  name: string;
  discount_rate: number;
  date_range: [Dayjs, Dayjs];
  plan_type: string;
  plan_status: string;
}

export interface Package {
  package_id: number;
  name: string;
  type: string;
  price: number;
  package_status: string;
  start_date: string;
  end_date: string;
  version: number;
}

export interface PackageFormData {
  name: string;
  type: PackageType;
  price: number;
  package_status: Status;
  version: number;
  date_range: [Dayjs, Dayjs] | null;
}

export interface Module {
  module_id: number;
  name: string;
  price: number;
  product_id: number;
  module_status: string;
}

export interface ModuleFormData {
  name: string;
  price: number;
  product_id: number;
  module_status: string;
}

export interface TenantPlan {
  tenant_id: number;
  plan_id: number;
  tenant_code: string;
  assigned_at: string;
}

export interface TenantPlanFormData {
  tenant_code: string;
  plan_id: number;
  assigned_at: Dayjs;
}

export interface RecentActivityData {
  key: string;
  type: string;
  name: string;
  status: string;
  updated_at: string;
}

// Common Types
export type Status = "ACTIVE" | "INACTIVE" | "DEPRECATED";

export type PlanType = "SUBSCRIPTION" | "ONE_TIME" | "TRIAL";

export type PackageType = "SUBSCRIPTION" | "ONE_TIME" | "TRIAL";

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter Types
export interface DateRangeFilter {
  startDate?: string;
  endDate?: string;
}

export interface StatusFilter {
  status?: Status[];
}

export interface SearchFilter {
  searchTerm?: string;
}

export type CommonFilter = DateRangeFilter & StatusFilter & SearchFilter;

export interface PlanFilter extends CommonFilter {
  planType?: PlanType[];
}

export interface ProductFilter extends CommonFilter {
  productCode?: string;
}

export interface PackageFilter extends CommonFilter {
  packageType?: PackageType[];
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export interface ModuleFilter extends CommonFilter {
  productId?: number;
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export interface TenantPlanFilter extends CommonFilter {
  tenantCode?: string;
  planId?: number;
}

// Table Column Types
export interface SorterResult {
  column: {
    dataIndex: string;
  };
  order: "ascend" | "descend" | null;
}

export interface TableParams {
  pagination: {
    current: number;
    pageSize: number;
  };
  sorter?: SorterResult;
  filters?: Record<string, any>;
}
