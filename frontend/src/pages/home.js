import React from "react";
import { Container, Grid } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Event, Edit, Schedule } from "@mui/icons-material";
import Hero from "../components/Hero";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "1rem",
    height: "100vh",
  },
  box: {
    // border: `1px solid ${theme.palette.first}`,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} container>
      <Grid item xs={7} className={classes.box}>
        <Item>
          <Hero />
        </Item>
      </Grid>
      <Grid item xs={5} className={classes.box}>
        <Item>2</Item>
      </Grid>
      <Grid item xs={12} className={classes.box}>
        <Item>Search Area</Item>
      </Grid>
    </Grid>
  );
}
