import "../Feed/Feed.css";
import Post from "../Post/Post";

function Feed() {
  return (
    <>
      <div className="container">
        <h1 className="title">Feed de Postagens</h1>
        <ul className="">
          <li className="py-4">
            <Post />
          </li>
          <li className="py-4">
            <Post />
          </li>
          <li className="py-4">
            <Post />
          </li>
          <li className="py-4">
            <Post />
          </li>
          <li className="py-4">
            <Post />
          </li>
          <li className="py-4">
            <Post />
          </li>
          <li className="py-4">
            <Post />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Feed;
