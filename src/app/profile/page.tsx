"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface ProfileUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const user = session?.user as ProfileUser | undefined;

  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [githubAvatar, setGithubAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    let isMounted = true;

    const fetchGithubAvatar = async () => {
      try {
        const response = await fetch("/api/profile/github-avatar");

        if (!response.ok) {
          return;
        }

        const data: { avatarUrl?: string | null; avatar_url?: string | null } =
          await response.json();

        if (isMounted) {
          setGithubAvatar(data.avatarUrl ?? data.avatar_url ?? null);
        }
      } catch (error) {
        console.error("GitHub avatar fetch error:", error);
      }
    };

    if (user) {
      void fetchGithubAvatar();
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleUpdateProfile = async () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (trimmedName === user?.name) {
      setIsEditing(false);
      toast("কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(
          result.error.message || "প্রোফাইল আপডেট করা যায়নি।"
        );
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      setIsEditing(false);
    } catch (error: unknown) {
      console.error("Profile update error:", error);

      toast.error("প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট করেছেন!");

            router.replace("/");
            router.refresh();
          },
          onError: (context) => {
            toast.error(
              context.error.message ||
                "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"
            );

            setIsSigningOut(false);
          },
        },
      });
    } catch (error: unknown) {
      console.error("Sign out error:", error);

      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setIsSigningOut(false);
    }
  };

  // Loading skeleton
  if (isPending) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="mb-8 h-8 w-48 rounded bg-gray-200" />

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="h-24 w-24 rounded-full bg-gray-200" />

              <div className="w-full space-y-3 sm:flex-1">
                <div className="mx-auto h-6 w-40 rounded bg-gray-200 sm:mx-0" />
                <div className="mx-auto h-4 w-56 rounded bg-gray-200 sm:mx-0" />
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <div className="h-12 w-full rounded-lg bg-gray-200" />
              <div className="h-12 w-full rounded-lg bg-gray-200" />
              <div className="h-11 w-full rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // User is not logged in
  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            👤
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            লগইন প্রয়োজন
          </h1>

          <p className="mt-3 text-gray-600">
            আপনার প্রোফাইল দেখতে প্রথমে লগইন করুন।
          </p>

          <button
            type="button"
            onClick={() => router.push("/signin")}
            className="mt-6 w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            লগইন করুন
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-3 w-full rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            হোম পেজে ফিরে যান
          </button>
        </div>
      </main>
    );
  }

  const avatar =
    githubAvatar ||
    user.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name || "User"
    )}&background=0a7c36&color=ffffff&size=200`;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Bazar Door
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-gray-600">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং প্রয়োজনে আপডেট করুন।
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Profile Banner */}
          <div className="h-28 bg-gradient-to-r from-green-700 to-green-500 sm:h-36" />

          <div className="px-5 pb-7 sm:px-8 sm:pb-8">
            {/* Avatar and User Info */}
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-sm sm:h-28 sm:w-28">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt={`${user.name || "User"} profile`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="pb-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name || "ব্যবহারকারী"}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-600">
                  {user.email}
                </p>

                <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  লগইন করা হয়েছে
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200" />

            {/* Profile Information */}
            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-gray-900">
                  ব্যক্তিগত তথ্য
                </h3>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setName(user.name || "");
                      setIsEditing(true);
                    }}
                    className="rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                  >
                    তথ্য পরিবর্তন
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    আপনার নাম
                  </label>

                  {isEditing ? (
                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="আপনার নাম লিখুন"
                      autoComplete="name"
                      maxLength={100}
                      disabled={isSaving}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                    />
                  ) : (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                      {user.name || "নাম দেওয়া হয়নি"}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    ইমেইল ঠিকানা
                  </label>

                  <input
                    id="profile-email"
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600 outline-none"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    ইমেইল ঠিকানা এখানে পরিবর্তন করা যাবে না।
                  </p>
                </div>

                {/* Save / Cancel */}
                {isEditing && (
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleUpdateProfile}
                      disabled={isSaving}
                      className="flex-1 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setName(user.name || "");
                        setIsEditing(false);
                      }}
                      disabled={isSaving}
                      className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                    >
                      বাতিল
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                অ্যাকাউন্ট
              </h3>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut || isSaving}
                className="w-full rounded-lg border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </button>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm font-semibold text-green-700 transition hover:text-green-900"
          >
            ← হোম পেজে ফিরে যান
          </button>
        </div>
      </div>
    </main>
  );
}