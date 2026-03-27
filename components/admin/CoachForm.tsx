"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { type DbCoach } from "./ManageCoaches";
import { addCoach, updateCoach } from "@/app/admin/coach-actions";
import { createClient } from "@/lib/supabase/client";

export function CoachForm({ coach, onSuccess }: { coach?: DbCoach, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Track preview internally
  const [imagePreview, setImagePreview] = useState<string>(coach?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const fileFile = formData.get("imageFile") as File;
    let finalImageUrl = coach?.image || "";

    try {
      if (fileFile && fileFile.size > 0) {
        setUploadingImage(true);
        const supabase = createClient();
        const fileExt = fileFile.name.split('.').pop();
        const fileName = `coach_${Math.random()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('coaches')
          .upload(fileName, fileFile, { upsert: true });
          
        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }
        
        const { data: publicUrlData } = supabase.storage
          .from('coaches')
          .getPublicUrl(fileName);
          
        finalImageUrl = publicUrlData.publicUrl;
        setUploadingImage(false);
      } else if (!finalImageUrl && !coach) {
        throw new Error("An image is required for new coaches.");
      }
      
      // Override or set the text 'image' field for server action
      formData.set("image", finalImageUrl);
      
      if (coach?.id) {
        await updateCoach(coach.id, formData);
      } else {
        await addCoach(formData);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setUploadingImage(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-body text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-2">
            Name
          </label>
          <input
            name="name"
            defaultValue={coach?.name}
            required
            className="w-full bg-[#111] border border-outline-variant/20 rounded-sm px-4 py-3 text-on-surface font-body text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        
        <div>
          <label className="block font-body text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-2">
            Specialty
          </label>
          <input
            name="specialty"
            defaultValue={coach?.specialty}
            required
            className="w-full bg-[#111] border border-outline-variant/20 rounded-sm px-4 py-3 text-on-surface font-body text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-full sm:w-1/3">
            <label className="block font-body text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-2">
              Coach Image
            </label>
            <div 
              className="relative w-full aspect-square bg-[#111] border border-dashed border-outline-variant/30 rounded-sm flex items-center justify-center overflow-hidden cursor-pointer group hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300" />
              ) : (
                <div className="text-center p-4">
                  <svg className="w-8 h-8 mx-auto mb-2 text-on-surface-variant opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  <span className="font-body text-xs text-on-surface-variant opacity-70">Click to upload</span>
                </div>
              )}
            </div>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <div className="w-full sm:w-2/3 space-y-6">
            <div>
               <label className="block font-body text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-2">
                Layout ClassName (e.g. aspect-square)
              </label>
              <input
                name="className"
                defaultValue={coach?.class_name || "aspect-square"}
                required
                className="w-full bg-[#111] border border-outline-variant/20 rounded-sm px-4 py-3 text-on-surface font-body text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            
            <div>
               <label className="block font-body text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-2">
                Order Index (1-99)
              </label>
              <input
                name="orderIndex"
                type="number"
                defaultValue={coach?.order_index || 99}
                required
                className="w-full bg-[#111] border border-outline-variant/20 rounded-sm px-4 py-3 text-on-surface font-body text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
           <label className="block font-body text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={coach?.bio}
            required
            rows={4}
            className="w-full bg-[#111] border border-outline-variant/20 rounded-sm px-4 py-3 text-on-surface font-body text-sm focus:outline-none focus:border-primary transition-colors resize-y"
          />
        </div>
      </div>

      {error && (
        <p className="text-error text-sm font-body bg-error/10 p-3 flex items-center gap-2 border border-error/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </p>
      )}

      <div className="flex justify-end pt-4 border-t border-outline-variant/10">
        <button
          type="submit"
          disabled={loading || uploadingImage}
          className="h-12 px-8 bg-on-surface text-surface uppercase font-body text-[10px] sm:text-xs font-bold tracking-[0.2em] hover:bg-primary transition-colors rounded-sm disabled:opacity-50"
        >
          {uploadingImage ? "Uploading..." : loading ? "Saving..." : coach ? "Update Coach" : "Add Coach"}
        </button>
      </div>
    </form>
  );
}
