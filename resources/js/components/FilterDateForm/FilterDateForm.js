import React, { useState} from "react";
import { DateTimePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import IntlMessages from 'Util/IntlMessages';
import moment from "moment";
import MomentUtils from "@date-io/moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import './styles.css';

const FilterDateForm = ({ form, onChange, onSubmit}) => (
    <form className="form-inline justify-content-center"
          onSubmit={onSubmit}
          style={{'padding':' 0 10px'}}
    >
        <div className="input-group mx-sm-2 mb-2">
            <label className="mr-3">Fecha inicio</label>
            <div className="input-group-prepend">
                <div className="input-group-text"><i className="zmdi zmdi-calendar"></i></div>
            </div>
            
            <input
                type="date"
                className="form-control"
                placeholder="Fecha Inicial"
                id="initialDate"
                name="initialDate"
                value={form.initialDate}
                onChange={onChange}
            />
                       
            <input
                type="time"
                className="form-control"
                placeholder="Fecha Inicial"
                name="initialTime"
                value={form.initialTime}
                onChange={onChange}
            />
        </div>
        <div className="input-group mx-sm-2 mb-2">
            <label className="mr-3">Fecha fin &nbsp;&nbsp;</label>
            <div className="input-group-prepend">
                <div className="input-group-text"><i className="zmdi zmdi-calendar"></i></div>
            </div>
            <input 
                type="date" 
                className="form-control" 
                id="finalDate"
                name="finalDate"
                value={form.finalDate}
                onChange={onChange}
                />
            <input 
                type="time" 
                className="form-control" 
                name="finalTime"
                value={form.finalTime}
                onChange={onChange}
                />
        </div>
        <div className="form-inline justify-content-center">
            <button type="submit" className="btn btn-primary mb-2">Filtrar</button>
        </div>
    </form>
);

export default FilterDateForm;
