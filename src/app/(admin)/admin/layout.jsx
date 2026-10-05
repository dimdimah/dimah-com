export const metadata = {
  title: "Dimah Studio — Visual CMS Editor",
  description: "Admin Visual Studio & CMS for dimah-com",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#000000] text-[#ededed] font-sans antialiased selection:bg-white selection:text-black">
      {children}
    </div>
  );
}
