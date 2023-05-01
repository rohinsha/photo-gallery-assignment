import CircularProgress from "@mui/material/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useFetch from "../customHooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  loaderWrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  main: {
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
      margin: "20px 30px"
    },
    [theme.breakpoints.up("md")]: {
      margin: "20px 100px"
    },
    [theme.breakpoints.up("lg")]: {
      margin: "20px 150px"
    }
  },
  cardContent: {
    height: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("xs")]: {
      height: "80px"
    }
  },
  card: {
    margin: "15px auto",
    [theme.breakpoints.up("xs")]: {
      width: "300px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.up("md")]: {
      width: "210px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "220px"
    }
  }
});

function PicturesGrid(props) {
  let { userId, albumId } = useParams();
  const navigate = useNavigate();
  const [photos] = useFetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
  );
  const { classes } = props;
  const handleClickOnItem = (e, index) => {
    navigate(`/albums/${userId}/pictures/${albumId}/photo/${index}`, {
      state: {
        photoId: index
      }
    });
  };
  return (
    <>
      <Typography variant="h5" className={classes.heading}>
        PHOTOS FOR USER-{userId}
      </Typography>
      <main className={classes.main}>
        {photos === null ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress
              size="5rem"
              style={{ color: "grey", margin: "0 auto" }}
            />
          </div>
        ) : Object.keys(photos).length === 0 ? (
          "No Albums available"
        ) : (
          <Box sx={{ flexGrow: 1 }} py={2}>
            <Grid container>
              <Grid container item spacing={2}>
                {photos.map((photo) => (
                  <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card
                      className={classes.card}
                      onClick={(e) => handleClickOnItem(e, photo.id)}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={photo.thumbnailUrl}
                          alt={photo.title}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="div">
                            {photo.id}
                          </Typography>
                          <Typography variant="body2">{photo.title}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        )}
      </main>
    </>
  );
}
export default withStyles(styles)(PicturesGrid);
