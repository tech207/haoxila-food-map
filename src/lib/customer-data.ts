export type ExploreCategory =
  | "latest"
  | "nearby"
  | "popular"
  | "hotpot"
  | "bbq"
  | "izakaya"
  | "dessert"
  | "brunch"
  | "taiwanese";

export type ReviewRecord = {
  id: string;
  customerName: string;
  rating: number;
  content: string;
  createdAt: string;
};

export type TicketRecord = {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  price: number;
  quantity: number;
  sold: number;
  validUntil: string;
};

export type StoreRecord = {
  id: string;
  name: string;
  district: string;
  address: string;
  description: string;
  coverImage: string;
  categories: ExploreCategory[];
  hottestTicketLine: string;
  rating: number;
  reviewCount: number;
  tickets: TicketRecord[];
  reviews: ReviewRecord[];
};

export type OrderRecord = {
  id: string;
  status: "PAID" | "REDEEMED";
  customerName: string;
  purchasedAt: string;
  redeemedAt?: string;
  redeemedStore?: string;
  totalAmount: number;
  storeId: string;
  storeName: string;
  district: string;
  ticketId: string;
  ticketTitle: string;
  validUntil: string;
};

export const categoryOptions: { key: ExploreCategory; label: string }[] = [
  { key: "latest", label: "最新" },
  { key: "nearby", label: "附近" },
  { key: "popular", label: "人氣" },
  { key: "hotpot", label: "火鍋" },
  { key: "bbq", label: "燒肉" },
  { key: "izakaya", label: "居酒屋" },
  { key: "dessert", label: "甜點" },
  { key: "brunch", label: "早午餐" },
  { key: "taiwanese", label: "台式" },
];

export const districtOptions = ["全部行政區", "中山區", "大安區", "信義區", "松山區", "萬華區"];

export const stores: StoreRecord[] = [
  {
    id: "harbor-yakiniku",
    name: "港町燒肉所",
    district: "中山區",
    address: "台北市中山區林森北路 210 號",
    description:
      "主打和牛燒肉與炭火套餐，適合下班聚餐與約會。核銷後顧客最常提到肉品厚切、桌邊服務到位。",
    coverImage:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
    categories: ["latest", "popular", "bbq"],
    hottestTicketLine: "雙人和牛燒肉套餐現省 380 元，晚餐時段最快售完。",
    rating: 4.8,
    reviewCount: 128,
    tickets: [
      {
        id: "ticket-harbor-1",
        title: "雙人和牛燒肉套餐",
        description: "含和牛拼盤、牛舌、海鮮、白飯與甜點。",
        originalPrice: 1680,
        price: 1299,
        quantity: 80,
        sold: 61,
        validUntil: "2026-04-30T23:59:59+08:00",
      },
      {
        id: "ticket-harbor-2",
        title: "平日午間燒肉定食",
        description: "限定週一至週五 11:30-14:00 使用。",
        originalPrice: 420,
        price: 329,
        quantity: 120,
        sold: 48,
        validUntil: "2026-03-31T23:59:59+08:00",
      },
    ],
    reviews: [
      {
        id: "review-harbor-1",
        customerName: "陳小姐",
        rating: 5,
        content: "肉質很穩，核銷流程很順，整體比預期更有誠意。",
        createdAt: "2026-03-08T20:10:00+08:00",
      },
      {
        id: "review-harbor-2",
        customerName: "林先生",
        rating: 4,
        content: "座位舒適，套餐份量夠，會再回購。",
        createdAt: "2026-03-02T19:30:00+08:00",
      },
    ],
  },
  {
    id: "mori-izakaya",
    name: "森夜食堂",
    district: "大安區",
    address: "台北市大安區復興南路一段 155 號",
    description:
      "深夜系居酒屋，串燒、清酒與招牌雞白湯是常客必點。真實評價集中在出餐快與氛圍感。",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    categories: ["nearby", "popular", "izakaya"],
    hottestTicketLine: "招牌串燒拼盤搭清酒組，適合 2 人輕鬆續攤。",
    rating: 4.6,
    reviewCount: 93,
    tickets: [
      {
        id: "ticket-mori-1",
        title: "人氣串燒雙人組",
        description: "雞腿蔥串、明太子山藥、牛五花番茄與清酒 2 杯。",
        originalPrice: 980,
        price: 699,
        quantity: 60,
        sold: 39,
        validUntil: "2026-05-15T23:59:59+08:00",
      },
    ],
    reviews: [
      {
        id: "review-mori-1",
        customerName: "王小姐",
        rating: 5,
        content: "店員會主動提醒核銷內容，體驗很好。",
        createdAt: "2026-03-05T23:00:00+08:00",
      },
      {
        id: "review-mori-2",
        customerName: "鄭先生",
        rating: 4,
        content: "氣氛夠，適合約朋友小酌。",
        createdAt: "2026-02-24T22:10:00+08:00",
      },
    ],
  },
  {
    id: "bloom-brunch",
    name: "Bloom 朝食研究室",
    district: "信義區",
    address: "台北市信義區松仁路 88 號 2 樓",
    description:
      "明亮開放式早午餐空間，主打手作酸種、奶油炒菇與季節甜點，假日排隊率高。",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    categories: ["latest", "brunch", "dessert"],
    hottestTicketLine: "經典早午餐套票含飲品升級，週末最熱門。",
    rating: 4.7,
    reviewCount: 74,
    tickets: [
      {
        id: "ticket-bloom-1",
        title: "經典早午餐套票",
        description: "任選主餐 1 份，加購飲品可折 60 元。",
        originalPrice: 520,
        price: 399,
        quantity: 90,
        sold: 56,
        validUntil: "2026-04-20T23:59:59+08:00",
      },
      {
        id: "ticket-bloom-2",
        title: "雙人甜點下午茶",
        description: "含巴斯克、提拉米蘇與飲品 2 杯。",
        originalPrice: 760,
        price: 599,
        quantity: 40,
        sold: 12,
        validUntil: "2026-04-10T23:59:59+08:00",
      },
    ],
    reviews: [
      {
        id: "review-bloom-1",
        customerName: "張小姐",
        rating: 5,
        content: "套餐很有飽足感，甜點表現也好。",
        createdAt: "2026-03-10T14:10:00+08:00",
      },
    ],
  },
  {
    id: "oldstreet-hotpot",
    name: "老街湯鍋",
    district: "萬華區",
    address: "台北市萬華區成都路 51 號",
    description:
      "經典台式石頭火鍋，湯頭厚實，晚餐與宵夜時段需求穩定，適合家人聚餐。",
    coverImage:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    categories: ["nearby", "hotpot", "taiwanese"],
    hottestTicketLine: "雙人海陸鍋平日券，剩餘庫存低於 20 張。",
    rating: 4.5,
    reviewCount: 112,
    tickets: [
      {
        id: "ticket-oldstreet-1",
        title: "雙人海陸石頭鍋",
        description: "含梅花豬、蛤蜊、鮮蝦與菜盤雙份。",
        originalPrice: 1380,
        price: 1088,
        quantity: 50,
        sold: 33,
        validUntil: "2026-03-28T23:59:59+08:00",
      },
    ],
    reviews: [
      {
        id: "review-oldstreet-1",
        customerName: "李先生",
        rating: 4,
        content: "湯頭香，份量足，核銷不用等太久。",
        createdAt: "2026-03-06T18:40:00+08:00",
      },
    ],
  },
  {
    id: "atelier-dessert",
    name: "雲朵甜點工坊",
    district: "松山區",
    address: "台北市松山區民生東路三段 127 巷 8 號",
    description:
      "法式甜點與手沖咖啡專門店，適合下午約會。購券用戶多半回饋千層與可麗露表現穩定。",
    coverImage:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
    categories: ["popular", "dessert", "nearby"],
    hottestTicketLine: "雙人甜點盤與咖啡組，下午 3 點後兌換最熱門。",
    rating: 4.9,
    reviewCount: 51,
    tickets: [
      {
        id: "ticket-atelier-1",
        title: "雙人甜點盤與咖啡",
        description: "可任選甜點 2 份與指定咖啡 2 杯。",
        originalPrice: 680,
        price: 499,
        quantity: 70,
        sold: 58,
        validUntil: "2026-04-12T23:59:59+08:00",
      },
    ],
    reviews: [
      {
        id: "review-atelier-1",
        customerName: "郭小姐",
        rating: 5,
        content: "甜點擺盤很完整，票券使用門檻低。",
        createdAt: "2026-03-01T16:05:00+08:00",
      },
    ],
  },
];

export const orders: OrderRecord[] = [
  {
    id: "order-10021",
    status: "PAID",
    customerName: "王小美",
    purchasedAt: "2026-03-11T10:20:00+08:00",
    totalAmount: 1299,
    storeId: "harbor-yakiniku",
    storeName: "港町燒肉所",
    district: "中山區",
    ticketId: "ticket-harbor-1",
    ticketTitle: "雙人和牛燒肉套餐",
    validUntil: "2026-04-30T23:59:59+08:00",
  },
  {
    id: "order-10018",
    status: "PAID",
    customerName: "王小美",
    purchasedAt: "2026-03-09T09:10:00+08:00",
    totalAmount: 399,
    storeId: "bloom-brunch",
    storeName: "Bloom 朝食研究室",
    district: "信義區",
    ticketId: "ticket-bloom-1",
    ticketTitle: "經典早午餐套票",
    validUntil: "2026-04-20T23:59:59+08:00",
  },
  {
    id: "order-9981",
    status: "REDEEMED",
    customerName: "王小美",
    purchasedAt: "2026-02-28T13:20:00+08:00",
    redeemedAt: "2026-03-01T19:15:00+08:00",
    redeemedStore: "森夜食堂 大安本店",
    totalAmount: 699,
    storeId: "mori-izakaya",
    storeName: "森夜食堂",
    district: "大安區",
    ticketId: "ticket-mori-1",
    ticketTitle: "人氣串燒雙人組",
    validUntil: "2026-05-15T23:59:59+08:00",
  },
];

export function getStoreById(storeId: string) {
  return stores.find((store) => store.id === storeId);
}

export function getTicketById(ticketId: string) {
  for (const store of stores) {
    const ticket = store.tickets.find((item) => item.id === ticketId);
    if (ticket) {
      return {
        ...ticket,
        storeId: store.id,
        storeName: store.name,
        district: store.district,
      };
    }
  }

  return undefined;
}

export function getOrderById(orderId: string) {
  return orders.find((order) => order.id === orderId);
}

export function getOrdersByStatus(status: "PAID" | "REDEEMED") {
  return orders.filter((order) => order.status === status);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateString));
}

export function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function buildOtpCode(orderId: string, time = Date.now()) {
  const slot = Math.floor(time / 30000);
  const seed = `${orderId}-${slot}`;
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1000000;
  }

  return String(hash).padStart(6, "0");
}
