import React, { Fragment, Component } from 'react';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { deregisterAspirante } from "../../modules/actions";
import AlertDialog from '../DialogConfirm';
class Unregister extends Component {
    state = {
        reason: ""
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    removeAspirant = async () => {
        this.props.deregisterAspirante({ ...this.props.aspirante, motivobaja: this.state.reason })
        this.props.closeRemove()
    }

    render() {
        const { reason } = this.state;
        return (
            <Fragment>
                <AlertDialog id="dialog-reason" open={this.props.open} title="Motivo de baja" noAgreeClick={this.closeRemove} agreeClick={this.removeAspirant} btnAgree="Dar de baja" btnNoAgree="Cancelar">
                    <TextField variant="filled" className="txt-reason" id="standard-basic" label="Motivo" value={reason} onChange={(e) => this.setState({ reason: e.target.value })} />
                </AlertDialog>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
})
const mapDispatchToProps = dispatch => {
    return {
        deregisterAspirante: (data) => { return deregisterAspirante(data)(dispatch) },
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Unregister);
