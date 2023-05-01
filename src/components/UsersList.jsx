import { useState } from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import { useNavigate } from "react-router-dom";

const styles = {
  orderedList: {
    listStyle: "decimal"
  },
  orderedListItem: {
    display: "list-item",
    paddingBottom: "15px",
    paddingTop: "10px",
    borderBottom: "0.5px solid black"
  }
};

const UsersList = ({ list, classes }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate(`albums/${index}`, {
      state: {
        userId: index
      }
    });
  };
  return (
    <>
      <Typography variant="h5">LIST OF USERS</Typography>
      <Container maxWidth="md">
        <List className={classes.orderedList}>
          {list.map((item) => {
            return (
              <ListItem
                key={item.name}
                button
                onClick={(event) => handleListItemClick(event, item.id)}
                selected={selectedIndex === item.id}
                className={classes.orderedListItem}
              >
                <ListItemText
                  primary={
                    <>
                      <div>Name: {item.name}</div>
                      <div>Username: {item.username}</div>
                      <div>Email: {item.email}</div>
                      <div>Phone: {item.phone}</div>
                      <div>Website: {item.website}</div>
                      <div>Company Name: {item.company.name}</div>
                      <div>
                        Address: {item.address.street}, {item.address.suite},{" "}
                        {item.address.city}, {item.address.zipcode}
                      </div>
                    </>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default withStyles(styles)(UsersList);
