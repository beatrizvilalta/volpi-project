import "./Main.css";
import Navbar from "../../components/navbar/Navbar";
import Menu from "../../components/menu/Menu";
import Feed from "../../components/feed/Feed";
import line from "../../assets/Line.svg";
import iconMenu from "../../assets/IconMenu.svg";
import iconClose from "../../assets/IconClose.svg";
import Modal from "../../components/modal/Modal";
import { MenuStatus } from "../../types";
import { useState, useEffect } from "react";

function Main() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPresentModal, setPresentModal] = useState(false);
  const [menuState, setMenuState] = useState<MenuStatus>(MenuStatus.main);

  function navigateToLogin() {
    console.log("FOI PRO LOGIN");
  }

  function handleCloseModal() {
    setPresentModal(false);
  }

  function handleMenuChange(status: MenuStatus) {
    setMenuState(status);
  }

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>
        <Modal
          type="login"
          isActive={shouldPresentModal}
          onClickAction={navigateToLogin}
          onClickClose={handleCloseModal}
        />
        <Navbar isUserLogged={false} />
        <div className="container is-fluid">
          <section className="hero is-fullheight-with-navbar">
            <div className="columns my-5">
              <div className="is-hidden-desktop">
                <a className="button is-purple" onClick={toggleMenu}>
                  {isVisible ? (
                    <img src={iconClose} alt="" />
                  ) : (
                    <img src={iconMenu} alt="" />
                  )}
                </a>
              </div>

              <div
                className={`column is-side-menu ${
                  isVisible ? "" : "is-hidden-mobile"
                }`}
              >
                <Menu selected={menuState} onClickMenu={handleMenuChange} />
                <img className="mb-6" src={line} />
                <p className="is-size-2">FILTROS</p>
              </div>

              <div className="column px-0">
                <Feed type={menuState} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Main;
