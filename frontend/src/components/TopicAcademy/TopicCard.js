import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "src/components/ui/TextEllipsis";
const TopicCard = (props) => {
  console.log(props)
  const { pathname } = useLocation();
  const { program } = useParams();
  const { code, name, picture, videos, podcasts,playlists } = props.topic;
 
  return (
    <Link
      to={
        !/\/demo\//.test(pathname)
          ? `/academy/${program}/admin/topic/${code}`
          : pathname
      }
    >
      <TopicContent>

        <TopicImage className="cursor-pointer">
          <div className="video-content">
            <img
              className="rounded"
              src={
                picture ? picture :
                "../../../../static/assets/img/no-foto-square.png"
                
              }
              alt="video"
              />
          </div>
        </TopicImage>
        <TopicInfo>

            <div className="video-text">

              <div className="py-2 d-flex justify-content-between">
                <span css={textEllipsis}>{name ? name : "Nuevo tema" }</span>
       
              </div>
              <div className="text-grey">
                <div>
                  <small css={textEllipsis}>Videos: {videos}</small>
                </div>
                <div>
                  <small css={textEllipsis}>Playlists: {playlists}</small>
                </div>
                <div>
                  <small css={textEllipsis}>Audios: {podcasts}</small>
                </div>
                {/* 
                <div>
                  <small css={textEllipsis}>Recursos: 8</small>
                </div>  */}
              </div>


            </div>
        </TopicInfo>
          </TopicContent>
    </Link>
  );
};

const TopicContent = styled.div`
  width: 100%;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  &:hover img {
    transform: scale(1.03);
  }
` 

const TopicImage = styled.span`
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
const TopicInfo = styled.div`
  .video-text {
    align-items: center;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    height: 20%;
    background: #fff;
    z-index: 500;
  }
`
export default TopicCard;
