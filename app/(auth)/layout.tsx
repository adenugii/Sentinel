import AuthGraphic from "./AuthGraphic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full absolute inset-0 flex">
      {/* Kolom Kiri: Grafis (hanya tampil di layar besar) */}
      <AuthGraphic />

      {/* Kolom Kanan: Form (children) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}