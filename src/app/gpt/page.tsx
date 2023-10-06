"use client";

import { fetchEventSource } from "@microsoft/fetch-event-source";
import {
  AddOutlined as AddIcon,
  ClearOutlined as ClearOutlinedIcon,
  HorizontalRuleOutlined as HorizontalRuleOutlinedIcon,
  ScheduleSendOutlined as ScheduleSendOutlinedIcon,
  SendOutlined as SendOutlinedIcon,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  Unstable_Grid2 as Grid,
  IconButton,
  InputBase,
  Paper,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Completion } from "./model";

const initCompletions = () => {
  return [{ id: nanoid(), role: "user", content: "" }];
};

export default function GPT() {
  // 对话列表
  const [completions, setCompletions] = useState<Completion[]>(
    initCompletions()
  );
  const [gptAnswerLoading, setGPTAnswerLoading] = useState(false);

  const newCompletions = () => {
    setCompletions(initCompletions());
  };

  const addMessage = (): string => {
    const lastRole =
      completions.length === 0
        ? "assistant"
        : completions[completions.length - 1].role;
    const role = reverseRole(lastRole);

    const uniqueId = nanoid();
    setCompletions([...completions, { id: uniqueId, role: role, content: "" }]);

    return uniqueId;
  };

  const delMessage = (id: string) => {
    setCompletions(completions.filter((comp) => comp.id !== id));
  };

  const reverseRole = (role: string) => {
    return role === "user" ? "assistant" : "user";
  };

  const changeRole = (id: string) => {
    const nextComps = completions.map((comp) => {
      if (comp.id === id) {
        comp.role = reverseRole(comp.role);
      }
      return comp;
    });
    setCompletions(nextComps);
  };

  const changeContent = (id: string, content: string) => {
    // const nextComps = completions.map((comp) => {
    //   if (comp.id === id) {
    //     comp.content = content;
    //   }
    //   return comp;
    // });
    // setCompletions(nextComps);
    setCompletions((completions) => {
      return completions.map((comp) => {
        if (comp.id === id) {
          comp.content = content;
        }
        return comp;
      });
    });
  };

  const gptAnwser = () => {
    setGPTAnswerLoading(true);
    const messages = completions.map((comp) => {
      return { role: comp.role, content: comp.content };
    });
    const id = addMessage();
    let respString = "";
    fetchEventSource("http://localhost:8000/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
      mode: "cors",
      onmessage(event) {
        // 表示整体结束
        if (event.data === "[DONE]") {
          setGPTAnswerLoading(false);
          return;
        }
        const jsonData = JSON.parse(event.data);
        if (jsonData.content !== undefined) {
          respString += jsonData.content;
          changeContent(id, respString);
        }
      },
    });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.code === "Enter") {
      gptAnwser();
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.removeEventListener("keydown", handleKeydown);
    };
  }, []);

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
      <Grid xs={8}>
        <Paper sx={{ margin: "10px", padding: "5px" }} elevation={0}>
          <Button onClick={newCompletions} disabled={completions.length === 0}>
            <ClearOutlinedIcon />
          </Button>
          <Button onClick={addMessage}>
            <AddIcon />
          </Button>
          <Button onClick={gptAnwser} disabled={gptAnswerLoading}>
            {gptAnswerLoading ? (
              <ScheduleSendOutlinedIcon />
            ) : (
              <SendOutlinedIcon />
            )}
          </Button>
        </Paper>

        <Paper
          sx={{ margin: "10px", padding: "5px", height: "90vh" }}
          elevation={0}
        >
          {completions.map((item: Completion) => (
            <Paper
              component="form"
              variant="outlined"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                margin: "5px",
              }}
              key={item.id}
            >
              <Button
                onClick={() => {
                  changeRole(item.id);
                }}
              >
                {item.role}
              </Button>

              <InputBase
                value={item.content}
                multiline
                minRows={1}
                maxRows={20}
                sx={{ ml: 1, flex: 1 }}
                // placeholder={"输入或选择要操作的标签。" + currentName}
                onChange={(event: any) => {
                  changeContent(item.id, event.target.value);
                }}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              {/* <IconButton
                color="primary"
                onClick={() => {
                  delMessage(item.id);
                }}
              >
                <AddIcon />
              </IconButton> */}
              <IconButton
                color="error"
                onClick={() => {
                  delMessage(item.id);
                }}
              >
                <HorizontalRuleOutlinedIcon />
              </IconButton>
            </Paper>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}
