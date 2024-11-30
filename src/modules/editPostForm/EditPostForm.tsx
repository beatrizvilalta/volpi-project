import "./EditPostForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import localDataProvider from "../../localDataProvider";
import { useNavigate } from "react-router-dom";
import LoadingView from "../../components/loading/Loading";
import { request } from "../../Api";
import {
  RequestType,
  subjectMap,
  schoolLevelMap,
  gradeMap,
  PostModel,
  findKeyByValue,
} from "../../types";
import { useParams } from "react-router-dom";

function EditPostForm() {
  const { id } = useParams();
  const user = localDataProvider.getUser();
  const navigate = useNavigate();
  const [screenLoading, setScreenLoading] = useState(true);
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

  useEffect(() => {
    fetchPostDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const subjectKeys = Array.from(subjectMap.keys());
  const schoolLevelKeys = Array.from(schoolLevelMap.keys());
  const gradeKeys = Array.from(gradeMap.keys());

  const handleNivelChange = (nivel: string) => {
    setSchoolLevel(nivel === schoolLevel ? "" : nivel);
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
      await updateData(postResponse);
      setScreenLoading(false);
    } catch (error) {
      console.log("Erro ao buscar detalhe do post");
    }
  };

  function updateData(postModel: PostModel) {
    setTitle(postModel.title);
    setDescription(postModel.description);
    setSubject(findKeyByValue(subjectMap, postModel.subject));
    setSchoolLevel(findKeyByValue(schoolLevelMap, postModel.schoolLevel));
    setGrade(findKeyByValue(gradeMap, postModel.grade));
    setScreenLoading(false);
  }

  const requestEditPost = async () => {
    if (user) {
      const formData = new FormData();
      formData.append("userId", user.userId.toString());
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subject", subjectMap.get(subject) ?? "");
      formData.append("schoolLevel", schoolLevelMap.get(schoolLevel) ?? "");
      formData.append("grade", gradeMap.get(grade) ?? "");
      if (imagemPreview) {
        formData.append("previewImage", imagemPreview);
      }

      if (material) {
        formData.append("file", material);
      }

      try {
        const postResponse = await request<PostModel>(
          `/post/${id}`,
          RequestType.put,
          formData
        );
        console.log(postResponse);
        setLoading(false);
        navigate(`/postDetail/${id}`);
        console.log("TOMA");
      } catch (error) {
        setErrorMessage("Falha ao editar post");
        console.log("FALHOU");
        setHasError(true);
        setLoading(false);
      }
    }
  };

  function isEmpty(text: string) {
    return text.length == 0;
  }

  function getImageTitle() {
    if (imagemPreview) {
      return imagemPreview.name;
    } else {
      return "Editar arquivo existente";
    }
  }

  function getMaterialTitle() {
    if (material) {
      return material.name;
    } else {
      return "Editar arquivo existente";
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEmpty(title) || isEmpty(schoolLevel) || isEmpty(subject)) {
      setErrorMessage("Todos os campos são obrigatórios");
      setHasError(true);
      setLoading(false);
    } else {
      requestEditPost();
    }
  };

  if (screenLoading) {
    return (
      <>
        <LoadingView />
      </>
    );
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
                Editar conteúdo
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPostForm;
