import "./AddPostForm.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import localDataProvider from "../../localDataProvider";
import { useNavigate } from "react-router-dom";
import { request } from "../../Api";
import {
  RequestType,
  subjectMap,
  schoolLevelMap,
  gradeMap,
  PostModel,
} from "../../types";

function AddPostForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [grade, setGrade] = useState("");
  const [imagemPreview, setImagemPreview] = useState<File | null>(null);
  const [material, setMaterial] = useState<File | null>(null);

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

  const subjectKeys = Array.from(subjectMap.keys());
  const schoolLevelKeys = Array.from(schoolLevelMap.keys());
  const gradeKeys = Array.from(gradeMap.keys());

  const handleNivelChange = (nivel: string) => {
    setSchoolLevel(nivel === schoolLevel ? "" : nivel);
  };

  const requestNewPost = async () => {
    const user = localDataProvider.getUser();
    if (user && imagemPreview && material) {
      const formData = new FormData();
      formData.append("userId", user.userId.toString());
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subject", subjectMap.get(subject) ?? "");
      formData.append("schoolLevel", schoolLevelMap.get(schoolLevel) ?? "");
      formData.append("grade", gradeMap.get(grade) ?? "");
      formData.append("previewImage", imagemPreview);
      formData.append("file", material);

      try {
        const postResponse = await request<PostModel>(
          "/post",
          RequestType.post,
          formData
        );
        console.log(postResponse);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setErrorMessage("Falha ao criar post");
        setHasError(true);
        setLoading(false);
      }
    }
  };

  function isEmpty(text: string) {
    return text.length == 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isEmpty(title) ||
      isEmpty(schoolLevel) ||
      isEmpty(subject) ||
      material == null ||
      imagemPreview == null
    ) {
      setErrorMessage("Todos os campos são obrigatórios");
      setHasError(true);
      setLoading(false);
    } else {
      requestNewPost();
    }
  };

  function getImageTitle() {
    if (imagemPreview) {
      return imagemPreview.name;
    } else {
      return "Selecione uma imagem";
    }
  }

  function getMaterialTitle() {
    if (material) {
      return material.name;
    } else {
      return "Selecione um arquivo";
    }
  }

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <h1 className="title is-black has-text-centered">Adicionar conteúdo</h1>

        <form onSubmit={handleSubmit}>
          {/* Campo de Título */}
          <div className="field">
            <label className="label is-black">Título</label>
            <div className="control">
              <input
                className="input login-input"
                disabled={loading}
                type="text"
                placeholder="Adicionar título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Campo de Descrição */}
          <div className="field">
            <label className="label is-black">Descrição</label>
            <div className="control">
              <textarea
                className="textarea login-input"
                disabled={loading}
                placeholder="Adicionar descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Componente Curricular (Dropdown) */}
          <div className="field">
            <label className="label is-black">Componente Curricular</label>
            <div className="control">
              <div className="select">
                <select
                  className="form-select"
                  disabled={loading}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">Selecione a disciplina</option>
                  {subjectKeys.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Nível de Ensino (Tags) */}
          <div className="field">
            <label className="label is-black">Nível de Ensino</label>
            <div className="control">
              <div className="tags">
                {schoolLevelKeys.map((nivel) => (
                  <span
                    key={nivel}
                    className={`tag is-medium ml-4 ${
                      nivel === schoolLevel
                        ? getTagClass(schoolLevelMap.get(nivel) ?? "")
                        : "is-light"
                    }`}
                    onClick={() => handleNivelChange(nivel)}
                  >
                    {nivel}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ano (Dropdown) */}
          <div className="field">
            <label className="label is-black">Ano</label>
            <div className="control">
              <div className="select">
                <select
                  disabled={loading}
                  className="form-select"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">Selecione o ano</option>
                  {gradeKeys.map((anoOption) => (
                    <option key={anoOption} value={anoOption}>
                      {anoOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Imagem de Preview */}
          <div className="field">
            <label className="label is-black">Imagem de Preview</label>
            <div className="file has-name is-boxed">
              <label className="file-label">
                <input
                  disabled={loading}
                  className="file-input purple-bg"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setImagemPreview(e.target.files?.[0] ?? null)
                  }
                />
                <span className="file-cta purple-bg">
                  <span className="file-icon has-text-centered">
                    <FontAwesomeIcon icon={faUpload} />
                  </span>
                  <span className="file-label has-text-centered">
                    Selecionar imagem
                  </span>
                </span>
                <span className="file-name is-black has-text-centered">
                  {getImageTitle()}
                </span>
              </label>
            </div>
          </div>

          {/* Arquivo de Material */}
          <div className="field">
            <label className="label is-black">Arquivo de Material</label>
            <div className="file has-name is-boxed">
              <label className="file-label">
                <input
                  disabled={loading}
                  className="file-input purple-bg"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setMaterial(e.target.files?.[0] ?? null)}
                />
                <span className="file-cta purple-bg">
                  <span className="file-icon has-text-centered">
                    <FontAwesomeIcon icon={faUpload} />
                  </span>
                  <span className="file-label has-text-centered">
                    Selecionar material
                  </span>
                </span>
                <span className="file-name is-black has-text-centered">
                  {getMaterialTitle()}
                </span>
              </label>
            </div>
          </div>

          {hasError && (
            <div className="message is-danger mt-4">
              <div className="message-body has-background-light">
                {errorMessage}
              </div>
            </div>
          )}

          {/* Botão de Publicar */}
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button
                type="submit"
                className={`button is-large purple-bg mt-4 ${
                  loading ? "is-loading" : ""
                }`}
              >
                Publicar conteúdo
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddPostForm;
