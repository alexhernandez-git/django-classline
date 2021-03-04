import styled from "@emotion/styled";
const CourseList = (props) => {
  const { id, title, picture, views } = props.video;

  return (
    <VideoContent className="d-flex align-items-center">
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
          {title}
        </small>
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

export default CourseList;
