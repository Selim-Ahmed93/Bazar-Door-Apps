"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name || "");
    }
  }, [session]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateUser({ name });

      if (res?.error) {
        toast.error(res.error.message || "আপডেট করা সম্ভব হয়নি!");
      } else {
        toast.success("প্রোফাইল তথ্য আপডেট সফল হয়েছে!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("আপডেট করার সময় একটি সমস্যা হয়েছে!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">আমার প্রোফাইল</h2>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            নাম পরিবর্তন করুন
          </label>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a7c36]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0a7c36] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#086b2f] transition-colors disabled:opacity-50"
        >
          {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
        </button>
      </form>
    </div>
  );
}