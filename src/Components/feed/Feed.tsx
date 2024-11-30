import "../Feed/Feed.css";
import { useState, useEffect } from "react";
import LoadingView from "../loading/Loading";
import EmptyContent from "../emptyContent/EmptyContent";
import Post from "../post/Post";
import { request } from "../../Api";
import { PostModel, MenuStatus, RequestType } from "../../types";
import localDataProvider from "../../localDataProvider";

interface Props {
  type: MenuStatus;
  noUserAction: () => void;
}

function Feed({ type, noUserAction }: Props) {
  const user = localDataProvider.getUser();
  const [feedModel, setFeedModel] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMainFeed = async () => {
    try {
      let mainFeedUrl = "";
      if (user) {
        mainFeedUrl = `/post?userId=${user.userId}`;
      } else {
        mainFeedUrl = "/post";
      }
      const data = await request<PostModel[]>(mainFeedUrl, RequestType.get);
      console.log(data);
      setFeedModel(data);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar main feed");
      setLoading(false);
    }
  };

  const fetchSavedList = async () => {
    try {
      const data = await request<PostModel[]>(
        `/post/saved/${user?.userId}`,
        RequestType.get
      );
      console.log(data);
      setFeedModel(data);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar main feed");
      setLoading(false);
    }
  };

  const fetchUploads = async () => {
    try {
      const data = await request<PostModel[]>(
        `/post/user/${user?.userId}`,
        RequestType.get
      );
      console.log(data);
      setFeedModel(data);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar main feed");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    switch (type) {
      case MenuStatus.main:
        fetchMainFeed();
        break;
      case MenuStatus.saved:
        fetchSavedList();
        break;
      case MenuStatus.upload:
        fetchUploads();
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

  if (feedModel.length == 0) {
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
          {feedModel?.map((item) => (
            <li key={item.id} className="py-4">
              <Post
                model={item}
                noUserAction={noUserAction}
                onModelChange={handleItemUpdated}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Feed;
