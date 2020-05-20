/*
 * This is a texsrse
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ cardInfo }) {
  /* 
{
    imageurl: "imageurl",
    title: "str",
    meta: "sre",
    content: "sre",
    actions: "buttons"

}
*/
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            cardInfo.imageurl ||
            "https://semantic-ui.com/images/wireframe/image.png"
          }
          title={cardInfo.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {cardInfo.title || "Title"}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            {cardInfo.meta || "Meta"}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {cardInfo.content || "This is the body of the card"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {cardInfo.actions || (
          
            <Button size="small" color="primary">
              This is a button
            </Button>
          
        )}
      </CardActions>
    </Card>
  );
}
