import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }
}

export default createTheme({
    palette: {
        neutral: {
            light: '#f7f8f8',
            main: '#dadce0',
            dark: '#3c4043',
        },
    },
});
