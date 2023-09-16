import {
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveResult } from "../redux/slices";
const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { words } = useSelector((state: { root: StateType }) => state.root);

  useEffect(() => {
    
    if (count + 1 > words.length) {
      setResult([...result, ans]);
      dispatch(saveResult(result));
      navigate("/result");
    }
  }, [result]);

  const nextHandler = async () => {
     setCount((prev) => prev + 1);
     setResult((prev) => [...prev, ans]);
     setAns("")
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      <Typography m={"2rem 0"}>Quiz</Typography>
      <Typography variant="h3">
        {count + 1} - {words[count]?.word}
      </Typography>
      <FormControl>
        <FormLabel sx={{ mt: "2rem", mb: "1rem" }}>Meaning</FormLabel>
        <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
          {words[count]?.options.map((o) => (
            <FormControlLabel value={o} control={<Radio />} label={o} />
          ))}
        </RadioGroup>
      </FormControl>
      <Button
        onClick={nextHandler}
        sx={{ margin: "3rem 0" }}
        variant="contained"
        fullWidth
        disabled={ans === ""}
      >
        {count === words.length - 1 ? "Submit" : "Next"}
      </Button>
    </Container>
  );
};

export default Quiz;
