"use client";
import React, { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableDates, setAvailableDates] = useState("");
  const [images, setImages] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("availableDates", availableDates);
    if (images) formData.append("images", images);

    try {
      const res = await axios.post("/api/admin/packages", formData);
      setMessage("Package created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setAvailableDates("");
      setImages(null);
    } catch (error) {
      console.error("Error creating package:", error);
      setMessage("Failed to create package.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Admin Panel - Create Package
        </h1>
        {message && (
          <p className="text-center text-green-600 mb-4">{message}</p>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Package Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="date"
            value={availableDates}
            onChange={(e) => setAvailableDates(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImages(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded"
          >
            Create Package
          </button>
        </form>
      </div>
    </div>
  );
}
