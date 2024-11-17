import "./Post.css";
import ActionButtons from "../ActionButtons/ActionButtons";
import { useState } from "react";

function Post() {
  const [model, setModel] = useState({
    title: "Material de colorir peixe boi",
    description:
      "Ensinando os animais da APA costa dos corais. Ensinando os animais da APA costa dos corais.",
    isLiked: false,
    isSaved: false,
    likes: 0,
    comments: 0,
  });

  function handleLikeClick() {
    if (model.isLiked) {
      setModel({ ...model, isLiked: false, likes: model.likes - 1 });
    } else {
      setModel({ ...model, isLiked: true, likes: model.likes + 1 });
    }
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

  return (
    <div className="card custom-card">
      <div className="card-image">
        <figure className="image">
          <img
            src="https://via.placeholder.com/426x192"
            alt="Imagem do card"
            width="426"
            height="192"
          />
        </figure>
      </div>

      <div className="card-content">
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
  );
}

export default Post;
