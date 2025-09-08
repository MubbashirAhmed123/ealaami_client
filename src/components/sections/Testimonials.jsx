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

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  const addTestimonialMutation = useMutation({
    mutationFn: postTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // refresh list
      alert("Thank you for your feedback!");
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

  if (isLoading) return <p className="text-center text-gray-900 dark:text-gray-100">Loading testimonials...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-[#161717] transition-colors duration-300" id="testimonials">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">Client Testimonials</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <motion.div
            key={t._id}
            className="b dark:bg-[#161717]  text-gray-900 dark:text-white p-6 rounded-lg shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Rating */}
            <div className="flex mb-3">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < t.rating ? "text-red-500" : "text-gray-400 dark:text-gray-600"
                  }`}
                  fill={i < t.rating ? "currentColor" : "none"}
                />
              ))}
            </div>

            <p className="mt-2 italic text-gray-700 dark:text-gray-300 leading-relaxed">"{t.content}"</p>
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
              {t.role && <p className="text-sm text-red-500 dark:text-red-400">{t.role}</p>}
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                {new Date(t.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">No testimonials yet. Be the first to leave a review!</p>
      )}

      <div className="mt-10 bg-gray-50 dark:bg-[#161717] p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Add Your Review</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    : "text-gray-400 dark:text-gray-600 hover:text-red-400"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formData.rating > 0
              ? `${formData.rating} star${formData.rating !== 1 ? "s" : ""}`
              : "Click to rate"}
          </p>
        </div>

        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#161717] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
          required
        />

        <textarea
          placeholder="Share your experience..."
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows="4"
          className="block w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#161717] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 resize-vertical"
          required
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={addTestimonialMutation.isPending || formData.rating === 0}
          className="w-full bg-red-600 hover:bg-red-700  dark:disabled:bg-[#161717] border   text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addTestimonialMutation.isPending ? "Submitting..." : "Submit Review"}
        </button>
        
        {formData.rating === 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Please select a rating before submitting
          </p>
        )}
      </div>
    </div>
  );
}