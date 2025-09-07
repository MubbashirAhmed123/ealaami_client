"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { baseUrl } from "../../baseUrl";

// Fetch testimonials
const fetchTestimonials = async () => {
  const res = await fetch(`${baseUrl}/api/testimonials`);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
};

// Post testimonial
const postTestimonial = async (testimonial) => {
  const res = await fetch(`${baseUrl}/api/testimonials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testimonial),
  });
  if (!res.ok) throw new Error("Failed to post testimonial");
  return res.json();
};

export default function Testimonials() {
  const queryClient = useQueryClient();

  // ✅ Fetch testimonials (now limited to 6 most recent)
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  // ✅ Mutation for posting a testimonial
  const addTestimonialMutation = useMutation({
    mutationFn: postTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // refresh list
    },
  });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    rating: 0,
  });

  const handleStarClick = (star) => {
    setFormData((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTestimonialMutation.mutate(formData);
    setFormData({ name: "", role: "", content: "", rating: 0 });
  };

  if (isLoading) return <p className="text-center">Loading testimonials...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6" id="testimonials">
      <h2 className="text-3xl font-bold text-center mb-6">Client Testimonials</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <motion.div
            key={t._id}
            className="bg-black text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Rating */}
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < t.rating ? "text-red-500" : "text-gray-500"
                  }`}
                  fill={i < t.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <p className="mt-2 italic">"{t.content}"</p>
            <p className="mt-2 font-semibold">{t.name}</p>
            <p className="text-sm text-red-400">{t.role}</p>
            <p className="text-xs mt-1">
              {new Date(t.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No testimonials yet. Be the first to leave a review!</p>
      )}

      {/* ✅ Add Testimonial Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                
                onClick={() =>
                  !addTestimonialMutation.isPending && handleStarClick(star)
                }
                className={`w-6 h-6 transition-colors duration-200 ${
                  addTestimonialMutation.isPending
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                } ${
                  star <= formData.rating
                    ? "fill-red-600 text-red-600"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">
            {formData.rating > 0
              ? `${formData.rating} star${formData.rating !== 1 ? "s" : ""}`
              : "Click to rate"}
          </p>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full mb-3 p-2 border rounded"
          required
        />

       

        <textarea
          placeholder="Your review"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="block w-full mb-3 p-2 border rounded"
          required
        />

        {/* ⭐ Star Rating Input */}
       

        <button
          type="submit"
          disabled={addTestimonialMutation.isPending}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
        >
          {addTestimonialMutation.isPending ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}