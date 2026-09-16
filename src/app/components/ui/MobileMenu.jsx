"use client";

import Sidebar from "./Sidebar";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      />

      {/* Sidebar Modal */}
      <div className="fixed inset-y-0 right-0 w-64 bg-white z-50 md:hidden overflow-y-auto">
        <Sidebar onClose={onClose} />
      </div>
    </>
  );
}
