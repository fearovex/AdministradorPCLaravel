/**
 * Today Orders Stats
 */
import React, { Component } from 'react';
import CountUp from 'react-countup';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import { RctCardContent } from 'Components/RctCard';
//<IntlMessages id="widgets.todayOrders" />
class CardInfo extends Component {
    render(){
        const { titleName, dataNum, backgroundColor, classColor, time} = this.props;
        return(
            <div className={`current-widget bg-${classColor}`}>
                <RctCardContent>
                    <div className="d-flex justify-content-between">
                        <div className="align-items-start">
                            <h4 className="mb-10">{titleName}</h4>
                            <h2 className="mb-0"><CountUp start={0} end={dataNum} />{time}</h2>
                        </div>
                        <div className="align-items-end">
                            <i className="zmdi zmdi-accounts"></i>
                        </div>
                    </div>
                </RctCardContent>
            </div>
        );
    }
}

export default CardInfo;
