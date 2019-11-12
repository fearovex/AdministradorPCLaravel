/**
 * Dashboard Overlay
 */
import React, { Component } from 'react';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// component
import OrdersStats from './Orders';
import UsersStats from './Users';
import RatingsStats from './Ratings';

class DashboardOverlay extends Component {

	componentDidMount() {
		var open = document.getElementsByClassName('dashboard-overlay')[0];
		open.classList.remove('show');
		open.classList.add('d-none');
	}

	render() {
		const { onClose } = this.props;
		return (
			<div className="dashboard-overlay p-4">
				<div className="overlay-head d-flex justify-content-between mb-40">
					<div className="dash-user-info">
						<h2 className="fw-bold mb-0"><IntlMessages id="components.summary" /></h2>
					</div>
					<button type="button" onClick={onClose} className="closed rct-link-btn">
						<i className="ti-close"></i>
					</button>
				</div>
				<div className="dashboard-overlay-content mb-30">
					<div className="row row-eq-height">
						<div className="col-sm-6 col-md-4">
							<OrdersStats />
						</div>
						<div className="col-sm-6 col-md-4">
							<UsersStats />
						</div>
						<div className="col-sm-12 col-md-4">
							<RatingsStats />
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default DashboardOverlay;
