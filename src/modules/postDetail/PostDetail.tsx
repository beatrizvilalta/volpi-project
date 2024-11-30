import "./PostDetail.css";
import Navbar from "../../components/navbar/Navbar";
import editIcon from "../../assets/IconEdit.svg";
import deleteIcon from "../../assets/IconDelete.svg";
import ActionButtons from "../../components/actionButtons/ActionButtons";
import LoadingView from "../../components/loading/Loading";
import Modal from "../../components/modal/Modal";
import {
  ModalType,
  RequestType,
  PostModel,
  subjectMap,
  schoolLevelMap,
  gradeMap,
  findKeyByValue,
} from "../../types";
import localDataProvider from "../../localDataProvider";
import { request } from "../../Api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PostDetail() {
  const user = localDataProvider.getUser();
  const { id } = useParams();
  const [canEdit, setCanEdit] = useState(true);
  const [shouldPresentModal, setShouldPresentModal] = useState(false);
  const [modalType, setModalType] = useState(ModalType.delete);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [model, setModel] = useState<PostModel | null>(null);

  const deletePost = async () => {
    try {
      await request<void>(`/post/${id}`, RequestType.delete);
      navigate("/");
    } catch (error) {
      console.log("Erro ao deletar post");
    }
  };

  const requestSupport = async () => {
    const data = {
      userId: user?.userId,
      postId: model?.id,
      interactionType: "SUPPORT",
    };

    try {
      await request<void>("/interaction", RequestType.post, data);
      toggleSupport();
    } catch (error) {
      console.log("falha ao realizar support");
    }
  };

  const removeSupport = async () => {
    const data = {
      userId: user?.userId,
      postId: model?.id,
      interactionType: "SUPPORT",
    };

    try {
      await request<void>("/interaction", RequestType.delete, data);
      toggleSupport();
    } catch (error) {
      console.log("falha ao realizar support");
    }
  };

  const requestSave = async () => {
    const data = {
      userId: user?.userId,
      postId: model?.id,
      interactionType: "SAVE",
    };

    try {
      await request<void>("/interaction", RequestType.post, data);
      toggleSave();
    } catch (error) {
      console.log("falha ao realizar save");
    }
  };

  const removeSave = async () => {
    const data = {
      userId: user?.userId,
      postId: model?.id,
      interactionType: "SAVE",
    };

    try {
      await request<void>("/interaction", RequestType.delete, data);
      toggleSave();
    } catch (error) {
      console.log("falha ao realizar save");
    }
  };

  const handleDownload = () => {
    if (model) {
      const link = document.createElement("a");
      link.href = model.fileUrl;
      link.click();
    }
  };

  const fetchPostDetail = async () => {
    let postDetailURL = "";
    if (user) {
      postDetailURL = `/post/${id}?userId=${user.userId}`;
    } else {
      postDetailURL = `/post/${id}`;
    }
    try {
      const postResponse = await request<PostModel>(
        postDetailURL,
        RequestType.get
      );
      console.log(postResponse);
      setCanEdit(postResponse.userId == user?.userId);
      setModel(postResponse);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar detalhe do post");
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPostDetail();
    window.scrollTo(0, 0);
  }, [id]);

  function handleSupportClick() {
    if (user && model) {
      if (model.isSupported) {
        removeSupport();
      } else {
        requestSupport();
      }
    } else {
      showLoginModal();
    }
  }

  function toggleSupport() {
    if (user && model) {
      if (model.isSupported) {
        setModel({
          ...model,
          isSupported: false,
          supportCount: model.supportCount - 1,
        });
      } else {
        setModel({
          ...model,
          isSupported: true,
          supportCount: model.supportCount + 1,
        });
      }
    }
  }

  function handleActionClick(type: ModalType) {
    if (type == ModalType.delete) {
      deletePost();
    } else if (type == ModalType.login) {
      navigate("/login");
    }
  }

  function handleCloseModal() {
    setShouldPresentModal(false);
  }

  function handleEditClick() {
    navigate(`/editPostForm/${id}`);
  }

  function handleDeleteClick() {
    setModalType(ModalType.delete);
    setShouldPresentModal(true);
  }

  function handleCommentClick() {}

  function handleDownloadClick() {
    if (user) {
      handleDownload();
    } else {
      showLoginModal();
    }
  }

  function handleSaveClick() {
    if (user && model) {
      if (model.isSaved) {
        removeSave();
      } else {
        requestSave();
      }
    } else {
      showLoginModal();
    }
  }

  function toggleSave() {
    if (user && model) {
      if (model.isSaved) {
        setModel({ ...model, isSaved: false });
      } else {
        setModel({ ...model, isSaved: true });
      }
    }
  }

  function getFormatedDate() {
    if (model?.dateCreated) {
      const date = new Date(model.dateCreated);
      const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
      return formattedDate;
    } else {
      return "";
    }
  }

  function showLoginModal() {
    setModalType(ModalType.login);
    setShouldPresentModal(true);
  }

  function getTagClass(type: string) {
    let tagClass: string;
    switch (type) {
      case "EDUCACAO_INFANTIL":
        tagClass = "ei-tag";
        break;
      case "FUNDAMENTAL_ANOS_INICIAIS":
        tagClass = "ef-tag";
        break;
      case "FUNDAMENTAL_ANOS_FINAIS":
        tagClass = "ef-tag";
        break;
      case "ENSINO_MEDIO":
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
        <Navbar />
        <div className="hero is-fullheight is-fullwidth">
          <div className="custom-card">
            <div className="m-4">
              <div className="is-flex is-align-items-center">
                <p className="ml-4 is-size-2 is-black has-text-weight-medium">
                  {model?.title}
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
              <p className="ml-4 is-size-7 is-black">
                Publicado por{" "}
                <strong className="is-black">{model?.username}</strong> em{" "}
                {getFormatedDate()}
              </p>
              <p className="ml-4 is-size-4 mt-4 is-black has-text-weight-medium">
                Descrição:
              </p>
              <p className="mx-4 is-light-back">{model?.description}</p>
              <div className="ml-4 my-2">
                <span className="tag purple-tag is-medium mr-2">
                  {findKeyByValue(subjectMap, model?.subject ?? "")}
                </span>
                <span
                  className={`tag is-medium m-2 ${getTagClass(
                    model?.schoolLevel ?? ""
                  )}`}
                >
                  {findKeyByValue(schoolLevelMap, model?.schoolLevel ?? "")}
                </span>
                <span className="tag blue-tag is-medium m-2">
                  {findKeyByValue(gradeMap, model?.grade ?? "")}
                </span>
              </div>
              <div>
                <ActionButtons
                  model={{
                    isLiked: model?.isSupported ?? false,
                    isSaved: model?.isSaved ?? false,
                    likes: model?.supportCount ?? 0,
                    comments: 0,
                  }}
                  onClickLike={handleSupportClick}
                  onClickComment={handleCommentClick}
                  onClickDownload={handleDownloadClick}
                  onClickSave={handleSaveClick}
                />
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <figure className="image">
              <img src={model?.previewImageUrl} alt="Imagem do card" />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
