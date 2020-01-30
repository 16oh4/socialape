const palette = {
    primary: { main: '#009688', contrastText: '#ffffff' },
    secondary: { main: '#FFF59D', contrastText: '#000000' }
  };
  
const themeName = 'Persian Green Picasso Zebu';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '0px auto 0px auto'
    },
    pageTitle: {
        margin: '0px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px'
    },
    button: {
        marginTop: 35,
        position: 'relative',
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',  //relative to font-size of root (entire page)
        marginTop: 10,
    },
    progress: {
        position: 'absolute'
    },
};

const theme = {
    palette, themeName, styles
};

export default theme;