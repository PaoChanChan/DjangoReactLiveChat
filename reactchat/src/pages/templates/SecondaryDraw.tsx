import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import axios from 'axios';

const SecondaryDraw = () => {
    const theme = useTheme();

    axios.get("http://127.0.0.1:8000/api/server/select/?category=Videogames").then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error);
    })

    return (
        <Box 
            sx={{
                minWidth: `${theme.secondaryDraw.width}px`,
                mt: `${theme.primaryAppBar.height}px`,
                height: `calc(100vh - ${theme.primaryAppBar.height})`,
                borderRight: `1px solid ${theme.palette.divider}`,
                display: { xs: "none", sm:"block"},
                overflow: "auto",
            }}
        >
        {[...Array(100)].map((_,i) => (
            <Typography key={i} paragraph>
                {i + 1}
            </Typography>
        ))} 
    
    </Box>
    );
}
export default SecondaryDraw;