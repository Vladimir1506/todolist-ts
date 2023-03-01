import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {AppErrorType, setAppErrorAC} from '../../bll/reducers/app-reducer/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ErrorSnackbar() {
    const error = useAppSelector<AppErrorType>(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))

    };

    return (
        <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="error" onClose={handleClose}>{error}</Alert>
        </Snackbar>
    );
}