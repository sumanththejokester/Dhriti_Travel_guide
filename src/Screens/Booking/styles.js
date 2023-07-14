import { alpha, makeStyles } from '@material-ui/core/styles';

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
        backgroundColor: alpha(theme.palette.common.white, 0.45),
        color: (theme.palette.common.black),
        fontSize: '16px',
    },
    tableCell: {
        textAlign: 'center',
        padding: theme.spacing(1),
        border: `1px solid`,
        color: (theme.palette.common.white),
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
    form: {
        width: '25%',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        marginTop: '35px',
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form1: {
        width: '90%',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginTop: '35px',
        marginBottom: '35px',
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        color: 'white',
        fontSize: '20px'
    },
    h1: {
        color: 'white',
        textAlign: 'center',
        marginTop: '10px'
    },
    dateFields: {
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        margin: '0 auto',
        paddingLeft: '8px',

        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        '& > *': {
            marginRight: theme.spacing(1),
        },
    },

    countTrashFields: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        margin: '0 auto',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },

    deleteIcon: {
        color: 'red',
        fontSize: '1.5rem',
    },
    trshbtn: {
        paddingLeft: '5px',
    },
    formInput: {
        padding: '8px',
        marginTop: '17px',
        marginLeft: '7px',
        borderRadius: '10px',
        border: '1px solid white',
        backgroundColor: alpha(theme.palette.common.white, 0.25),

    }
}));