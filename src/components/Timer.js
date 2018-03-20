import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

class Timer extends React.Component{
    state = {
        hours: '0',
        minutes: '49',
        seconds: '00'
    }

    componentWillMount(){
        let startData = new Date();
        startData = startData.toISOString();
        // broadcast startData

        if(this.props.sync){
            let now = new Date();
            let startedData = new Date(this.props.sync);
            let newMin = parseInt( this.state['minutes'] ) - ((now.getHours() - startedData.getHours()) * 60  + now.getMinutes() - startedData.getMinutes());
            let newSec = parseInt( this.state['seconds'] ) - now.getSeconds() + startedData.getSeconds();
            if(newSec < 0){
                newSec +=  60;
                newMin -=  1;
            }
            this.state['minutes'] = Math.min(newMin, 60);
            this.state['seconds'] = Math.min(newSec, 60);
        }

        //start count
        setInterval(() => {
            let borrow = false; 
            ['seconds', 'minutes'].map( name => {
                let value = parseInt(this.state[name]),
                    newvalue = '';
                
                if( borrow ){
                    value = value - 1;
                    borrow = false;
                }

                if( value <= 0 ){
                    value = 60;
                    borrow = true;
                }
                if(name == 'seconds'){
                    newvalue = value - 1;
                }else{
                    newvalue = value;
                }

                if(newvalue < 10 ){
                    newvalue = '0' + newvalue
                }
                this.state[name] = newvalue;
            })

            this.forceUpdate();

        }, 1000)
    }

    render(){
        let { hours, minutes, seconds } = this.state;
        let {cn} = this.props;
        return (
            <div className={`Timer ${cn?cn:''}`} >
                <span className="Timer__pre" > Ends in </span> 
                <div> {hours} </div>
                <span className="Timer__del" >:</span> 
                <div> {minutes} </div>
                <span className="Timer__del" >:</span> 
                <div> {seconds} </div>
            </div>
        )
    }

}

export default Timer;