import { FaqItem } from "@/core/entities/faq";

export const mockFaqData: FaqItem[] = [
  {
    id: "q1",
    question: "Bagaimana cara saya klaim garansi di service center?",
    answer: "Sangat mudah. Cukup login ke akun Sentinel Anda, masuk ke 'Garasi Gawai Saya', dan tunjukkan halaman 'Detail Sertifikat' untuk gawai Anda. Halaman itu adalah bukti pembelian sah Anda yang diakui oleh mitra service center kami."
  },
  {
    id: "q2",
    question: "Apa itu blockchain? Apakah data saya aman?",
    answer: "Blockchain adalah teknologi pencatatan digital yang tidak bisa diubah. Kami *hanya* mencatat data non-sensitif (seperti tanggal pembelian, model, dan ID transaksi) untuk menjamin bukti pembelian Anda tidak bisa diubah atau dihapus. Data pribadi Anda tetap aman di server kami."
  },
  {
    id: "q3",
    question: "Apa bedanya dengan nota email biasa?",
    answer: "Nota email bisa terhapus, masuk spam, atau dipalsukan. Sertifikat Sentinel tersimpan permanen di blockchain, terikat di akun Anda selamanya, dan diakui secara resmi oleh semua mitra service center kami sebagai bukti yang setara dengan nota fisik."
  },
];