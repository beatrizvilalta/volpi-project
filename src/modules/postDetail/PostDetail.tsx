import "./PostDetail.css";
import Navbar from "../../components/navbar/Navbar";
import editIcon from "../../assets/IconEdit.svg";
import deleteIcon from "../../assets/IconDelete.svg";
import ActionButtons from "../../components/actionButtons/ActionButtons";
import LoadingView from "../../components/loading/Loading";
import Modal from "../../components/modal/Modal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ModalType } from "../../types";

function PostDetail() {
  const { id } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const [shouldPresentModal, setShouldPresentModal] = useState(false);
  const [modalType, setModalType] = useState(ModalType.delete);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [model, setModel] = useState({
    title: "Material de colorir peixe boi",
    createdAt: "10/11/2024",
    author: "João Guimarões Rosa",
    description:
      "Ensinando os animais da APA costa dos corais. Ensinando os animais da APA costa dos corais.",
    isLiked: false,
    isSaved: false,
    likes: 0,
    comments: 0,
  });

  useEffect(() => {
    console.log(`FAZ O FETCH DO ID: ${id}`);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  function getSubtitle() {
    return `publicado por ${model.author} em ${model.createdAt}`;
  }

  function handleLikeClick() {
    if (model.isLiked) {
      setModel({ ...model, isLiked: false, likes: model.likes - 1 });
    } else {
      setModel({ ...model, isLiked: true, likes: model.likes + 1 });
    }
  }

  function handleActionClick(type: ModalType) {
    if (type == ModalType.delete) {
      navigate("/");
    } else if (type == ModalType.login) {
      navigate("/login");
    }
  }

  function handleCloseModal() {
    setShouldPresentModal(false);
  }

  function handleEditClick() {
    setModalType(ModalType.login);
    setShouldPresentModal(true);
  }

  function handleDeleteClick() {
    setModalType(ModalType.delete);
    setShouldPresentModal(true);
  }

  function handleCommentClick() {}

  function handleDownloadClick() {}

  function handleSaveClick() {
    if (model.isSaved) {
      setModel({ ...model, isSaved: false });
    } else {
      setModel({ ...model, isSaved: true });
    }
  }

  function getTagClass(type: string) {
    let tagClass: string;
    switch (type) {
      case "educacao-infantil":
        tagClass = "ei-tag";
        break;
      case "ensino-fund-1":
        tagClass = "ef-tag";
        break;
      case "ensino-fund-2":
        tagClass = "ef-tag";
        break;
      case "ensino-medio":
        tagClass = "em-tag";
        break;
      default:
        tagClass = "purple-tag";
    }
    return tagClass;
  }

  if (loading) {
    return (
      <>
        <LoadingView />
      </>
    );
  }

  return (
    <>
      <div>
        <Modal
          type={modalType}
          isActive={shouldPresentModal}
          onClickAction={handleActionClick}
          onClickClose={handleCloseModal}
        />
        <Navbar isUserLogged={false} />
        <div className="hero is-fullheight is-fullwidth">
          <div className="custom-card">
            <div className="m-4">
              <div className="is-flex is-align-items-center">
                <p className="ml-4 is-size-2 is-black has-text-weight-medium">
                  {model.title}
                </p>
                {canEdit && (
                  <div className="is-flex ml-auto">
                    <a className="mr-3" onClick={handleEditClick}>
                      <img src={editIcon} />
                    </a>
                    <a onClick={handleDeleteClick}>
                      <img src={deleteIcon} />
                    </a>
                  </div>
                )}
              </div>
              <p className="ml-4 is-size-7 is-black">{getSubtitle()}</p>
              <p className="ml-4 is-size-4 mt-4 is-black has-text-weight-medium">
                Descrição:
              </p>
              <p className="mx-4 is-light-back">{model.description}</p>
              <div className="ml-4 my-2">
                <span className="tag purple-tag is-medium mr-2">História</span>
                <span
                  className={`tag is-medium m-2 ${getTagClass(
                    "educacao-infantil"
                  )}`}
                >
                  Ensino Médio
                </span>
                <span className="tag blue-tag is-medium m-2">EF01CN01</span>
              </div>
              <div>
                <ActionButtons
                  model={{
                    isLiked: model.isLiked,
                    isSaved: model.isSaved,
                    likes: model.likes,
                    comments: model.comments,
                  }}
                  onClickLike={handleLikeClick}
                  onClickComment={handleCommentClick}
                  onClickDownload={handleDownloadClick}
                  onClickSave={handleSaveClick}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <p>PDF FILE</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
