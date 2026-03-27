"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";

import { submitContactMessage } from "@/app/contact/actions";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [initialType, setInitialType] = useState("Membership Application");
  const [initialMessage, setInitialMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeStr = params.get("type");
      if (typeStr) {
        setInitialType(typeStr);
      }
      const planStr = params.get("plan");
      if (planStr) {
        setInitialMessage(`I am interested in the ${planStr} membership plan.`);
      }
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await submitContactMessage(formData);
      
      if (res.success) {
        setIsSuccess(true);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 space-y-6 animate-in fade-in duration-700">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-on-surface">Request Received</h3>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-sm">
          Your inquiry has been successfully transmitted to our concierge team. We will be in touch within 24 hours to discuss your membership or consultation.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="font-body text-sm uppercase tracking-widest text-on-surface-variant">Full Name</label>
        <input name="name" required type="text" className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-3 outline-none text-on-surface font-body transition-colors" placeholder="e.g. James Kensington" />
      </div>
      <div className="space-y-2">
        <label className="font-body text-sm uppercase tracking-widest text-on-surface-variant">Email Address</label>
        <input name="email" required type="email" className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-3 outline-none text-on-surface font-body transition-colors" placeholder="james@example.com" />
      </div>
      <div className="space-y-2">
        <label className="font-body text-sm uppercase tracking-widest text-on-surface-variant">Inquiry Type</label>
        <select 
          name="type" 
          value={initialType}
          onChange={(e) => setInitialType(e.target.value)}
          className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-3 outline-none text-on-surface font-body transition-colors [&>option]:bg-surface-container-low"
        >
          <option value="Membership Application">Membership Application</option>
          <option value="Private Tour Request">Private Tour Request</option>
          <option value="Personal Training">Personal Training</option>
          <option value="Media Inquiry">Media Inquiry</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="font-body text-sm uppercase tracking-widest text-on-surface-variant">Message (Optional)</label>
        <textarea 
          name="message" 
          rows={4} 
          value={initialMessage}
          onChange={(e) => setInitialMessage(e.target.value)}
          className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-3 outline-none text-on-surface font-body transition-colors resize-none" 
          placeholder="How can we assist you?"
        ></textarea>
      </div>
      <Button variant="primary" className="w-full mt-8 relative" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-[#131313]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            SUBMITTING...
          </span>
        ) : (
          "Submit Inquiry"
        )}
      </Button>
    </form>
  );
}
