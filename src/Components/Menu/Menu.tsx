import "./Menu.css";
import editIcon from "../../assets/IconEdit.svg";
import { MenuStatus } from "../../types";
import { useState } from "react";

interface Props {
  selected: MenuStatus;
  onClickMenu: (selectedOption: MenuStatus) => void;
}

function Menu({ selected, onClickMenu }: Props) {
  const [canEdit] = useState(false);
  const hasUser = true;
  function getSelectedClass(model: MenuStatus) {
    if (selected == model) {
      return "is-selected";
    } else {
      return "regular";
    }
  }

  return (
    <>
      <div className="container">
        <div className="columns mb-6 menu-width">
          {hasUser && (
            <div className="column">
              <p className="is-black is-size-6 has-text-weight-semibold">
                John Doe
              </p>
              <p className="is-gray is-size-7 has-text-weight-medium">
                john-doe@gmail.com
              </p>
            </div>
          )}
          {canEdit && (
            <div className="column is-one-fifth is-flex is-align-items-center is-justify-content-flex-end p-0">
              <a href="#editUser">
                <img src={editIcon} />
              </a>
            </div>
          )}
        </div>
        <div className="menu-width">
          <ul>
            <li className={`mb-4 py-2 ${getSelectedClass(MenuStatus.main)}`}>
              <a
                onClick={() => {
                  onClickMenu(MenuStatus.main);
                }}
                className={`pl-4 is-size-4 has-text-weight-semibold ${getSelectedClass(
                  MenuStatus.main
                )}`}
              >
                Início
              </a>
            </li>
            <li className={`mb-4 py-2 ${getSelectedClass(MenuStatus.saved)}`}>
              <a
                onClick={() => {
                  onClickMenu(MenuStatus.saved);
                }}
                className={`pl-4 is-size-4 has-text-weight-semibold ${getSelectedClass(
                  MenuStatus.saved
                )}`}
              >
                Salvos
              </a>
            </li>
            <li className={`mb-4 py-2 ${getSelectedClass(MenuStatus.upload)}`}>
              <a
                onClick={() => {
                  onClickMenu(MenuStatus.upload);
                }}
                className={`pl-4 is-size-4 has-text-weight-semibold ${getSelectedClass(
                  MenuStatus.upload
                )} `}
              >
                Meus envios
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;
