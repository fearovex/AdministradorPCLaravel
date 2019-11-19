// Custom Picker
import React, { Component } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ReactDOM from 'react-dom'
import LenguageProvider  from '../../../../components/Header/LanguageProvider';

// const LenguageProviderComponent = ReactDOM.render(<LenguageProvider />)

moment.locale('en');

export default class CustomDateTimePicker extends Component {
	
	state = {
		selectedDate: new Date(),
		anchorEl: null,
    	currentLocale: 'en',
	};

	handleDateChange = (date) => {
		this.setState({ selectedDate: date });
	};

	render() {
		console.log(locale)
		const { selectedDate } = this.state;
		const locale =this.state.currentLocale;
		return (
			<MuiPickersUtilsProvider utils={MomentUtils} locale={locale} moment={moment}>
				<div className="">
					<DateTimePicker
						fullWidth
						label="Choose a Date & Time"
						clearable
						error
						autoOk
						showTabs={false}
						// autosubmit={false}
						disableFuture
						value={selectedDate}
						onChange={this.handleDateChange}
						helperText="Required"
						leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
						rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="date-picker-icon">
									<IconButton><i className="zmdi zmdi-alarm" /></IconButton>
								</InputAdornment>
							),
						}}
					/>
				</div>
			</MuiPickersUtilsProvider>
		)
	}
}
