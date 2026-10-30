"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Don't show sidebar/header on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[#F8F3E8]">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-white px-4 shadow lg:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="shrink-0 text-gray-700"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>

          <h1 className="truncate text-lg font-bold text-forest sm:text-xl">
            Ivalin Care Admin
          </h1>
        </div>
      </header>

      {/* Sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <main className="min-w-0 flex-1 min-h-screen w-full p-4 pt-20 lg:ml-64 lg:p-6 lg:pt-6">
        {children}
      </main>
    </div>
  );
}