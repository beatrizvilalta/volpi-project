import "./loading.css";

function LoadingView() {
  return (
    <div
      className="is-flex is-justify-content-center is-align-items-center"
      style={{ padding: "50px" }}
    >
      <div className="loader is-size-3"></div>
    </div>
  );
}

export default LoadingView;
