import React from "react";

export default function ExperiencesLayout({ children }) {
  return (
    <div className="container-x py-16 sm:py-20">
      <div className="mx-auto max-w-[800px]">{children}</div>
    </div>
  );
}
