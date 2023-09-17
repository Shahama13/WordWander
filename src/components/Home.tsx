import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
         <Link
         to={`/learn/${l.code}`}
         style={{
           textDecoration: "none",
           border: "2px solid #1a237e",
           padding: "2vmax",
           borderRadius: "15%",
           color: "#1a237e",
           display: "inline-block", // Add this line to make it inline
           margin: "5px", // Add this line for spacing
         }}
         key={l.code}
       >
         {l.name}
       </Link>
       
        ))}
      </Stack>
      <Typography color="secondary" textAlign={"center"}>
        Choose language from above
      </Typography>
    </Container>
  );
};

export default Home;
