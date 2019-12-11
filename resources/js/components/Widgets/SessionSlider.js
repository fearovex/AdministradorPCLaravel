/**
** Session Slider
**/

import React, { Component } from "react";
import Slider from "react-slick";

// api
import api from 'Api';

export default class SessionSlider extends Component {

	state = {
		sessionUsersData: null
	}

	componentDidMount() {
		this.getSessionUsersData();
	}

	// session users data
	getSessionUsersData() {
		api.get('testimonials.js')
			.then((response) => {
				console.log(response)
				this.setState({ sessionUsersData: response.data });
			})
			.catch(error => {
				// error handling
			})
	}

	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			swipe: true,
			touchMove: true,
			swipeToSlide: true,
			draggable: true
		};
		const { sessionUsersData } = this.state;
		return (
			<div className="session-slider">
				<Slider {...settings}>
						<div>
							<img
								src={require('Assets/img/gallery-1.jpg')}
								alt="session-slider"
								className="img-fluid gallery6"
								// width="100%"
								// height="100%"								
							/>							
						</div>
						<div>
							<img
								src={require('Assets/img/gallery-2.jpg')}
								alt="session-slider"
								className="img-fluid gallery2"								
							/>							
						</div>
						<div>
							<img
								src={require('Assets/img/gallery-3.jpg')}
								alt="session-slider"
								className="img-fluid gallery3"								
							/>							
						</div>
						<div>
							<img
								src={require('Assets/img/gallery-4.jpg')}
								alt="session-slider"
								className="img-fluid gallery4"								
							/>							
						</div>
						<div>
							<img
								src={require('Assets/img/gallery-5.jpg')}
								alt="session-slider"
								className="img-fluid gallery5"								
							/>							
						</div>
				</Slider>
			</div>
		);
	}
}
