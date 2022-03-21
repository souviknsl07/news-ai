import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@material-ui/core";

import useStyles from "./styles.js";

const infoCards = [
  { color: "#F582A7", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#283593",
    title: "News by Sources",
    info: "ABC News, CNN, Wired, BBC News, Time, IGN, Buzzfeed...",
    text: "Give me the news from CNN",
  },
  {
    color: "#C74B50",
    title: "News by Categories",
    info: "General,  Sports, Business, Entertainment, Health, Science, Technology",
    text: "Give me the latest Sports news",
  },
  {
    color: "#557B83",
    title: "News by Terms",
    info: "Web 3.0, Crypto, Smartphones, Elon Musk...",
    text: "Tell me about Crypto",
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h6" component="h6">
                  {infoCard.title}
                </Typography>
                {infoCard.info ? (
                  <Typography variant="p" component="p">
                    <strong>{infoCard.title.split(" ")[2]}</strong>: <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="p" component="p">
                  Try saying: <br /> <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }
  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <NewsCard article={article} i={i} activeArticle={activeArticle} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
