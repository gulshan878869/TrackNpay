import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-100 to-blue-100">
      
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        Contact Us
      </h1>

      <div className="max-w-2xl bg-white shadow-lg rounded-xl p-6">
        
        <p className="text-gray-700 mb-6">
          If you have any questions, suggestions, or feedback regarding
          TrackNPay, feel free to contact us.
        </p>

        <form className="space-y-4">
          
          <div>
            <label className="block font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
};

export default Contact;