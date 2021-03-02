import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Grid,
    Paper
} from '@material-ui/core'
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {Redirect} from "react-router-dom";
import {useStyles} from "../../app/useStyles";

type FormikErrorsType = {
    email?: string;
    password?: string;
    rememberMe?: boolean
}


export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const classes = useStyles()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        validate: (values) => {
            const errors: FormikErrorsType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be more 3 characters';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });


    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center" alignItems="center">
        <Paper className={classes.paperLogin}>

            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered&nbsp;
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'} rel="noopener noreferrer">here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email
                            ? <div style={{color: "red"}}>{formik.errors.email}</div>
                            : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}

                        />
                        {formik.touched.password && formik.errors.password
                            ? <div style={{color: "red"}}>{formik.errors.password}</div>
                            : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Paper>
    </Grid>

}
