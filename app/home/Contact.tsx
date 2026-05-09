"use client";

import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";
import RevealForm from "@/components/ui/RevealForm";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    console.log(formData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent("Hi Bari!");
    const body = encodeURIComponent(`Hi Bari, ${formData.message}`);

    window.location.href = `mailto:nssr.mbr@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-12">
      <RevealMedia
        type="image"
        src="/assets/contact_section.webp"
        alt="ahmad_nasser_ambari"
        className="rounded-2xl overflow-hidden w-full"
        width={1360}
        height={768}
        direction="up"
        trigger="viewport"
      />

      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-2">
          <RevealText
            text={`Henlo There 👋`}
            mode="sentence"
            delay={0.2}
            stagger={0.2}
            trigger="viewport"
          />
        </h2>
        <p className="text-gray-400">
          <RevealText
            text={"Hit me so what can having a chit-chat to talk everything!"}
            mode="word"
            duration={0.4}
            delay={0.2}
            stagger={0.1}
            trigger="viewport"
          />
        </p>

        <RevealForm
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
          trigger="viewport"
          stagger={0.2}
        >
          <input
            type="text"
            placeholder="Your Name or Company"
            className="w-full bg-neutral-200 text-black px-6 py-5 rounded-xl focus:outline-none"
            onChange={handleChange}
            name="name"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-neutral-200 text-black px-6 py-5 rounded-xl focus:outline-none"
            onChange={handleChange}
            name="email"
          />
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full bg-neutral-200 text-black px-6 py-5 rounded-xl focus:outline-none resize-none"
            onChange={handleChange}
            name="message"
          />
          <button
            className="w-full bg-neutral-200 text-black py-5 rounded-xl font-semibold hover:bg-white"
            type="submit"
          >
            HIT ME 💥
          </button>
        </RevealForm>
      </div>
    </div>
  );
};

export default Contact;
