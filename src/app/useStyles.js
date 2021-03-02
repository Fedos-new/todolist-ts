import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    containerM: {
        marginTop: theme.spacing(12),
    },
    paperLogin: {
        textAlign: "center",
        padding: '20px 30px 40px 30px'
    },
    paperTodo: {
        padding: '10px'
    },
    gridAddForm: {
        padding: '20px'
    },
    progressLine: {
        position: 'absolute',
        width: '100%'
    },
    progressCircularWrap: {
        position: 'fixed',
        top: '0',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: '0',
        height: '100vh',
        width: '100vw',
    }

}))
