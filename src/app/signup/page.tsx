"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Credentials Sign Up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে!");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (error) {
        toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      } else {
        toast.success("রেজিস্ট্রেশন সফল হয়েছে! সাইন ইন করুন।");
        router.push("/signin");
      }
    } catch (err) {
      toast.error("একটি সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google Social Login
  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google Auth Error:", err);
      toast.error("Google দিয়ে সাইন ইন করা সম্ভব হয়নি!");
      setSocialLoading(null);
    }
  };

  // GitHub Social Login
  const handleGitHubLogin = async () => {
    setSocialLoading("github");
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("GitHub Auth Error:", err);
      toast.error("GitHub দিয়ে সাইন ইন করা সম্ভব হয়নি!");
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="যেমন: রহিম উদ্দিন"
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a7c36] focus:ring-1 focus:ring-[#0a7c36] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a7c36] focus:ring-1 focus:ring-[#0a7c36] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a7c36] focus:ring-1 focus:ring-[#0a7c36] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="আবার লিখুন"
              required
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a7c36] focus:ring-1 focus:ring-[#0a7c36] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full mt-2 bg-[#0a7c36] hover:bg-[#086b2f] text-white font-semibold py-2.5 rounded-xl shadow-sm transition-all text-sm active:scale-[0.98] hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400">
            অথবা
          </span>
        </div>

        {/* Social Login Buttons with Hover & Click Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || !!socialLoading}
            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-[0.97] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {socialLoading === "google" ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                সংযুক্ত হচ্ছে...
              </span>
            ) : (
              <>
                <span>Google দিয়ে চালিয়ে যান</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleGitHubLogin}
            disabled={loading || !!socialLoading}
            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-[0.97] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {socialLoading === "github" ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                সংযুক্ত হচ্ছে...
              </span>
            ) : (
              <>
                <span>GitHub দিয়ে চালিয়ে যান</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-bold text-[#0a7c36] hover:underline">
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-800 hover:underline transition-colors">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}