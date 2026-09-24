
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { User, Camera, Trash2, Shield, Bell } from "lucide-react";
import { toast } from "sonner";

export default function UserProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB.");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
      toast.success("Profile picture updated!");
    }
  };

  // Remove current avatar
  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Profile picture removed.");
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile details, avatar, and account preferences
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Main Card */}
        <div className="space-y-8 rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-xl">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6 border-b border-border/40 pb-6 sm:flex-row">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />

            <div className="relative group">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted text-muted-foreground">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Profile Picture"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User size={40} />
                )}
              </div>

              {/* Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-red text-white shadow-md transition-transform hover:scale-105"
                title="Upload Photo"
              >
                <Camera size={14} />
              </button>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-semibold text-foreground">Profile Picture</h3>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or WEBP. Max size of 2MB.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-1 sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent"
                >
                  Change Photo
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/20"
                  >
                    <Trash2 size={12} />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="h-10 w-full rounded-lg border border-border bg-background/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Username
              </label>
              <input
                type="text"
                defaultValue="johndoe"
                className="h-10 w-full rounded-lg border border-border bg-background/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="h-10 w-full rounded-lg border border-border bg-background/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">
                Bio
              </label>
              <textarea
                rows={3}
                placeholder="Write a short bio about your movie taste..."
                className="w-full resize-none rounded-lg border border-border bg-background/50 p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="h-10 rounded-lg bg-primary-red px-6 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-xl">
            <div className="rounded-lg bg-primary-red/10 p-2 text-primary-red">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Password & Security</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Change your password or enable 2FA.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-xl">
            <div className="rounded-lg bg-primary-red/10 p-2 text-primary-red">
              <Bell size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Manage movie updates and newsletter emails.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}