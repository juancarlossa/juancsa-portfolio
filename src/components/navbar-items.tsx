
import { useTranslations } from "@/locale/translations";
import StaggeredMenu from "./StaggeredMenu";
import { LanguageButtons } from "./navbar-language-buttons";

export function NavItems() {
  const translate = useTranslations();
  const navItems = [
    { name: translate("navItems", 0), label: "home", link: "#home" },
    { name: translate("navItems", 1), label: "projects", link: "#projects" },
    { name: translate("navItems", 2), label: "resume", link: "/CV.pdf" },
    //{ name: "About", label: "about", link: "/about" },
  ];

  return (
    <div className="overflow-x-hidden w-full" style={{ height: '100vh', background: 'transparent' }}>

      <StaggeredMenu
        position="right"
        items={navItems.map((item) => ({
          label: item.label,
          link: item.link,
          ariaLabel: item.label,
        }))}
        socialItems={[]}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        accentColor="#5227FF"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
    </div>
  )
}