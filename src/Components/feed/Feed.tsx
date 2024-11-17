import "../Feed/Feed.css";
import Post from "../post/Post";
import { PostModel } from "../../types";

function Feed() {
  const feedList = [
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

  function handleItemUpdated(model: PostModel) {
    console.log(`update model ${model.id}`);
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Feed de Postagens</h1>
        <ul className="">
          {feedList.map((item) => (
            <li key={item.id} className="py-4">
              <Post model={item} onModelChange={handleItemUpdated} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Feed;
