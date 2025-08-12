"use client";


export default function Contact() {
  return (
    
      <section className="relative max-w-lg mx-auto mt-12 bg-card-bg dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-border dark:border-gray-700 overflow-hidden">
        <h2 className="text-3xl font-extrabold mb-4 text-primary dark:text-blue-400 tracking-tight z-10 relative">
          Contact Me
        </h2>
        <p className="mb-6 text-foreground dark:text-gray-300 z-10 relative">
          تواصل معي لأي تعاون أو استفسار!
        </p>
        <form
          className="space-y-5 z-10 relative"
          action="mailto:your.email@example.com"
          method="POST"
          encType="text/plain"
        >
          <div>
            <label
              className="block text-sm font-semibold mb-1 text-foreground dark:text-gray-300"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-border dark:border-gray-600 rounded-lg px-3 py-2 bg-background dark:bg-gray-800 text-foreground dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-1 text-foreground dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-border dark:border-gray-600 rounded-lg px-3 py-2 bg-background dark:bg-gray-800 text-foreground dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-1 text-foreground dark:text-gray-300"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full border border-border dark:border-gray-600 rounded-lg px-3 py-2 bg-background dark:bg-gray-800 text-foreground dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 transition resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary dark:bg-blue-600 text-button-text dark:text-gray-100 px-6 py-2 rounded-lg font-bold shadow hover:bg-primary-hover dark:hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    
  );
}
