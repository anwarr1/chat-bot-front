import React, { useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  LineChart,
  Cloud,
  Users,
  Database,
} from "lucide-react";
import ChatBot from "@/components/ChatBot";

const HomePage = () => {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 shadow-md">
        <div className="w-full mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-3xl font-extrabold tracking-wide">Gear9</div>

            {/* Navigation Links */}
            <div className="flex space-x-6 text-lg">
              {["About", "Projects", "Recruitment"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Call to Action Button */}
            <button className="bg-emerald-400 text-gray-900 px-5 py-2 rounded-lg font-semibold hover:bg-emerald-500 transition duration-300">
              Ready to collaborate?
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Nous offrons une solide expertise en
          <span className="text-blue-400"> Digital</span>
        </h1>

        <h2 className="text-3xl font-semibold mt-16">
          Our Expertise
          <span className="block text-blue-400 font-bold text-4xl mt-2">
            Salesforce
          </span>
        </h2>
      </main>

      {/* Floating Chatbot Button */}
      <ChatBot ></ChatBot>
    </div>
  );
};

export default HomePage;
