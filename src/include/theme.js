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
    invisibleSeparator: {
        border: 'none', //hr has border by default
        margin: 4,
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgb(0,0,0,0.1)',
        marginBottom: '20px' //same as 20
    },
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center', //aligns div to center, which then aligns image child to center
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%',
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            // '& a': {
            //     color: '#009688'
            // }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    staticProfile: {
        '& .image-wrapper': {
            textAlign: 'center', //aligns div to center, which then aligns image child to center
            position: 'relative',
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            // '& a': {
            //     color: '#009688'
            // }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
    },
};

const theme = {
    palette, themeName, styles
};

export default theme;