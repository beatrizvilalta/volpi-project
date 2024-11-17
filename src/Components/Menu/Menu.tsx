import "./Menu.css";
import editIcon from "../../assets/IconEdit.svg";

function Menu() {
  return (
    <>
      <div className="container">
        <div className="columns mb-6 menu-width">
          <div className="column">
            <p className="is-black is-size-6 has-text-weight-semibold">
              John Doe
            </p>
            <p className="is-gray is-size-7 has-text-weight-medium">
              john-doe@gmail.com
            </p>
          </div>
          <div className="column is-one-fifth is-flex is-align-items-center is-justify-content-flex-end p-0">
            <a href="#editUser">
              <img src={editIcon} />
            </a>
          </div>
        </div>
        <div className="menu-width">
          <ul>
            <li className="is-selected mb-4 py-2">
              <a
                href=""
                className="is-selected pl-4 is-size-4 has-text-weight-semibold"
              >
                Início
              </a>
            </li>
            <li className="regular mb-4 py-2">
              <a
                href=""
                className="regular pl-4 is-size-4 has-text-weight-semibold"
              >
                Salvos
              </a>
            </li>
            <li className="regular mb-4 py-2">
              <a
                href=""
                className="regular pl-4 is-size-4 has-text-weight-semibold"
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
