import React, { Component } from "react";
import imgSpinner from "Assets/logos/ipfilogo.png";

class FullScreenLoader extends Component {
    state = {

    }
    render(){
        const { height } = this.props;
        return(
            <div className="d-flex justify-content-center loader-overlay customZ_index">
                {/* <CircularProgress size={60} color="primary"/> */}
                <img className="imgSpinner"  src={imgSpinner} /> 
            </div>
        );
    }
}

export default FullScreenLoader;