import "./Main.css";
import Navbar from "../../components/navbar/Navbar";
import Menu from "../../components/menu/Menu";
import Feed from "../../components/feed/Feed";
import line from "../../assets/Line.svg";
import iconMenu from "../../assets/IconMenu.svg";
import iconClose from "../../assets/IconClose.svg";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { MenuStatus, ModalType } from "../../types";
import { useState, useEffect } from "react";
import localDataProvider from "../../localDataProvider";

function Main() {
  const user = localDataProvider.getUser();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldPresentModal, setPresentModal] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [menuState, setMenuState] = useState<MenuStatus>(MenuStatus.main);
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }

  function handleCloseModal() {
    setPresentModal(false);
  }

  function handleMenuClick(status: MenuStatus) {
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
    setHasUser(user != null);
  }, [user]);

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
          type={ModalType.login}
          isActive={shouldPresentModal}
          onClickAction={navigateToLogin}
          onClickClose={handleCloseModal}
        />
        <Navbar />
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

              {hasUser && (
                <div
                  className={`column is-side-menu ${
                    isVisible ? "" : "is-hidden-mobile"
                  }`}
                >
                  <Menu selected={menuState} onClickMenu={handleMenuClick} />
                  <img className="mb-6" src={line} />
                </div>
              )}

              <div className="column px-0">
                <Feed
                  type={menuState}
                  noUserAction={() => {
                    setPresentModal(true);
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Main;
