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
        const { titleName, dataNum, backgroundColor, classColor, time, className, icono=true,customIcon} = this.props;
        return(
            <div className={`current-widget bg-${classColor} ${className}` }>
                <RctCardContent>
                    <div className="d-flex justify-content-between">
                        <div className="align-items-start">
                            <h4 className="mb-10">{titleName}</h4>
                            <h2 className="mb-0 fontSize"><CountUp start={0} end={dataNum} />{time}</h2>
                        </div>
                        {icono &&
                            <div className="align-items-end">
                                <i className={`zmdi zmdi-${customIcon} fontSize`}></i>
                            </div>
                        }
                    </div>
                </RctCardContent>
            </div>
        );
    }
}

export default CardInfo;
