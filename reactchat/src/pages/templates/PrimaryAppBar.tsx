import { AppBar, Box, zIndex, IconButton, Toolbar, Link, Drawer, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";

const PrimaryAppBar = () => {
    const [sideMenu, setSideMenu] = useState(false);
    const theme = useTheme();
    
    const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
    
    useEffect(() => {
        if (isSmallScreen && sideMenu) {
            setSideMenu(false);
        }
    }, [isSmallScreen]);

    const toggleDrawer =
        (open: Boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setSideMenu(open);
            };
            
        
    return (
        <AppBar
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 2,
                backgroundColor: theme.palette.background.paper,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar
                variant="dense"
                sx={{
                    height: theme.primaryAppBar.height,
                    minHeight: theme.primaryAppBar.height,
                }}
            >
                <Box sx={{ display: { xs: "block", sm: "block" } }}>
                    <IconButton 
                        color="black" 
                        aria-label="open drawer" 
                        edge="start"
                        onClick={toggleDrawer(true)} 
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                    {[...Array(100)].map((_,i) => (
                        <Typography key={i} paragraph>
                            {i + 1}
                        </Typography>
                    ))} 
                </Drawer>

                <Link href="/" underline="none" color="black">
                    <Typography
                        variant="h6"
                        noWrap
                        component="div" 
                        sx={{ fontWeight: 700, letterSpacing: "-0.5px" }} // Corrección: no es necesario `display` aquí
                    >
                        Chati Chati
                    </Typography>
                </Link>
           </Toolbar>
        </AppBar>
    );
}

export default PrimaryAppBar;