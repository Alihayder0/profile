"use client";

import React from "react";
import { useLanguage } from "../app/LanguageProvider";

const ProjectCard = ({ title, description, link, tags }) => {
  const { lang } = useLanguage();

  const translations = {
    EN: {
      viewProject: "View Project →",
    },
    AR: {
      viewProject: "عرض المشروع ←",
    },
  };

  const t = translations[lang] || translations.EN;

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
      <p className="text-foreground/80 mb-4 flex-grow leading-relaxed">{description}</p>
      {tags && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-secondary text-primary text-xs px-3 py-1 font-semibold border border-border"
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
          className="inline-block text-link hover:text-link-hover hover:underline font-medium transition-colors duration-200"
          rel="noopener noreferrer"
        >
          {t.viewProject}
        </a>
      )}
    </div>
  );
};

export default ProjectCard;
