import React from "react";
import { Container, Grid } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { LocalHospitalRounded, VaccinesRounded, MonitorHeartRounded, Lightbulb } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  h1: {
    color: `${theme.palette.first}`,
    textAlign: "left"
  },
  hero: {
  },
  grid: {
    textAlign: "right",
    padding: "0 5em"
  },
  textBox: {
    wordBreak: "wrap",
    textAlign: "left",
  }
}));

const info = [
  { icon: LocalHospitalRounded, text: "dddddddd" },
  { icon: VaccinesRounded, text: "bbbbbb" },
  { icon: MonitorHeartRounded, text: "bbbbbb" },
  { icon: Lightbulb, text: "bbbbbb" },
]

export default function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <h1 className={classes.h1}>HealthChecker</h1>
      <Grid className={classes.grid} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {info.map((item, index) => (
          <Grid item xs={6}>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={3}>
                <item.icon />
              </Grid>
              <Grid item xs={9} className={classes.textBox}>
                {item.text}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
