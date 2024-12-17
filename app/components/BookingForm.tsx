"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Packages } from "./PackageCart";
import axios from "axios";
import jsPDF from "jspdf";

type Booking = {
  name: string;
  email: string;
  phone: number;
  travelers: number;
  specialRequest?: string;
};

export default function BookingForm({
  packageDetails,
  setShowBooking,
}: {
  packageDetails?: Packages;
  setShowBooking: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState<Booking>({
    name: "",
    email: "",
    phone: 0,
    travelers: 1,
    specialRequest: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeBookingForm = () => {
    setShowBooking(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      tour_id: packageDetails?._id,
    };
    try {
      const res = await axios.post("api/booking", bookingData);
      console.log(res.data);
      const invoiceData = {
        user: res.data.user,
        tour_id: packageDetails?._id,
        travelers: formData.travelers,
        specialRequest: formData.specialRequest,
      };
      const invoiceRes = await axios.post("/api/invoice", invoiceData);
      console.log(invoiceRes);
      generateInvoicePDF(invoiceData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again later.");
    }
  };

  function generateInvoicePDF(invoice: any) {
    console.log("Invoice ", invoice);
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, { align: "center" });
    let totalPrice: number | undefined = packageDetails?.price;
    if (packageDetails) {
      totalPrice = packageDetails?.price * invoice.travelers;
    }
    doc.setFontSize(12);
    doc.text(`User Name: ${invoice.user.name}`, 20, 40);
    doc.text(`Package Name: ${packageDetails?.title}`, 20, 50);
    doc.text(`Number of Travelers: ${invoice.travelers}`, 20, 60);
    doc.text(`Special Request: ${invoice.specialRequest}`, 20, 70);
    doc.text(`Total Price: Rs. ${totalPrice || "N/A"}`, 20, 80);
    doc.text(
      `Created At: ${new Date(
        invoice.createdAt || Date.now()
      ).toLocaleString()}`,
      20,
      90
    );

    doc.save("invoice.pdf");
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-center w-full md:w-auto mb-2 md:mb-0">
          Booking for {packageDetails?.title || "Package"}
        </h3>
        <button
          className="cursor-pointer text-xl md:ml-4"
          onClick={closeBookingForm}
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-lg font-medium text-gray-700"
          >
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="travelers"
            className="block text-lg font-medium text-gray-700"
          >
            Number of Travelers:
          </label>
          <input
            type="number"
            id="travelers"
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            min="1"
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="specialRequest"
            className="block text-lg font-medium text-gray-700"
          >
            Special Requests (Optional):
          </label>
          <input
            type="text"
            id="specialRequest"
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button
            type="submit"
            className="w-full md:w-1/3 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Booking
          </button>
          <button className="w-full md:w-1/3 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Download Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
