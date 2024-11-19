import "../Feed/Feed.css";
import { useState, useEffect } from "react";
import LoadingView from "../loading/Loading";
import EmptyContent from "../emptyContent/EmptyContent";
import Post from "../post/Post";
import { FeedModel, PostModel, MenuStatus } from "../../types";

interface Props {
  type: MenuStatus;
}

function Feed({ type }: Props) {
  const [feedModel, setFeedModel] = useState<FeedModel>({
    nextPage: "",
    feedList: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // TODO: Realizar o fetch em cada caso e chamar setFeedModel no final do request
    switch (type) {
      case MenuStatus.main:
        setFeedModel(mainFeedModel);
        setLoading(false);
        break;
      case MenuStatus.saved:
        setFeedModel(savedFeedModel);
        break;
      case MenuStatus.upload:
        setFeedModel(uploadsFeedModel);
        setLoading(false);
        break;
    }
  }, [type]);

  function handleItemUpdated(model: PostModel) {
    console.log(`update model ${model.id}`);
  }

  if (loading) {
    return (
      <>
        <LoadingView />
      </>
    );
  }

  if (feedModel.feedList.length == 0) {
    return (
      <>
        <EmptyContent type={type} />
      </>
    );
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Feed de Postagens</h1>
        <ul className="">
          {feedModel?.feedList.map((item) => (
            <li key={item.id} className="py-4">
              <Post model={item} onModelChange={handleItemUpdated} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const mainList = [
  {
    id: 1,
    title: "Material de colorir peixe boi",
    author: "João Guimarões Rosa",
    description:
      "Ensinando os animais da APA costa dos corais. Ensinando os animais da APA costa dos corais.",
    isLiked: false,
    isSaved: true,
    likes: 0,
    comments: 0,
    createdAt: "10/11/2024",
  },
  {
    id: 2,
    title: "Material de colorir peixe boi",
    author: "João Guimarões Rosa",
    description:
      "Ensinando os animais da APA costa dos corais. Ensinando os animais da APA costa dos corais.",
    isLiked: true,
    isSaved: false,
    likes: 10,
    comments: 0,
    createdAt: "10/11/2024",
  },
  {
    id: 3,
    title: "Material de colorir peixe boi",
    author: "João Guimarões Rosa",
    description:
      "Ensinando os animais da APA costa dos corais. Ensinando os animais da APA costa dos corais.",
    isLiked: false,
    isSaved: true,
    likes: 30,
    comments: 0,
    createdAt: "10/11/2024",
  },
];

const mainFeedModel: FeedModel = {
  nextPage: "",
  feedList: mainList,
};

const savedList: PostModel[] = [
  {
    id: 1,
    title: "Material de colorir peixe boi",
    author: "João Guimarões Rosa",
    description:
      "Ensinando os animais da APA costa dos corais. Ensinando os animais da APA costa dos corais.",
    isLiked: false,
    isSaved: true,
    likes: 0,
    comments: 0,
    createdAt: "10/11/2024",
  },
];

const savedFeedModel: FeedModel = {
  nextPage: "",
  feedList: savedList,
};

const uploadsFeedModel: FeedModel = {
  nextPage: "",
  feedList: [],
};

export default Feed;
