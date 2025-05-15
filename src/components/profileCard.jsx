import React from "react";
import Link from "next/link";

const ProfileCard = ({ name, position, description, links }) => {
  return (
    <>
      <p className="font-medium">{name}</p>
      <p className="opacity-70 font-medium">{position}</p>
      <p className="text-foreground/70 mt-7">
        {description.split(" ").map((word, index) => {
          const linkData = links.find((link) => link.text === word);
          if (linkData) {
            return (
              <Link
                key={index}
                href={linkData.url}
                target="_blank"
                className="hover:text-lime-600/75"
              >
                {word}
              </Link>
            );
          }
          return `${word} `;
        })}
      </p>
    </>
  );
};

export default ProfileCard;
