"use client";


import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <section className="relative flex flex-col md:flex-row items-center gap-12 bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
       
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-blue-200/0 rounded-full blur-3xl z-0 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-blue-100/0 rounded-full blur-2xl z-0 animate-pulse" />

        <motion.div
          className="flex-1 z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent animate-gradient-x">
            Hi, I'm Ali Hayder{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-200 mb-6 animate-fade-in"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            I'm a passionate software developer specializing in building impactful
            digital experiences with modern web technologies.
          </motion.p>
          <motion.div
            className="flex gap-4 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            <Link
              href="/projects"
              className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-500 transition transform hover:scale-110"
            >
              My Projects
            </Link>
            <Link
              className="bg-white dark:bg-gray-900 border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition transform hover:scale-110"
              href="/contact"
            >
              Contact Me
            </Link>
          </motion.div>
          <motion.div
            className="flex gap-4 mt-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
          >
            <a
              href="https://github.com/Alihayder0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200 transition"
            >
              <FaTwitter />
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative z-10 group"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.08, rotate: 3, boxShadow: "0 0 40px #60a5fa" }}
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-500 rounded-full blur-2xl opacity-60 group-hover:scale-110 group-hover:opacity-80 transition" />
          <img
            src="https://avatars.githubusercontent.com/u/your-github-id"
            alt="Ali Hayder"
            className="w-44 h-44 rounded-full shadow-2xl object-cover border-4 border-blue-100 dark:border-gray-800 relative z-10 group-hover:scale-105 transition"
          />
        </motion.div>
      </section>
      <style>
        {`
          .animate-wave {
            animation: wave 2s infinite;
            display: inline-block;
            transform-origin: 70% 70%;
          }
          @keyframes wave {
            0% { transform: rotate(0deg);}
            10% { transform: rotate(14deg);}
            20% { transform: rotate(-8deg);}
            30% { transform: rotate(14deg);}
            40% { transform: rotate(-4deg);}
            50% { transform: rotate(10deg);}
            60% { transform: rotate(0deg);}
            100% { transform: rotate(0deg);}
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease-in-out infinite;
          }
          @keyframes gradient-x {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          .animate-fade-in {
            animation: fadeIn 1.2s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}