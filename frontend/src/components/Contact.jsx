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

        {/* Contact Information */}
        <div className="space-y-4 mb-8">

          <div>
            <h2 className="font-bold text-lg text-blue-700">
              📧 Email
            </h2>
            <p>tracknpay@gmail.com</p>
          </div>

          <div>
            <h2 className="font-bold text-lg text-blue-700">
              📱 Phone
            </h2>
            <p>+91 6205666853</p>
          </div>

          <div>
            <h2 className="font-bold text-lg text-blue-700">
              📍 Location
            </h2>
            <p>Patna, Bihar, India</p>
          </div>

        </div>

        {/* Simple Feedback Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for your feedback!");
          }}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border rounded-lg p-3"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
};

export default Contact;