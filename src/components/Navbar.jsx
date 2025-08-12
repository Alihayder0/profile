import Links from "./Links";

const Navbar = () => {
  return (
    <nav className="card-bg/80 backdrop-blur shadow-md sticky top-0 z-50 transition-colors border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <span className="font-extrabold text-2xl tracking-tight text-primary drop-shadow">
          Ali Hayder
        </span>
        <Links />
      </div>
    </nav>
  );
};

export default Navbar;