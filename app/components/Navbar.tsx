"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md relative w-full z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TourBook
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="/tours" className="text-gray-800 hover:text-blue-600">
              Tours
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-blue-600">
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="space-y-2 px-4 pt-2 pb-4">
            <Link href="/tours">Tours</Link>
            <Link
              href="/about"
              className="block text-gray-800 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-800 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
