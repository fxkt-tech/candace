"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vh",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f5f7",
      }}
    >
      <Grid xs={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              GPT
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              className={`link ${pathname === "/" ? "active" : ""}`}
              href="/gpt"
            >
              <Button size="small">Go</Button>
            </Link>
          </CardActions>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              SD Tag Manager
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              className={`link ${pathname === "/" ? "active" : ""}`}
              href="/sdtags"
            >
              <Button size="small">Go</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
