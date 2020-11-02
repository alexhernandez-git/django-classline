import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import moment from "moment";
const CourseCard = (props) => {
  console.log(props);
  const { pathname } = useLocation();
  const { program } = useParams();
  const { code, title, picture, videos, pack_price } = props.course;
  function msToHMS(seconds) {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  }
  return (
    <Link
      to={
        !/\/demo\//.test(pathname)
          ? `/academy/${program}/admin/course/${code}`
          : pathname
      }
    >
      <PackContent>
        <PackImage className="cursor-pointer">
          <div className="video-content">
            <img
              className="rounded"
              src={
                picture ? picture : "../../../../static/assets/img/no-foto.png"
              }
              alt="video"
            />
          </div>
        </PackImage>
        <PackInfo>
          <div className="video-text">
            <div className="py-2 d-flex justify-content-between">
              <span css={textEllipsis}>{title ? title : "Nuevo curso"}</span>
              {pack_price && (
                <span css={textEllipsis} className="text-grey">
                  {pack_price.label}
                </span>
              )}
            </div>
            <div className="text-grey">
              <div>
                <small css={textEllipsis}>Lecciones: 2</small>
              </div>
              {/* <div>
                  <small css={textEllipsis}>Playlists: 2</small>
                </div>
                <div>
                  <small css={textEllipsis}>Recursos: 8</small>
                </div>  */}
            </div>
          </div>
        </PackInfo>
      </PackContent>
    </Link>
  );
};

const PackContent = styled.div`
  width: 100%;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  &:hover img {
    transform: scale(1.03);
  }
`;

const PackImage = styled.span`
  width: 100%;
  display: block;
  overflow: hidden;

  img {
    transition: 0.5s ease;
    width: 100%;
  }

  .video-content {
    position: relative;
  }
`;
const PackInfo = styled.div`
  .video-text {
    align-items: center;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    height: 20%;
    background: #fff;
    z-index: 500;
  }
`;
export default CourseCard;
