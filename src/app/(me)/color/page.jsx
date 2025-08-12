"use client";
import Loading from "C:/Users/pc/Desktop/program/pro2/src/app/loading.jsx"; // تأكد من المسار صحيح
import { useTheme } from "C:/Users/pc/Desktop/program/pro2/src/app/themeprovider.jsx"; // تأكد من المسار صحيح

export default function Page() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 transition-colors duration-300">
  <button
    onClick={toggleTheme}
    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
  >
    Toggle Theme (Current: {theme})
  </button>

  <h1 className="mt-8 text-3xl font-bold">مرحبا بك في الوضع {theme}</h1>
  <p>هنا يمكنك رؤية التبديل بين الوضع الفاتح والداكن بشكل بسيط جداً.</p>


  <Loading /> 
</div>

  );
}