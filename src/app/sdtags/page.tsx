"use client";

import { tagsAdd, tagsDrop, tagSplit } from "@/util/tag";
import {
  AddOutlined as AddIcon,
  DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { LocalImage } from "./model";

export default function Tags() {
  // 左侧图片列表
  const [imgs, setImgs] = useState<LocalImage[]>([]);
  // 右侧标签管理器
  const [currentName, setCurrentName] = useState("");
  const [currentImg, setCurrentImg] = useState("");
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  // 标签管理器的输入
  const [tagsMgr_Input, setTagsMgr_Input] = useState("");

  const handleClick = (tag: string) => {
    console.log(tag, currentTags);
    if (currentTags.includes(tag)) {
      let tags = tagsDrop(currentTags, [tag]);
      setCurrentTags(tags);
    }
  };

  const handleImgClick = (limg: LocalImage) => {
    setCurrentName(limg.name);
    setCurrentImg(limg.src);
    setCurrentTags(limg.tags);
  };

  const handleImgsClear = () => {
    setImgs([]);
    setCurrentName("");
    setCurrentImg("");
    setCurrentTags([]);
  };

  const handleAddTags = () => {
    imgs.forEach((value, _) => {
      if (value.name === currentName) {
        let tags = tagsAdd(value.tags, tagSplit(tagsMgr_Input));
        value.tags = tags;
        setCurrentTags(tags);
      }
    });
    setTagsMgr_Input("");
  };

  const onOpenDir = async () => {
    const arrFileHandle = await (window as any).showOpenFilePicker({
      types: [
        {
          accept: {
            "image/*": [".png", ".gif", ".jpeg", ".jpg", ".txt"],
          },
        },
      ],
      // 可以选择多个图片
      multiple: true,
    });

    const imgList: LocalImage[] = [];
    const imgMap = new Map<string, LocalImage>();
    for (const fileHandle of arrFileHandle) {
      const fileData = await fileHandle.getFile();

      let name = fileData.name as string;
      let baseName = name.substring(0, name.lastIndexOf("."));
      const v = imgMap.get(baseName);
      if (name.endsWith(".txt")) {
        let text: string = await fileData.text();
        const tags = text.trim().split(",");
        if (v === undefined) {
          imgMap.set(baseName, { name: "", src: "", tags: tags });
        } else {
          v.tags = tags;
        }
      } else {
        const buffer = await fileData.arrayBuffer();
        let src = URL.createObjectURL(new Blob([buffer]));
        if (v === undefined) {
          imgMap.set(baseName, { name: name, src: src, tags: [] });
        } else {
          v.name = name;
          v.src = src;
        }
      }
    }

    imgMap.forEach((value, _) => {
      if (value !== undefined && value.name !== "") {
        imgList.push(value);
      }
    });

    setImgs(imgList);
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f4f5f7",
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
        <ImageList
          cols={3}
          variant="masonry"
          sx={{
            margin: "10px",
            width: "100%",
            backgroundColor: "#ffffff",
          }}
          gap={10}
        >
          {imgs.map((item) => (
            <ImageListItem key={item.name}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    handleImgClick(item);
                  }}
                >
                  <CardMedia component="img" image={item.src} alt={item.name} />
                  <CardContent>
                    <Typography variant="body2" color="text">
                      {item.tags.join(", ")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>

      <Grid xs={6}>
        <Paper sx={{ margin: "10px", padding: "5px" }} elevation={0}>
          <Button onClick={onOpenDir}>从本地加载图像</Button>
          <Button disabled>从服务器加载图像</Button>
          <Button onClick={handleImgsClear} disabled={imgs.length === 0}>
            清空左侧列表
          </Button>
        </Paper>
        <Paper sx={{ margin: "10px", padding: "5px" }} elevation={0}>
          <Paper
            component="form"
            variant="outlined"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <InputBase
              value={tagsMgr_Input}
              sx={{ ml: 1, flex: 1 }}
              placeholder={"输入或选择要操作的标签。" + currentName}
              onChange={(event: any) => {
                setTagsMgr_Input(event.target.value);
              }}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton color="primary" onClick={handleAddTags}>
              <AddIcon />
            </IconButton>
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Paper>

          <Divider />

          <Box sx={{ margin: "5px" }}>
            {currentTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{ marginLeft: "5px", marginBottom: "5px" }}
                size="small"
                variant="outlined"
                onClick={() => {
                  handleClick(tag);
                }}
              />
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
