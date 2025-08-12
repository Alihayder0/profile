const Footer = () => (

  <footer className="card-bg border-t border-border dark:bg-gray-900 dark:border-gray-700 h-[10vh]">
    <div className="container mx-auto py-6 px-4 text-center text-foreground text-sm dark:text-gray-300">
      © {new Date().getFullYear()} Ali Hayder. All rights reserved.
    </div>
  </footer>
);

export default Footer;
