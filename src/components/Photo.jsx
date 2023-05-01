import CircularProgress from "@mui/material/CircularProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useFetch from "../customHooks/useFetch";
import { useParams } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  main: {
    margin: "25px 0 10px",
    borderRadius: "5px"
  },
  imageStyles: {
    maxWidth: "80%",
    height: "80vh",
    padding: "0",
    margin: "0"
  },
  loaderWrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    width: "100%"
  }
});

function Photo(props) {
  let { userId, albumId, photoId } = useParams();
  const [photo] = useFetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&id=${photoId}`
  );
  const { classes } = props;
  return (
    <>
      <Typography variant="h5">PHOTO FOR USER-{userId}</Typography>
      <main className={classes.main}>
        {photo === null ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress
              size="5rem"
              style={{ color: "grey", margin: "0 auto" }}
            />
          </div>
        ) : Object.keys(photo).length === 0 ? (
          "No Photo available"
        ) : (
          <Box
            component="img"
            className={classes.imageStyles}
            alt={photo[0].title}
            src={photo[0].url}
          />
        )}
      </main>
    </>
  );
}

export default withStyles(styles)(Photo);
