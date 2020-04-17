import React, { Component } from 'react';
import { UserBlockClass } from '../components/Sidebar/UserBlock';
import { connect } from 'react-redux';
import { logoutUserFromFirebase } from 'Actions';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from 'Util/IntlMessages';
import './styles.css';

export class AutoLogout extends Component {
    constructor(props) {
        super(props);
        var minutos = 10;
        this.state = {
            signoutTime: minutos*60*1000,
            // signoutTime: 1000,
            showAlert: false,
            AutoLogoutBoolean: false
        };
        this.UserBlock = new UserBlockClass(props);
    }

    componentDidMount() {
        this.events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
        ];

        for (var i in this.events) {
            window.addEventListener(this.events[i], this.resetTimeout);
        }

        this.setTimeout();
    }

    handleWindowClose(){
        alert("Alerted Browser Close");
    }

    clearTimeoutFunc = () => {
        if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
    }

    setTimeout = () => {
        this.logoutTimeout = setTimeout(this.timeOut, this.state.signoutTime);
    }

    resetTimeout = () => {
        this.clearTimeoutFunc();
        this.setTimeout();
    }

    timeOut = () => {
        switch (location.pathname) {
            case '/signin':
                this.state.AutoLogoutBoolean = false;
                break;
            case '/password/email':
                this.state.AutoLogoutBoolean = false;
                break;
            case '/password/reset':
                this.state.AutoLogoutBoolean = false;
                break;
            default:
                this.state.AutoLogoutBoolean = true;
                break;
        }

        if(this.state.AutoLogoutBoolean){
            this.setState({
                showAlert: true
            })
            this.UserBlock.logoutUser();
        }    
    }

    logout(){
        this.setState({
            showAlert: false
        })
    }

    render(){
        const {showAlert} = this.state;
        return (
            <SweetAlert
                warning
                customClass='classSweetAlertSession'
                btnSize="sm"
                show={showAlert}
                title={"Sesión Cerrada"}
                confirmBtnText={"Aceptar"}
                confirmBtnBsStyle="success"
                onConfirm={() => this.logout()}
            >

            </SweetAlert>
        )
    }
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return settings;
}

export default connect(mapStateToProps, {
	logoutUserFromFirebase
})(AutoLogout);