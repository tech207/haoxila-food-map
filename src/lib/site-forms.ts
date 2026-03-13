import { z } from "zod";
import { categoryOptions, districtOptions } from "@/lib/customer-data";

const exploreCategoryKeys = categoryOptions.map((item) => item.key) as [string, ...string[]];
const districtValues = districtOptions.filter((district) => district !== "全部行政區") as [string, ...string[]];

export const bloggerApplySchema = z.object({
  name: z.string().trim().min(2, "請輸入姓名"),
  blogUrl: z.string().trim().url("請輸入有效網址"),
  monthlyTraffic: z.string().trim().optional(),
  note: z.string().trim().max(500, "備註請控制在 500 字內").optional(),
});

export const merchantApplySchema = z.object({
  storeName: z.string().trim().min(2, "請輸入店家名稱"),
  category: z.enum(exploreCategoryKeys),
  address: z.string().trim().min(5, "請輸入完整地址"),
  district: z.enum(districtValues),
  contactName: z.string().trim().min(2, "請輸入聯絡人"),
  phone: z.string().trim().regex(/^09\d{8}$|^0\d{1,2}-?\d{6,8}$/, "請輸入有效電話"),
  email: z.string().trim().email("請輸入有效 Email"),
  monthlyCustomers: z.string().trim().optional(),
  note: z.string().trim().max(500, "備註請控制在 500 字內").optional(),
});

export const supportContactSchema = z.object({
  name: z.string().trim().min(2, "請輸入姓名"),
  email: z.string().trim().email("請輸入有效 Email"),
  category: z.enum(["order", "refund", "account", "merchant", "other"]),
  orderId: z.string().trim().optional(),
  message: z.string().trim().min(10, "請至少輸入 10 個字"),
});

export type BloggerApplicationInput = z.infer<typeof bloggerApplySchema>;
export type MerchantApplicationInput = z.infer<typeof merchantApplySchema>;
export type SupportContactInput = z.infer<typeof supportContactSchema>;

export type BloggerApplicationRecord = BloggerApplicationInput & {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export type MerchantApplicationRecord = MerchantApplicationInput & {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

export type SupportTicketRecord = SupportContactInput & {
  id: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
};

export const bloggerApplications: BloggerApplicationRecord[] = [];
export const merchantApplications: MerchantApplicationRecord[] = [];
export const supportTickets: SupportTicketRecord[] = [];
