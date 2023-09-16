import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Stack, Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { VolumeUp } from "@mui/icons-material";
import { hearAudio, translateWords } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFailure,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");

  const params = useSearchParams()[0].get("language") as langType;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;
    if (player) {
      player.play();
    } else {
      const data = await hearAudio(words[count]?.word, params);
      setAudioSrc(data);
    }
  };

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("")
  };

  const { loading, error, words } = useSelector(
    (state: { root: StateType }) => state.root
  );

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params)
      .then((arr) => {
        dispatch(getWordsSuccess(arr as WordType[]));
      })
      .catch((err) => {
        dispatch(getWordsFailure(err));
      });
    if (error) {
      alert(error);
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loader />;
  return (
    <Container maxWidth={"sm"} sx={{ padding: "1rem" }}>
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
        sx={{ marginBottom: "1.5vmax" }}
      >
        <ArrowBack />
      </Button>
      <Typography marginBottom={"2vmax"}>Learning made easy</Typography>

      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color={"blue"} variant="h4">
          : {words[count]?.meaning}
        </Typography>
        <Button sx={{ borderRadius: "40%" }} onClick={audioHandler}>
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        onClick={
          count === words.length - 1 ? () => navigate("/quiz") : nextHandler
        }
        sx={{ margin: "3rem 0" }}
        variant="contained"
        fullWidth
      >
        {count === words.length - 1 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
