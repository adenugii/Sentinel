import { FaqItem } from "@/core/entities/faq";
import { mockFaqData } from "@/data/mock/faq";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const faqService = {
  getAllFaqs: async (): Promise<FaqItem[]> => {
    await delay(300); // FAQ biasanya cepat
    return mockFaqData;
  }
};