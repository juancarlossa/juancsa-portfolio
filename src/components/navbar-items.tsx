
import { useTranslations } from "@/locale/translations";

export function NavItems() {
  const translate = useTranslations();
  const navItems = [
    { name: translate("navItems", 0), label: "home", link: "#home" },
    { name: translate("navItems", 1), label: "projects", link: "#projects" },
    { name: translate("navItems", 2), label: "resume", link: "/CV.pdf" },
    //{ name: "About", label: "about", link: "/about" },
  ];

  return (
    <>
      {
        navItems.map((item, i) => (
          <a
            key={i}
            className="relative block px-4 transition hover:text-violet-800 lg:pb-0 pb-2"
            aria-label={item.label}
            href={item.link}
          >
            {item.name}
          </a>
        ))
      }
    </>
  )
}