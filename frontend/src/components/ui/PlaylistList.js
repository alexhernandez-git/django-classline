import styled from "@emotion/styled";
const VideoList = (props) => {
  const { id, name, picture, views } = props.playlist;

  return (
    <VideoContent className="d-flex align-items-center">
      <img
        className="rounded mr-2 w-50"
        src={picture ? picture : "../../../../static/assets/img/no-foto.png"}
        alt="playlist"
      />
      <div>
        <small
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </small>
        {/* <small
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.2rem",
          }}
        >
          {views} visitas
        </small> */}
      </div>
    </VideoContent>
  );
};

export const VideoContent = styled.span`
  width: 100%;
  display: block;
  img {
    width: 100%;
  }
`;

export default VideoList;
