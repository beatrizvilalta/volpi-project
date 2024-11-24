import "./Modal.css";
import { ModalType } from "../../types";

interface Props {
  isActive: boolean;
  type: ModalType;
  onClickAction: (type: ModalType) => void;
  onClickClose: () => void;
}

function Modal({ type, isActive, onClickAction, onClickClose }: Props) {
  return (
    <>
      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={onClickClose}></div>
        <div className="modal-content">
          <div className="card has-background-white login-card mx-4">
            <div className="py-4">
              <p className="is-black modal-text">
                {type === ModalType.login &&
                  "Para interagir com a nossa comunidade entre na sua conta ou crie uma nova"}

                {type === ModalType.delete &&
                  "Tem certeza que deseja deletar o conteúdo"}
              </p>
              <div className="columns mt-4">
                <div className="column is-flex is-justify-content-flex-end text-uppercase">
                  <a
                    className="has-text-weight-bold is-black modal-button"
                    onClick={onClickClose}
                  >
                    Cancelar
                  </a>
                  {type === ModalType.login && (
                    <a
                      className="has-text-weight-bold ml-4 is-purple modal-button"
                      onClick={() => {
                        onClickAction(type);
                      }}
                    >
                      Iniciar sessão
                    </a>
                  )}

                  {type === ModalType.delete && (
                    <a
                      className="has-text-weight-bold ml-4 is-red modal-button"
                      onClick={() => {
                        onClickAction(type);
                      }}
                    >
                      Deletar
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={onClickClose}
        ></button>
      </div>
    </>
  );
}

export default Modal;
