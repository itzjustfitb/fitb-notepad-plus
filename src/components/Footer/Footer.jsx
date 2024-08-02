import React from "react";

function Footer() {
  const socialIcons = [
    {
      value: "https://www.instagram.com/faakhrii03/",
      icon: "ri-instagram-line",
    },
    {
      value: "https://www.facebook.com/profile.php?id=100088924454057",
      icon: "ri-facebook-fill",
    },
    {
      value: "https://www.linkedin.com/in/fakhrigajar/",
      icon: "ri-linkedin-fill",
    },
    {
      value: "https://github.com/itzjustfitb",
      icon: "ri-github-fill",
    },
  ];

  return (
    <footer className="py-50 container flex flex-col gap-7 dark:border-dark-1 border-gray border-t border-solid">
      <div className="flex justify-center gap-2">
        {socialIcons.map((socialIcon, index) => (
          <a
            className="flex justify-center items-center p-2 bg-black w-12 h-12 rounded-full text-white text-2xl duration-500 hover:scale-110 hover:opacity-70 hover:rotate-360 "
            key={index}
            href={socialIcon.value}
          >
            <i className={socialIcon.icon}></i>
          </a>
        ))}
      </div>
      <div className="flex flex-col text-center">
        <h1 className="dark:text-white">Designed & Built by</h1>
        <h2 className="dark:text-white text-2xl font-bold">Fakhri Gajar</h2>
      </div>
    </footer>
  );
}

export default Footer;
