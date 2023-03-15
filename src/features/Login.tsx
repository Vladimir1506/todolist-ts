import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../bll/store';
import {loginTC} from '../bll/reducers/auth-reducer/auth-reducer';
import {Navigate} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
const Login = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Password must be more than 3 characters'
            }
            return errors
        }
    })
    if (isLoggedIn) return <Navigate to={'/'}/>
    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href="https://social-network.samuraijs.com/" target={'_blank'} rel="noreferrer"> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <TextField label={'Email'} margin={'normal'} {...formik.getFieldProps('email')}/>
                        {formik.errors.email && formik.touched.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField type={'password'} label={'Password'}
                                   margin={'normal'} {...formik.getFieldProps('password')}/>
                        {formik.errors.password && formik.touched.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox checked={formik.values.rememberMe}
                                                             {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormControl>
                </Grid>
            </Grid>
        </form>

    );
};

export default Login;