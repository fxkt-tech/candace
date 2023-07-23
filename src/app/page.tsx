"use client";

import {
  AddOutlined as AddIcon,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  Paper,
  styled,
} from "@mui/material";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "red" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const IMGS: string[] = [
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/1.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/2.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/3.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/4.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/5.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/6.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/7.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/8.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/10.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/11.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/12.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/13.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/14.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/15.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/16.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/9.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/18b158c0f114be366920aad3f434849d.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/39829a536dd620eeb1836636a9cba47a.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/70938916883ebab556f3f8e57c0f13d6.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/b17bbfd2cf9df9027a8c0b28c006b6f1.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/ff0d431fabfdb22666bc13e4cc2f18df.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/224f6ebf811d2ead2151e37306531df4.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/3cc3237406b9a3a424eb3ff44ca1cb2d.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/87b39afaa72c15cb2fba4c4b466e9aaa.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/c585513674d6b2815188f0cb09b55b87.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/22f9ecfa41b3d7e109b0f14710c359c0.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/610ac292f5dd7846b6cef92ed9ea40d8.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/8cccd91909dbbdc0205cd8d75812a9e8.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/f0bb589c4a85127ed2a95f51677a8a3b.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/22fbb63ce5af3e2faad86009c0f1062c.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/7070dcaf4105f28d93d3ce0c77a139cf.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/9f11790ce895f6d5f0a1cdbcf7b7b52e.jpg",
  "https://yilan-open.oss-cn-beijing.aliyuncs.com/aitrain/kafka/f7152ff0aa9c25cf0a32dc9d7ed29745.jpg",
];

const TAGS: string[] = [
  "kafka",
  "1girl",
  "looking_at_viewer",
  "red_background",
  "simple_background",
  "smile",
  "solo",
];

export default function Home() {
  const [imgs, setImgs] = useState(IMGS);
  const [tags, setTags] = useState(TAGS);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        sx={{
          height: "100%",
        }}
        container
        xs={6}
        overflow="auto"
      >
        <ImageList cols={3} variant="masonry" sx={{ margin: "10px" }} gap={10}>
          {imgs.map((item) => (
            <ImageListItem key={item}>
              <Card>
                <CardActionArea>
                  <img src={item} loading="lazy" />
                </CardActionArea>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid xs={6}>
        <Paper sx={{ margin: "10px", padding: "5px" }}>
          <Paper
            component="form"
            variant="outlined"
            elevation={24}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="输入或选择要操作的标签"
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton color="primary">
              <AddIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Paper>

          <Divider />

          <Box sx={{ margin: "5px" }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                onClick={handleClick}
                onDelete={handleDelete}
              />
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
