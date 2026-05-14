/*
 * =========================== FEEDBACK FORM ===========================
 * - Structure for the feedback feature which will appear in a modal.
 * - The logic is applied to both content feedback and general contact.
 * - The emailjs service is used to send the feedback. (workaround for static nature of the website)
 */

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { clsx } from "clsx";

import {
  EMAILJS_SERVICE_IDS,
  EMAILJS_PUBLIC_KEYS,
  EMAILJS_TEMPLATE_KEYS,
} from "../entities/data";
import { feedbackIcons, metaIcons } from "../icons";
import { Modal } from "../overlays/modal";

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  subjectName: string;
  type: "article" | "course" | "generalContact";
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  isOpen,
  onClose,
  subjectName,
  type,
}) => {
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");

  // Reset form when modal opens or when type/subjectName changes
  useEffect(() => {
    if (isOpen) {
      // Reset all form state when modal opens
      setRating(0);
      setIsSubmitted(false);
      setError(null);
      setFormData({ name: "", email: "", message: "" });
      setEmailError("");
    }
  }, [isOpen, subjectName, type]);

  const validateEmail = (value: string) => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(
      valid || value === "" ? "" : "Please enter a valid email address.",
    );
  };

  const buttonTheme = {
    article:
      "bg-site-blog text-auxiliary-white dark:text-auxiliary-black hover:bg-auxiliary-purple-shade dark:hover:bg-auxiliary-purple-tint",
    course:
      "bg-site-courses text-auxiliary-white dark:text-auxiliary-black hover:bg-auxiliary-green-shade dark:hover:bg-auxiliary-green-tint",
    generalContact:
      "bg-site-general text-auxiliary-white dark:text-auxiliary-black hover:bg-auxiliary-blue-shade dark:hover:bg-auxiliary-blue-tint",
  }[type];

  const glowTheme = {
    article: "var(--color-effect-glow-blog)",
    course: "var(--color-effect-glow-courses)",
    generalContact: "var(--color-effect-glow-brand)",
  }[type];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSending) return;

    // Validate email is not empty and valid
    if (!formData.email) {
      setEmailError("Email address is required.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (emailError) return;

    setIsSending(true);
    setError(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      subject_name: subjectName,
      type: type,
      rating: type !== "generalContact" ? rating : "N/A",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_IDS[type],
        EMAILJS_TEMPLATE_KEYS[type],
        templateParams,
        EMAILJS_PUBLIC_KEYS[type],
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setRating(0);
      setEmailError(""); // Reset email error
      setError(null); // Reset general error

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  // Handle modal close - prevent closing while sending
  const handleClose = () => {
    if (!isSending) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        type === "generalContact"
          ? "General Query/Message"
          : `Feedback: ${subjectName}`
      }
    >
      <div className="relative">
        {/* Loading overlay when sending */}
        {isSending && (
          <div className="absolute inset-0 bg-black/30 dark:bg-white/10 rounded-lg backdrop-blur-[2px] z-10 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl flex items-center gap-3">
              <feedbackIcons.sending size={24} className="animate-spin" />
              <span className="font-medium text-site-text dark:text-site-darkText">
                Sending your feedback...
              </span>
            </div>
          </div>
        )}

        {/* Form container with reduced opacity when sending */}
        <div className={clsx(isSending && "opacity-50 pointer-events-none")}>
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-auxiliary-green-shade dark:bg-auxiliary-green-tint text-auxiliary-green-neutral rounded-full flex items-center justify-center mx-auto">
                <feedbackIcons.sent size={32} className="fill-current" />
              </div>
              <h4 className="text-xl font-display font-bold">Thank You!</h4>
              <p className="text-site-mutedText">
                Your{" "}
                {type === "generalContact"
                  ? "enquiry/message"
                  : type === "article"
                    ? `article feedback on ${subjectName}`
                    : `course feedback on ${subjectName}`}{" "}
                has been submitted. We will reply as soon as we can.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 rounded-lg bg-auxiliary-red-shade/10 dark:bg-auxiliary-red-tint/10 border border-auxiliary-red-neutral/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-auxiliary-red-shade dark:bg-auxiliary-red-tint text-auxiliary-red-neutral rounded-full flex items-center justify-center">
                      <feedbackIcons.failed
                        size={16}
                        className="fill-current"
                      />
                    </div>
                    <p className="text-auxiliary-red-neutral text-sm flex-1">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-site-mutedText mb-1">
                  Your Name:
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-site-borderOutline bg-transparent focus:ring-2 focus:ring-site-general outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-site-mutedText mb-1">
                  Email Address:
                </label>
                <input
                  required
                  type="email"
                  className={clsx(
                    "w-full px-4 py-2 rounded-lg border bg-transparent focus:ring-2 focus:ring-site-general outline-none",
                    emailError
                      ? "border-auxiliary-red-shade dark:border-auxiliary-red-tint focus:ring-auxiliary-red-neutral"
                      : "border-site-borderOutline",
                  )}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    validateEmail(e.target.value);
                  }}
                />
                {emailError && (
                  <p className="text-auxiliary-red-neutral text-xs mt-1">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                {type !== "generalContact" && (
                  <div>
                    <label className="block text-sm font-medium text-site-mutedText mb-2">
                      Rating:
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""} out of 5`}
                        >
                          <metaIcons.star
                            size={24}
                            className={clsx(
                              "transition-colors",
                              rating >= star
                                ? "fill-auxiliary-yellow text-auxiliary-yellow"
                                : "text-auxiliary-white dark:text-auxiliary-black",
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-site-mutedText mb-1">
                  {type === "generalContact"
                    ? "Enquiry/Message"
                    : "Comment/Feedback"}
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-site-borderOutline bg-transparent focus:ring-2 focus:ring-site-general outline-none resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={clsx(
                  "glow-border w-full py-3 font-display font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed",
                  buttonTheme,
                )}
                style={{ "--glow-color": glowTheme } as React.CSSProperties}
              >
                {isSending ? (
                  <>
                    <feedbackIcons.sending
                      size={18}
                      style={{
                        animation: "fly-up 1.8s ease-in-out infinite",
                        transformOrigin: "center",
                      }}
                    />
                    <span
                      style={{
                        animation: "fade-sending 1.8s ease-in-out infinite",
                      }}
                    >
                      Sending...
                    </span>
                  </>
                ) : (
                  `Submit ${type === "generalContact" ? "Enquiry/Message" : type === "article" ? "Article Feedback" : "Course Feedback"}`
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};
