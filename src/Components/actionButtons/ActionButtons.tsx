import "../ActionButtons/ActionButtons.css";
import IconLiked from "../../assets/IconLiked.svg";
import IconLike from "../../assets/IconLike.svg";
import IconComment from "../../assets/IconComment.svg";
import IconDownload from "../../assets/IconDownload.svg";
import IconSave from "../../assets/IconSave.svg";
import IconSaved from "../../assets/IconSaved.svg";
import { ButtonsModel } from "../../types";
import { useState } from "react";

interface Props {
  model: ButtonsModel;
  onClickLike: () => void;
  onClickComment: () => void;
  onClickDownload: () => void;
  onClickSave: () => void;
}

function ActionButtons({
  model,
  onClickLike,
  onClickComment,
  onClickDownload,
  onClickSave,
}: Props) {
  const [canComment] = useState(false);

  return (
    <>
      <button
        className={`button responsive-button ${
          model.isLiked ? "is-liked" : "is-default"
        } `}
        onClick={onClickLike}
      >
        <span className="icon">
          <img src={model.isLiked ? IconLiked : IconLike} />
        </span>
        <span>{model.likes}</span>
      </button>
      {canComment && (
        <button
          className="button responsive-button is-default"
          onClick={onClickComment}
        >
          <span className="icon">
            <img src={IconComment} />
          </span>
          <span>{model.comments}</span>
        </button>
      )}
      <button
        className="button responsive-button is-default"
        onClick={onClickDownload}
      >
        <span className="icon">
          <img src={IconDownload} />
        </span>
        <span>Baixar</span>
      </button>
      <button
        className={`button responsive-button ${
          model.isSaved ? "is-saved" : "is-default"
        }`}
        onClick={onClickSave}
      >
        <span className="icon">
          <img src={model.isSaved ? IconSaved : IconSave} />
        </span>
        <span>
          <p>{model.isSaved ? "Salvo" : "Salvar"}</p>
        </span>
      </button>
    </>
  );
}

export default ActionButtons;
