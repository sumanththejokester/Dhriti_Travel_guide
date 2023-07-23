import { colors } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { FormatBold } from '@material-ui/icons';

export default makeStyles((theme) => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    tableContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
    },
    table: {
        tableLayout: 'fixed',
        width: '70%',
        borderCollapse: 'collapse',
        marginTop: theme.spacing(1),
        border: `1px solid`,
        borderColor: theme.palette.common.white,
    },
    tableHead: {
        backgroundColor: alpha(theme.palette.common.black, 0.45),
        color: (theme.palette.common.black),
        fontSize: '16px',
    },
    tableCell: {
        textAlign: 'center',
        padding: theme.spacing(1),
        border: `1px solid`,
        color: (theme.palette.common.white),
        backgroundColor: alpha(theme.palette.common.black, 0.25),

    },
    noPosts: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        color: (theme.palette.common.white),

    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: "url('https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
    },
    box: {
        width: '55%',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        marginTop: '35px',
        backgroundColor: theme.palette.common.black,
        opacity: 0.6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    box1: {
        width: '80%',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '34px',
        backgroundColor: theme.palette.common.black,
        opacity: 0.6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        color: 'white',
        fontSize: '15px'
    },
    value: {
        fontSize: '15px',
        color: 'green'
    },
    h1: {
        color: 'white',
        textAlign: 'center',
        marginTop: '10px'
    },
    formInput: {
        padding: '8px',
        marginTop: '17px',
        marginLeft: '7px',
        borderRadius: '10px',
        border: '1px solid white',
        backgroundColor: alpha(theme.palette.common.white, 0.25),

    },
    deleteIcon: {
        color: 'red',
        fontSize: '1.5rem',
    },
    status: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    btn: {
        width: '80%',
        height: '50px',
        padding: '10px',
        backgroundColor: 'white',
        color: 'red',
        borderRadius: '5px',
        fontSize: '18px',
        cursor: 'pointer',
        marginTop: '15px',
        marginBottom: '30px',
    },
    confirm: {
        width: '50%',
        height: '34px',
        border: '1px solid white',
        color: theme.palette.common.white,
        backgroundColor: 'green',
        opacity: 0.6,
        borderRadius: '4px',
    }
}));