import CircularProgress from "@mui/material/CircularProgress";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useFetch from "../customHooks/useFetch";
import styled from "@mui/material/styles/styled";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1.5, "auto"),
  justifyContent: "center",
  color: theme.palette.text.secondary,
  width: "200px",
  height: "100px",
  alignItems: "center",
  display: "flex",
  fontSize: "1.2rem",
  fontWeight: "500",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#cdcdcd"
  }
}));

const styles = (theme) => ({
  loaderWrapper: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  main: {
    backgroundColor: "#ececec",
    margin: "10px 50px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
      margin: "20px 60px"
    },
    [theme.breakpoints.up("md")]: {
      margin: "20px 100px"
    },
    [theme.breakpoints.up("lg")]: {
      margin: "20px 200px"
    }
  }
});

function AlbumsGrid(props) {
  let { userId } = useParams();
  const navigate = useNavigate();
  const [albums] = useFetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  );
  const { classes } = props;
  const handleClickOnItem = (e, index) => {
    navigate(`/albums/${userId}/pictures/${index}`, {
      state: {
        albumId: index
      }
    });
  };
  return (
    <>
      <Typography variant="h5">ALBUM FOR USER-{userId}</Typography>
      <main className={classes.main}>
        {albums === null ? (
          <div className={classes.loaderWrapper}>
            <CircularProgress
              size="5rem"
              style={{ color: "grey", margin: "0 auto" }}
            />
          </div>
        ) : Object.keys(albums).length === 0 ? (
          "No Albums available"
        ) : (
          <Box sx={{ flexGrow: 1 }} py={2}>
            <Grid container>
              <Grid container item spacing={2}>
                {albums.map((album) => (
                  <Grid item xs={12} sm={6} md={4} key={album.id}>
                    <Item onClick={(e) => handleClickOnItem(e, album.id)}>
                      {album.id} <br />
                      {album.title}
                    </Item>
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
export default withStyles(styles)(AlbumsGrid);
