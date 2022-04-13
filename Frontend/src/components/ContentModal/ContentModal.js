import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  // const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getMovieDetails = async () => {
    const { data } = await axios.get(
      `http://www.omdbapi.com/?i=${id}&apikey=49393327`
    );
    setContent(data)

  };

  useEffect(getMovieDetails, []);

 

  

 

  return (

    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.Poster !="N/A"
                      ? content.Poster 
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.Poster !="N/A"
                      ? content.Poster 
                      : unavailable
                  }
                  alt={content.Title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                  {content.Title}
                  </span>
                  {content.Year && (
                    <i className="tagline">Year: {content.Year}</i>
                  )}

                <div className="tagline">
                    <h3>Actors : { " " }
                    <i>
                      {content.Actors}
                    </i>
                    <div>
                    <i>
                     Director : {content.Director}
                    </i>
                    </div>
                    

                    </h3>

                </div>
            


                  <span className="ContentModal__description">
                    {content.Plot}
                  </span>

                

               
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}