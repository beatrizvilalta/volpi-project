import IconNotFounded from "../../assets/IconNotFounded.svg";
import IconEmptySaved from "../../assets/IconEmptySaved.svg";
import IconNoDocuments from "../../assets/IconNoDocuments.svg";
import { MenuStatus } from "../../types";

interface Props {
  type: MenuStatus;
}

function EmptyContent({ type }: Props) {
  return (
    <>
      <div className="hero is-flex is-justify-content-center is-align-items-center">
        {type === MenuStatus.main && (
          <img src={IconNotFounded} alt="notFound" />
        )}
        {type === MenuStatus.saved && (
          <img src={IconEmptySaved} alt="notFound" />
        )}
        {type === MenuStatus.upload && (
          <img src={IconNoDocuments} alt="notFound" />
        )}
        <p className="is-size-4 has-text-weight-bold">
          {type === MenuStatus.main &&
            "Não encontramos nenhum arquivo para sua busca"}
          {type === MenuStatus.saved &&
            "Você ainda não possui nenhum arquivo salvo"}
          {type === MenuStatus.upload &&
            "Você ainda não adicionou nenhum conteúdo"}
        </p>
        <p className="mt-4 is-size-6 has-text-weight-medium">
          {type === MenuStatus.main &&
            "Talvez realizar uma nova busca com outras palavras possa te ajudar"}
          {type === MenuStatus.saved &&
            "Seus arquivos marcados como salvos serão exibidos nesta tela"}
          {type === MenuStatus.upload &&
            "Os conteúdos seus conteúdos criados serão exibidos nesta tela"}
        </p>
      </div>
    </>
  );
}

export default EmptyContent;
