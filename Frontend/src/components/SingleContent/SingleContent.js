import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  imdbID,
  Poster,
  Title,
  Year,
  Type,
}) => {


  console.log('Poster', Poster);
  return (
    <ContentModal media_type={Type} id={imdbID}>


      <img
        className="poster"        
        src={Poster != "N/A" ? `${Poster}` : unavailable}
        alt={Title}
      />
      <b className="title">{Title}</b>
      <span className="subTitle">
        {Type === "series" ? "TV Series" : "Movie"}
        <span className="subTitle">{Year}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;