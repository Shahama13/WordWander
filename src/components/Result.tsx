import {
  Container,
  ListItem,
  List,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState and useEffect

const Result = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
  );
  const [a, setA] = useState(0); 

  useEffect(() => {
    let correctCount = 0;
    for (let index = 0; index < result.length; index++) {
      if (words[index]?.meaning === result[index]) {
        correctCount++;
        setA(correctCount); 
      }
    }
  }, [result, words]);

  const setColor = (index: number): "green" | "red" => {
    if (words[index]?.meaning === result[index]) {
      return "green";
    } else {
      return "red";
    }
  };
  // 

  const resethandler = (): void => {
    dispatch(clearState());
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h3" color={"primary"} m={"2rem 0"}></Typography>
      <Typography m={"1rem"} variant="h6">
        You Got {a} correct out of {words?.length}
      </Typography>

      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Word
          </Typography>
          <List>
            {words.map((i, idx) => (
              <ListItem key={idx}>
                {idx + 1} - {i.word}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Your Ans
          </Typography>
          <List>
            {result.map((i, idx) => (
              <ListItem sx={{ color: setColor(idx) }} key={idx}>
                {i}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Correct Ans
          </Typography>
          <List>
            {words.map((i, idx) => (
              <ListItem sx={{ color: "green" }} key={idx}>
                {i.meaning}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>

      <Typography
        color={a > 4 ? "green" : "red"}
        m={"1rem "}
        variant="h5"
      >
        {a > 4 ? "Pass" : "Fail"}
      </Typography>
      <Button
        onClick={resethandler}
        sx={{ margin: "1rem" }}
        variant="contained"
      >
        Reset
      </Button>
    </Container>
  );
};

export default Result;
