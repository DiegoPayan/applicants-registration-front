import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ id, open, title, noAgreeClick, disableAgree, agreeClick, btnAgree, btnNoAgree, children }) {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            id={id}            >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {btnNoAgree && <Button onClick={noAgreeClick} color="primary">
                    {btnNoAgree}
                </Button>}
                <Button disabled={disableAgree} onClick={agreeClick} color="primary" autoFocus>
                    {btnAgree}
                </Button>
            </DialogActions>
        </Dialog>
    );
}