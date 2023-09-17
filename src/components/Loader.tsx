import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import { Typography ,Container} from "@mui/material";

const Loader = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",        
      }}
    
    >
      <HourglassTopOutlinedIcon style={{ marginRight: "0.5rem" }} />
      <Typography variant="h6">Loading....</Typography>
    </Container>
  );
};

export default Loader;
