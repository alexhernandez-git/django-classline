import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import moment from "moment";
const TopicCard = (props) => {
  const {program} = useParams()
  const {code, name, picture}= props.topic
  return (
    <Link
      to={`/academy/${program}/topic/${code}`}
    >
           <Topic>
                <TopicImage className="cursor-pointer">
                  <div className="video-content">
                    <img
                      className="rounded"
                      src={picture ? picture :
                        "../../../../static/assets/img/no-foto-square.png"
                      }
                      alt="video"
                    />
                  </div>
                </TopicImage>
                <TopicInfo>

                  <div className="video-text">
                      <span css={textEllipsis}>{name}</span>
                  </div>
                </TopicInfo>
              </Topic>
    </Link>
  );
};

const Topic = styled.div`
  width: 100%;
  display: block;
  border-radius: 1rem;
  overflow: hidden;
  max-width: 25.7rem;
  margin: auto;

  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
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
    text-align:center;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    height: 20%;
    background: #fff;
    z-index: 500;
  }
`
export default TopicCard;
