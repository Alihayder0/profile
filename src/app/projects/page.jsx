
import ProjectCard from "C:/Users/pc/Desktop/program/pro2/src/components/ProjectCard";

const projects = [
  {
    title: "Personal Portfolio",
    description: "موقع شخصي لعرض أعمالي ومهاراتي.",
    link: "https://your-portfolio-link.com",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"]
  },
  
];

export default function Projects() {
  return (
   
      <section className="relative bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-blue-200/0 rounded-full blur-3xl z-0 animate-pulse" />
        <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600 tracking-tight z-10 relative">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8 z-10 relative">
          {projects.map((proj) => (
            <ProjectCard key={proj.title} {...proj} />
          ))}
        </div>
      </section>
    
  );
}