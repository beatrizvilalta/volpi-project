import "./Post.css";
import ActionButtons from "../actionButtons/ActionButtons";
import { useState } from "react";
import {
  PostModel,
  RequestType,
  subjectMap,
  schoolLevelMap,
  gradeMap,
  findKeyByValue,
} from "../../types";
import localDataProvider from "../../localDataProvider";
import { request } from "../../Api";
import { useNavigate } from "react-router-dom";

interface Props {
  model: PostModel;
  noUserAction: () => void;
  onModelChange: (model: PostModel) => void;
}

function Post({ model, noUserAction, onModelChange }: Props) {
  const user = localDataProvider.getUser();
  const navigate = useNavigate();
  const [localModel, setLocalModel] = useState<PostModel>(model);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = localModel.fileUrl;
    link.click();
  };

  const requestSupport = async () => {
    const data = {
      userId: user?.userId,
      postId: model.id,
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
      postId: model.id,
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
      postId: model.id,
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
      postId: model.id,
      interactionType: "SAVE",
    };

    try {
      await request<void>("/interaction", RequestType.delete, data);
      toggleSave();
    } catch (error) {
      console.log("falha ao realizar save");
    }
  };

  function handleItemTap() {
    navigate(`/postDetail/${model.id}`);
  }

  function handleSupportClick() {
    if (user) {
      if (localModel.isSupported) {
        removeSupport();
      } else {
        requestSupport();
      }
    } else {
      noUserAction();
    }
  }

  function toggleSupport() {
    if (user) {
      let updatedModel;
      if (localModel.isSupported) {
        updatedModel = {
          ...localModel,
          isSupported: false,
          supportCount: localModel.supportCount - 1,
        };
      } else {
        updatedModel = {
          ...localModel,
          isSupported: true,
          supportCount: localModel.supportCount + 1,
        };
      }

      setLocalModel(updatedModel);
      onModelChange(updatedModel);
    }
  }

  function handleCommentClick() {}

  function handleDownloadClick() {
    if (user) {
      handleDownload();
    } else {
      noUserAction();
    }
  }

  function handleSaveClick() {
    if (user) {
      if (localModel.isSaved) {
        removeSave();
      } else {
        requestSave();
      }
    } else {
      noUserAction();
    }
  }

  function toggleSave() {
    if (user) {
      let updatedModel;
      if (localModel.isSaved) {
        updatedModel = { ...model, isSaved: false };
      } else {
        updatedModel = { ...model, isSaved: true };
      }

      setLocalModel(updatedModel);
      onModelChange(updatedModel);
    }
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

  return (
    <div className="card custom-card">
      <div className="card-image" onClick={handleItemTap}>
        <figure className="image">
          <img
            className="iconImage"
            src={localModel.previewImageUrl}
            alt="Imagem do card"
          />
        </figure>
      </div>

      <div className="card-content" onClick={handleItemTap}>
        <div className="content">
          <p className="is-size-4 has-text-weight-medium">{model.title}</p>
          <p className="is-black truncated-text">{model.description}</p>
          <div>
            <span className="tag purple-tag is-medium m-2">
              {findKeyByValue(subjectMap, model.subject)}
            </span>
            <span
              className={`tag is-medium m-2 ${getTagClass(model.schoolLevel)}`}
            >
              {findKeyByValue(schoolLevelMap, model.schoolLevel)}
            </span>
            <span className="tag blue-tag is-medium m-2">
              {findKeyByValue(gradeMap, model.grade)}
            </span>
          </div>
        </div>
      </div>

      <div className="card-footer py-4 mx-2">
        <ActionButtons
          model={{
            isLiked: localModel.isSupported,
            isSaved: localModel.isSaved,
            likes: localModel.supportCount,
            comments: 0,
          }}
          onClickLike={handleSupportClick}
          onClickComment={handleCommentClick}
          onClickDownload={handleDownloadClick}
          onClickSave={handleSaveClick}
        />
      </div>
    </div>
  );
}

export default Post;
