export type FaqCategory = "purchase" | "otp" | "wallet" | "account";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "purchase-1",
    category: "purchase",
    question: "如何購買票券？",
    answer: "在探索頁選擇餐廳與方案後登入，於購券確認頁完成購買，票券會立即進入票夾。",
  },
  {
    id: "purchase-2",
    category: "purchase",
    question: "可以買多張同一張票嗎？",
    answer: "可以，每一次購買都會建立獨立訂單與獨立 OTP，方便核銷與查詢。",
  },
  {
    id: "purchase-3",
    category: "purchase",
    question: "付款方式有哪些？",
    answer: "Phase 1 先提供 Demo 購買流程；Phase 2 預計支援 LINE Pay 與信用卡。",
  },
  {
    id: "purchase-4",
    category: "purchase",
    question: "我可以送票給朋友嗎？",
    answer: "Phase 2 會評估票券轉贈功能，目前每張票券僅限購買帳號本人使用。",
  },
  {
    id: "purchase-5",
    category: "purchase",
    question: "票券有使用期限嗎？",
    answer: "每張票券都會顯示有效期限，逾期後即失效，購買前請先確認可使用時段。",
  },
  {
    id: "otp-1",
    category: "otp",
    question: "核銷時需要什麼？",
    answer: "進入票夾找到對應票券，開啟 OTP 動態碼頁面，將畫面出示給店員核對即可。",
  },
  {
    id: "otp-2",
    category: "otp",
    question: "OTP 是什麼？為什麼每 30 秒會變？",
    answer: "OTP 是一次性動態密碼。每 30 秒更新一次，能避免截圖被重複使用。",
  },
  {
    id: "otp-3",
    category: "otp",
    question: "店員核銷失敗怎麼辦？",
    answer: "先確認票券狀態仍為未兌換，若持續失敗請聯絡客服並提供訂單編號協助查詢。",
  },
  {
    id: "otp-4",
    category: "otp",
    question: "核銷後多久可以寫評價？",
    answer: "核銷完成後系統即開放評價資格，後續可在票夾的已兌換清單中留下評論。",
  },
  {
    id: "otp-5",
    category: "otp",
    question: "可以拒絕核銷嗎？",
    answer: "一旦由店員完成 OTP 核銷，該筆票券即視為已使用，無法撤銷。",
  },
  {
    id: "wallet-1",
    category: "wallet",
    question: "找不到我的票券？",
    answer: "請先確認登入帳號正確、票券尚未過期，並重新整理票夾頁面後再查看。",
  },
  {
    id: "wallet-2",
    category: "wallet",
    question: "票券過期了怎麼辦？",
    answer: "過期票券會轉為失效狀態，若有特殊情況請先參考退款政策或聯絡客服。",
  },
  {
    id: "wallet-3",
    category: "wallet",
    question: "可以退票嗎？",
    answer: "退款條件依購買時間、是否核銷與票券狀態而定，請至退款政策頁查看完整說明。",
  },
  {
    id: "account-1",
    category: "account",
    question: "如何登入？",
    answer: "Phase 1 先提供 Demo 顧客登入，Phase 2 預計支援 LINE Login 與正式帳密登入。",
  },
  {
    id: "account-2",
    category: "account",
    question: "我的個人資料如何保護？",
    answer: "平台依個資法精神處理帳戶資訊，並限制內部存取權限，詳細內容可參考隱私政策。",
  },
  {
    id: "account-3",
    category: "account",
    question: "如何更改個人資料？",
    answer: "登入後可前往我的帳戶頁查看目前資料，後續版本會補上完整編輯功能。",
  },
];
