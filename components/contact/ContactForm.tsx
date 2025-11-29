"use client";

import { useForm } from "react-hook-form";
import ContactBanner from "@/assets/images/contact.jpg";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact Form Data:", data);
    reset();
  };

  return (
    <div
      className=" section-padding-x bg-cover bg-center bg-no-repea h-screen"
      style={{ backgroundImage: `url(${ContactBanner.src})` }}
    >
      {/* Overlay */}
      <div className=" py-16 rounded-xl">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/60 bg-blur-[4px] backdrop-blur-md p-8 rounded-2xl shadow-lg">

          {/* -------- Left Side -------- */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primaryColor">
              Contact Information
            </h2>
            <p className="text-gray-600">
              Feel free to contact us for support, partnership, or inquiries.
            </p>

            <div className="space-y-4 text-gray-700">

              <div>
                <p className="font-semibold">Address</p>
                <p>Dhaka, Bangladesh</p>
              </div>

              <div>
                <p className="font-semibold">Phone</p>
                <p>+880 1700 000 000</p>
              </div>

              <div>
                <p className="font-semibold">Email</p>
                <p>support@annanewa.com</p>
              </div>

              <div>
                <p className="font-semibold">Support Hours</p>
                <p>Sun - Thu: 9:00 AM - 6:00 PM</p>
              </div>

            </div>
          </div>

          {/* -------- Right Side -------- */}
          <div>
            <h2 className="text-2xl font-bold text-primaryColor mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-primaryColor"
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-primaryColor"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.subject
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-primaryColor"
                  }`}
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-primaryColor"
                  }`}
                  {...register("message", {
                    required: "Message cannot be empty",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 characters required",
                    },
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-primaryColor text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactForm;
