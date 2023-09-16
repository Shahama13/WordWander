import { Container, Stack, Button, Typography } from "@mui/material";

const languages: langCodes[] = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "Arabic",
    code: "ar",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {
  return (
    <Container maxWidth={"sm"}>
      <Typography
        color="secondary"
          variant="h3"
        p={"2rem"}
        textAlign={"center"}
      >
        Welcome
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((l) => (
          <Button href={`/learn?language=${l.code}`} variant="outlined" key={l.code}>
            {l.name}
          </Button>
        ))}
      </Stack>
      <Typography color="secondary" textAlign={"center"}>
        Choose language from above
      </Typography>
    </Container>
  );
};

export default Home;
