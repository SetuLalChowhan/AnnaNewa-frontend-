"use client";

import { useForm } from "react-hook-form";
import ContactBanner from "@/assets/images/contact.jpg";
import useClient from "@/hooks/useClient";
import useMutationClient from "@/hooks/useMutationClient";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  // 1. Fetch System Info
  const { data: systemInfo, isLoading } = useClient({
    queryKey: ["system-info"],
    url: "/system-info",
  });

  const sysData = systemInfo?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  // 2. Setup Mutation
  const contactMutation = useMutationClient({
    url: "/contact",
    method: "post",
    successMessage: "Message sent successfully!",
    resetFunction: () => reset(),
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate({ data });
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen py-12 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${ContactBanner.src})` }}
    >
      {/* Subtle Dark Overlay for professional contrast */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-6xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* -------- Left Side: Info (40%) -------- */}
        <div className="md:col-span-5 bg-primaryColor p-10 lg:p-14 text-white flex flex-col justify-between border-r border-white/20">
          <div>
            <h2 className="text-3xl font-light tracking-tight mb-6">
              Get in <span className="font-bold">Touch</span>
            </h2>
            <p className="text-white/80 leading-relaxed mb-10 text-sm lg:text-base">
              {sysData?.description ||
                "Partner with us to transform the agricultural supply chain in Bangladesh."}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-full shrink-0">
                  <span className="text-xs italic">HQ</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                    Address
                  </p>
                  <p className="font-medium text-sm">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-full shrink-0">
                  <span className="text-xs italic">PH</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                    Phone
                  </p>
                  <p className="font-medium text-sm">
                    {isLoading ? "Connecting..." : sysData?.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-full shrink-0">
                  <span className="text-xs italic">EM</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                    Email
                  </p>
                  <p className="font-medium text-sm">
                    {isLoading ? "Loading..." : sysData?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
              Support Hours
            </p>
            <p className="text-sm italic">{sysData?.supportHours}</p>
          </div>
        </div>

        {/* -------- Right Side: Form (60%) -------- */}
        <div className="md:col-span-7 bg-white p-10 lg:p-14">
          <div className=" mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Drop us a line
            </h3>
            <p className="text-gray-500 mb-10 text-sm">
              Required fields are marked with a white border focus.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`w-full py-2 bg-transparent border-b ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    } focus:border-primaryColor focus:outline-none transition-colors text-gray-800 placeholder:text-gray-300`}
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>

                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full py-2 bg-transparent border-b ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } focus:border-primaryColor focus:outline-none transition-colors text-gray-800 placeholder:text-gray-300`}
                    placeholder="email@example.com"
                    {...register("email", {
                      required: "Required",
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 block">
                  Subject
                </label>
                <input
                  type="text"
                  className={`w-full py-2 bg-transparent border-b ${
                    errors.subject ? "border-red-500" : "border-gray-200"
                  } focus:border-primaryColor focus:outline-none transition-colors text-gray-800 placeholder:text-gray-300`}
                  placeholder="Inquiry about..."
                  {...register("subject", { required: "Subject is required" })}
                />
              </div>

              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  className={`w-full py-2 bg-transparent border-b ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  } focus:border-primaryColor focus:outline-none transition-colors resize-none text-gray-800 placeholder:text-gray-300`}
                  placeholder="How can we help?"
                  {...register("message", {
                    required: "Required",
                  })}
                />
                {errors.message && (
                  <p className="text-[10px] text-red-500 mt-1 uppercase">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={contactMutation.isPending}
                className="mt-4 px-10 py-4 bg-primaryColor text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all disabled:bg-gray-300 disabled:shadow-none"
              >
                {contactMutation.isPending
                  ? "Sending Message..."
                  : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
