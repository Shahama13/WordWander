import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import { Typography } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",        
      }}
    
    >
      <HourglassTopOutlinedIcon style={{ marginRight: "0.5rem" }} />
      <Typography variant="h6">Loading....</Typography>
    </div>
  );
};

export default Loader;
