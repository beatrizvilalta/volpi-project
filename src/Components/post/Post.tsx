import "./Post.css";
import ActionButtons from "../actionButtons/ActionButtons";
import { useState } from "react";
import { PostModel } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  model: PostModel;
  onModelChange: (model: PostModel) => void;
}

function Post({ model, onModelChange }: Props) {
  const navigate = useNavigate();
  const [localModel, setLocalModel] = useState(model);

  function handleItemTap() {
    navigate(`/postDetail/${model.id}`);
  }

  function handleLikeClick() {
    let updatedModel;
    if (localModel.isLiked) {
      updatedModel = {
        ...localModel,
        isLiked: false,
        likes: localModel.likes - 1,
      };
    } else {
      updatedModel = {
        ...localModel,
        isLiked: true,
        likes: localModel.likes + 1,
      };
    }

    setLocalModel(updatedModel);
    onModelChange(updatedModel);
  }

  function handleCommentClick() {}

  function handleDownloadClick() {}

  function handleSaveClick() {
    let updatedModel;
    if (localModel.isSaved) {
      updatedModel = { ...model, isSaved: false };
    } else {
      updatedModel = { ...model, isSaved: true };
    }

    setLocalModel(updatedModel);
    onModelChange(updatedModel);
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

  return (
    <div className="card custom-card">
      <div className="card-image" onClick={handleItemTap}>
        <figure className="image">
          <img
            src="https://via.placeholder.com/426x192"
            alt="Imagem do card"
            width="426"
            height="192"
          />
        </figure>
      </div>

      <div className="card-content" onClick={handleItemTap}>
        <div className="content">
          <p className="is-size-4 has-text-weight-medium">{model.title}</p>
          <p className="is-black truncated-text">{model.description}</p>
          <div>
            <span className="tag purple-tag is-medium m-2">História</span>
            <span
              className={`tag is-medium m-2 ${getTagClass(
                "educacao-infantil"
              )}`}
            >
              Ensino Médio
            </span>
            <span className="tag blue-tag is-medium m-2">EF01CN01</span>
          </div>
        </div>
      </div>

      <div className="card-footer py-4 mx-2">
        <ActionButtons
          model={{
            isLiked: localModel.isLiked,
            isSaved: localModel.isSaved,
            likes: localModel.likes,
            comments: localModel.comments,
          }}
          onClickLike={handleLikeClick}
          onClickComment={handleCommentClick}
          onClickDownload={handleDownloadClick}
          onClickSave={handleSaveClick}
        />
      </div>
    </div>
  );
}

export default Post;
