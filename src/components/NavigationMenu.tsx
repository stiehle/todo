import { IconContext } from "react-icons";
import "./Navigation.scss";
import { useNavigate } from "react-router-dom";
import { CgEnter, CgGlobeAlt } from "react-icons/cg";

function NavigationMenu() {
  const navigate = useNavigate();

  const links = [
    {
      id: 1,
      name: "DevKarriere",
      web: "www.devkarriere.de",
      icon: "web",
    },
    {
      id: 2,
      name: "React",
      web: "www.react.dev",
      icon: "web",
    },
    {
      id: 3,
      name: "Supabase",
      web: "www.supabase.com",
      icon: "web",
    },
    {
      id: 4,
      name: "Typescript",
      web: "www.typescriptlang.org",
      icon: "web",
    },
    {
      id: 5,
      name: "Anmeldung",
      route: "/todo/login/",
      icon: "route",
    },
    {
      id: 6,
      name: "Calculator",
      web: "stiehle.github.io/calculator/",
      icon: "web",
    },
  ];

  function handleMenuClick(id: number) {
    const link = links.find((num) => num.id === id);

    if (link) {
      if (link.route) {
        navigate(link.route);
      } else {
        open("http://" + link.web);
      }
    }
  }

  return (
    <div className="navigation">
      <div className="navigation__checkin" onClick={() => handleMenuClick(5)}>
        Anmeldung
      </div>
      <div className="navigation__info">
        Links
        <div className="navigation__info--menu">
          <div className="navigation__header">Seiten:</div>
          <IconContext.Provider value={{ color: "white", size: "1.6rem" }}>
            {links.map((val) => {
              return (
                <div key={val.name} className="navigation__item" onClick={() => handleMenuClick(val.id)}>
                  {val.icon === "web" ? <CgGlobeAlt /> : <CgEnter />}
                  {val.name}
                </div>
              );
            })}
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default NavigationMenu;
