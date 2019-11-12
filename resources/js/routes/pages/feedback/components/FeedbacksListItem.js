/**
 * Feedback List Item
 */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button } from 'reactstrap';

const FeedbackListItem = ({ data, onFeedbackFavorite, onDeleteFeedback, viewFeedbackDetails, onReply, onReplySend }) => (
	<li className="d-flex justify-content-between">
		<div className="media">
			<img src={data.userAvatar} alt="feedback user" className="rounded-circle mr-20" width="60" height="60" />
			<div className="media-body">
				<div className="mb-10">
					<p className="mb-5 text-base"><a href="#" onClick={e => e.preventDefault()}>{data.userName}</a> commented on the <span className="text-primary">{data.idea}</span></p>
					<span className="fs-12 text-muted">{data.time}</span>
				</div>
				<div className="feed-content mb-10">
					<a href="#" onClick={viewFeedbackDetails}>{data.description}</a>
				</div>
				<div className="social-action">
					<button type="button" onClick={onFeedbackFavorite} className={`rct-link-btn ${classnames({ 'text-danger': data.liked })}`}
					><i className="zmdi zmdi-favorite"></i></button>
					<button type="button" className="rct-link-btn" onClick={onReply}><i className="zmdi zmdi-mail-reply"></i></button>
				</div>
				{data.replyBox &&
					<InputGroup>
						<Input placeholder="Reply..." />
						<InputGroupAddon addonType="append"><Button color="primary" onClick={onReplySend}>Send</Button></InputGroupAddon>
					</InputGroup>
				}
			</div>
		</div>
		<div className="list-action">
			<IconButton aria-label="eye" onClick={viewFeedbackDetails}>
				<i className="ti-eye"></i>
			</IconButton>
			<IconButton aria-label="close" onClick={onDeleteFeedback}>
				<i className="ti-close"></i>
			</IconButton>
		</div>
	</li>
);

export default FeedbackListItem;
