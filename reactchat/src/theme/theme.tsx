import { createTheme, responsiveFontSizes, } from "@mui/material";
import PrimaryDraw from '../pages/templates/PrimaryDraw';

declare module "@mui/material/styles" {
    interface Theme {
        primaryAppBar: {
            height: number;
        };

        primaryDraw: {
            width: number;
            closed: number;
        };

        secondaryDraw: {
            width: number;
        };
    }
    interface ThemeOptions {
        primaryAppBar: {
            height: number;
        };

        primaryDraw: {
            width: number;
            closed: number;
        };

        secondaryDraw: {
            width: number;
        };
    }
}

export const createMuiTheme = () => {
    let theme = createTheme({

        typography: {
            fontFamily: ["IBM Plex Mono", "system-ui",].join(","),
        },
        primaryAppBar: {
            height: 50,
        },
        primaryDraw: {
            width: 240,
            closed: 70,
        },

        secondaryDraw: {
            width: 240,
        },

        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "default",
                }
            }
        }
    });
    theme = responsiveFontSizes(theme);
    return theme;
}

export default createMuiTheme;