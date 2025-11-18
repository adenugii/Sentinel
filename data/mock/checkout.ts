import { OrderSummaryData } from "@/core/entities/checkout";

export const mockOrderSummary: OrderSummaryData = {
  items: [
    {
      id: "item-1",
      name: "Sentinel Pro",
      details: "Security Suite",
      quantity: 1,
      price: 299000,
      icon: "shield",
    },
    {
      id: "item-2",
      name: "Advanced",
      details: "Database License", // Saya ganti 'Security License' jadi 'Database'
      quantity: 1,
      price: 199000,
      icon: "lock",
    },
  ],
  subtotal: 498000, // (299000 + 199000)
  shipping: 0,
  tax: 54780, // 11% dari 498000
  total: 572780, // (498000 + 54780)
};