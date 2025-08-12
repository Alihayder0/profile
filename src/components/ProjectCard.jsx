import React from "react";

const ProjectCard = ({ title, description, link, tags }) => (
  <div className="card-bg rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow border border-border">
    <h3 className="text-xl font-bold mb-2 text-primary">{title}</h3>
    <p className="text-foreground mb-3">{description}</p>
    {tags && (
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-secondary text-primary text-xs px-2 py-1 rounded-full font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
    {link && (
      <a
        href={link}
        target="_blank"
        className="inline-block mt-2 text-link hover:text-link-hover hover:underline text-sm font-medium"
        rel="noopener noreferrer"
      >
        View Project →
      </a>
    )}
  </div>
);

export default ProjectCard;
