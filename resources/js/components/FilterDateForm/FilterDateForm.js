import React, { useState} from "react";
import { DateTimePicker } from '@material-ui/pickers';
import SweetAlert from 'react-bootstrap-sweetalert';
import IntlMessages from 'Util/IntlMessages';
import { Badge } from 'reactstrap';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import "react-datepicker/dist/react-datepicker.css";
// import './styles.css';

const FilterDateForm = ({ form, onChange, onChangeFilter, onSubmit, onClick, onCancel, campain=false, events=null, onClickCampania}) => (
    <form className="form-inline justify-content-start"
          style={{'padding':' 0 10px'}}
    >   
        <div className="form-inline col-md-3 col-sm-12 col-lg-3">
            <select name="filter" id="filter" className="form-control" onChange={onChangeFilter} value={form.filter}>
                <option value="0">Hoy</option>
                <option value="1">Últimos 3 días</option>
                <option value="2">Últimos 15 días</option>
                <option value="3">Último 1 mes</option>
                <option value="4">Personalizado</option>
            </select>   
        </div>
        {form.filter == 4 &&
            <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="row justify-content-center">
                    <Badge className="ml-15 mt-5 col-md-3 pl-1 pb-5 col-sm-12 col-lg-3" color="dark">
                        <span style={{margin: '3px 0', paddingBottom: '2px', borderBottom: '1px solid white'}}>Fecha Inicial Seleccionada</span>
                        {String(form.initialDate)}
                    </Badge>
                    <Badge className="ml-15 mt-5 col-md-3 pl-1 pb-5 col-sm-12 col-lg-3" color="dark">
                        <span style={{margin: '3px 0', paddingBottom: '2px', borderBottom: '1px solid white'}}>Fecha Final Seleccionada</span>
                        {String(form.finalDate)}
                    </Badge>
                    {campain &&
                        <Badge className="ml-15 mt-5 col-md-3 pl-1 pb-5 col-sm-12 col-lg-3" color="dark">
                            <span style={{margin: '3px 0', paddingBottom: '2px', borderBottom: '1px solid white'}}>Campañas Seleccionada</span>
                            {String(form.campania)}
                        </Badge>
                    }
                    <div className="mt-5 col-lg-1 col-md-1 col-sm-1 col-xl-1 col-1">
                        <button className="btn btn-info " onClick={onClick}>
                            <ListItemIcon className="menu-icon" style={{marginLeft: "9px"}}>
                                <i className='ti-pencil-alt'></i>
                            </ListItemIcon>
                        </button>
                    </div>
                </div>
            </div>
        }
        <SweetAlert
            btnSize="sm"
            show={form.filterPersonalizado}
            showCancel
            title="Filtro Perzonalizado"
            confirmBtnText="Filtrar"
            confirmBtnBsStyle="primary"
            cancelBtnText="Cancelar"
            cancelBtnBsStyle="danger"
            onConfirm={onSubmit}
            onCancel={onCancel}
        >
            <div className="row mt-40 mb-40">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="rct-picker">
                        <DateTimePicker 
                            key="Fecha Inicial"
                            label="Fecha Inicial"
                            value={form.initialDate}
                            format="YYYY/MM/DD hh:mm a"
                            onChange={(event) => onChange(event, 'initialDate')}
                            animateYearScrolling={false}
                            leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                            rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                            showTodayButton={true}
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="rct-picker">
                        <DateTimePicker 
                            key="Fecha Final"
                            label="Fecha Final"
                            value={form.finalDate}
                            format="YYYY/MM/DD hh:mm a"
                            onChange={(event) => onChange(event, 'finalDate')}
                            animateYearScrolling={false}
                            leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                            rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                            showTodayButton={true}
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-40">
                {campain &&
                    <div className="form-inline justify-content-center col-12 col-sm-12 col-lg-12">
                        <label className="mr-4">Campañas</label>
                        <select name="id_event" id="id_event" className="form-control" onChange={onChange} value={form.id_event}>
                            <option value="0">Todas</option>
                            {events && events.map((data, key) => (
                            <option key={key} value={data.id}>{data.nombre}</option>
                            ))}
                        </select>   
                    </div>
                }
            </div>
        </SweetAlert>
    </form>
);

export default FilterDateForm;
