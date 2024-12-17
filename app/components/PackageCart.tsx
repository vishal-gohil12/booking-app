"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import BookingForm from "./BookingForm";

export type Packages = {
  _id: string;
  title: string;
  description: string;
  price: number;
  availableDates: string;
  images?: string;
};

export default function PackageCart() {
  const [packages, setPackages] = useState<Packages[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Packages[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Packages | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number | "">("");

  const handleBooking = (packageDetails: Packages) => {
    setSelectedPackage(packageDetails);
    setShowBooking(true);
  };

  const filterPackages = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = packages.filter((pkg) => {
      const matchesQuery = pkg.title.toLowerCase().includes(lowercasedQuery);
      const matchesPrice = priceRange ? pkg.price <= priceRange : true;
      return matchesQuery && matchesPrice;
    });
    setFilteredPackages(filtered);
  };

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/packages");
        if (!res.ok) throw new Error("Failed to fetch packages");

        const data = await res.json();
        setPackages(data);
        setFilteredPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }
    fetchPackages();
  }, []);

  useEffect(() => {
    filterPackages();
  }, [searchQuery, priceRange]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-12">
        Our Tour Packages
      </h1>

      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Search by destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 w-full sm:w-1/2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value) || "")}
          className="border px-4 py-2 w-full sm:w-1/2"
        />
      </div>

      {filteredPackages.length === 0 ? (
        <p className="text-center text-gray-600">No packages available.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={pkg.images || "/placeholder.jpg"}
                alt={pkg.title}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {pkg.title}
                </h2>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {pkg.description}
                </p>
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Price: Rs.{pkg.price}
                </p>
                <p className="text-gray-600 text-sm">
                  Available Dates :
                  <span className="p-2">
                    {pkg.availableDates
                      ? format(new Date(pkg.availableDates), "MMMM dd, yyyy")
                      : "N/A"}
                  </span>
                </p>
                <button
                  className="mt-2 h-8 w-full bg-blue-600 text-white cursor-pointer"
                  onClick={() => handleBooking(pkg)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="absolute top-20 w-full">
        {showBooking && selectedPackage && (
          <BookingForm
            packageDetails={selectedPackage}
            setShowBooking={setShowBooking}
          />
        )}
      </div>
    </div>
  );
}
