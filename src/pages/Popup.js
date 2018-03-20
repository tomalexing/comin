import React, {Component} from 'react'
import shop from '../img/Logo_dark.png'
import item_white from '../img/item-white.png';
import item2_white from '../img/item2-white.png';
import star_white from '../img/star-white.png';
import star_blue from '../img/star-blue.png';
import avatar from './../img/avatar.png';
import {LazyImage, getParameterByName} from '../helpers.js';
import Auth from './../store/AuthStore.js';
import Api from './../services/Api.js';
import items from './../products.js';
import Timer from './../components/Timer.js';

export default class Popup extends Component {
    state = {
            detailInfo: true,
            customerReview: false,
            currentReview: 0,
            currentThumbnail: 0,
            activeThumbnail: 0
        }
    
    componentWillMount(){
        let id = getParameterByName('id'),
            sync = getParameterByName('date');
        this.setState({product: items.filter( o => id == o.productId)[0], sync}, _ => {
            this.setState({activeColor: Object.keys(this.state.product.images)[0],
                currentColor: Object.keys(this.state.product.images)[0]});
        });
        
        this.clear = setInterval( ( _ => {
            this.state.customerReview &&
            this.setState({currentReview: (this.state.currentReview + 1 )% this.state.product.reviews.count })
        }).bind(this), 5000)

    }

    changeColor = (color) => () => {
        this.setState({
            activeColor: color,
            currentThumbnail: 0,
            activeThumbnail: 0
            })
    }

    onMouseAction = (color) => () => {
        this.setState({currentColor: color, activeThumbnail: 0, currentThumbnail: 0})
    }

    changeTab = (tab) => () => {
        this.state['detailInfo'] = false;
        this.state['customerReview'] = false,
        this.state[tab] = true;
        this.forceUpdate()
    }

    changeCurrentReview = (review) => () => {
        this.setState({currentReview: review})
        clearInterval(this.clear)
    }

    changeFeature = (idx) => () => {
        this.setState({currentThumbnail: idx, activeThumbnail: idx})
    }

    onMouseActionFeatureEnter = (idx) => () => {
        this.setState({currentThumbnail: idx})
    }

    onMouseActionFeatureLeave = (idx) => () => {
        this.setState({currentThumbnail: idx})
    }

    onMouseMoveFeature = e => {

        let  {left, top, width, height} = e.currentTarget.firstElementChild.getBoundingClientRect();
        console.log(e.clientY - top - 30)
        let enlargeRange = document.getElementById('enlargeRange');
        enlargeRange.style.top =  Math.max(Math.min(e.clientY - top - 30 , height - 60), 0)   + 'px';
        enlargeRange.style.left =  Math.max(Math.min(e.clientX - left - 30, width - 60), 0) + 'px';

        let enlarge = document.getElementById('enlarge').firstElementChild;
     
        let {width:widthZoomed, height:heightZoomed} = enlarge.getBoundingClientRect();

        let koef1 = heightZoomed/height,
            koef2 = widthZoomed/width;
        enlarge.style.top =  Math.max( Math.min(-(e.clientY - top - 30) * koef1 , 0), -(heightZoomed - 60 * koef1)) + 'px';
        enlarge.style.left = Math.max( Math.min(-(e.clientX - left - 30) * koef2, 0) , -(widthZoomed - 60 * koef2)) + 'px';

    }

    onMouseEnterFeature = () => {
        let enlargeWrapper = document.getElementById('enlarge')
        enlargeWrapper.style.visibility = 'visible';
        enlargeWrapper.style.zIndex = '10';
    }

    onMouseLeaveFeature = () => {
        let enlargeWrapper = document.getElementById('enlarge')
        enlargeWrapper.style.visibility = 'hidden';
        enlargeWrapper.style.zIndex = '-1';
    }
    
    render(){
        let { product, activeColor, customerReview, detailInfo, currentReview,
            currentColor, currentThumbnail, activeThumbnail, sync} = this.state;
            
        return(
            (!product || !activeColor) ? <div>Loading</div>:
            <div className="Layout-iframe" >
                <div className="Popup">
                    <div className="f f-row">
                        <div className="Popup-gallery">
                            <div className="Popup-gallery__feature" >
                                <div className="Popup-gallery__feature__in" onMouseMove={
                                this.onMouseMoveFeature} onMouseEnter={this.onMouseEnterFeature} onMouseLeave={this.onMouseLeaveFeature} ><LazyImage load={product[currentColor][currentThumbnail]}/>
                                
                                <div id="enlargeRange" className="Popup-gallery__feature__enlargeRange"></div>
                                </div>
                            </div>
                            <div className="Popup-gallery__thumbnail">
                                {
                                    product[currentColor + 'Thumbnail'].map( (item, idx) => {
                                        return <div key={idx} onClick={this.changeFeature(idx)} onMouseEnter={this.onMouseActionFeatureEnter(idx)} onMouseLeave={this.onMouseActionFeatureLeave(activeThumbnail)} className={ 'Popup-gallery__thumbnail__item' + (activeThumbnail == idx ? ' Popup-gallery__thumbnail--active' : '')} ><LazyImage load={item}/></div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="Popup-description">
                            <div id="enlarge" className="Popup-gallery__enlarge"> <LazyImage load={product[currentColor][currentThumbnail]}/> </div>
                            <div className="Popup-description__title">{product.fullTitle}</div>
                            <div className="Popup-description__starev">
                                <div title="5 stars" className="Popup-description__star">
                                    {
                                        [...Array.from({length: 5}).keys()].map((star, i) => {
                                            return(<img key={i} src={star_blue} />)
                                        })
                                    }
                                </div>
                                <div className="Popup-description__rev">{product.reviews.count} Reviews</div>
                            </div>
                            <div className="Popup-cartblock">
                                <div className="Popup-cartblock__bestPrice">Best Price {product.sale}</div>
                                <div className="Popup-cartblock-price">
                                    <div className="Popup-cartblock-price__old">
                                        {product.priceOld}
                                    </div>
                                    <div className="Popup-cartblock-price__new">
                                        {product.priceNew}
                                    </div>
                                </div>
                                <Timer cn="Popup-cartblock__timer" sync={sync} />
                                <div className="Popup-cartblock__buy">
                                    <a className="btn btn-primary btn-normal" target="_blank" href={`${process.env.REACT_APP_BUILD ? 'https://comin.co/cominsystem' + encodeURIComponent( product.productId ) + '?utm_source=quotesgram&utm_medium=banner' + encodeURIComponent( product.productId ) + '&utm_campaign=addToCart'  : 'http://localhost:3000/?prod=' + encodeURIComponent( product.productId )}`}>ADD TO CART</a>
                                </div>
                            </div>
                            <div className="Popup-option">
                                <div className="Popup-option__type"><strong>Option:</strong> {currentColor.charAt(0).toUpperCase() + currentColor.substr(1)}</div>
                                <div className="Popup-option-switcher">
                                    { Object.entries(product.images).map((color, idx) => {
                                            return(
                                                <div key={color[0]} data-color={color[0]} onClick={this.changeColor(color[0])} onMouseEnter={this.onMouseAction(color[0])} onMouseLeave={this.onMouseAction(activeColor)} className={"Popup-option-switcher__color" + ((activeColor === color[0])? ' Popup-option-switcher__color--active':'')} >{color[0]}</div>
                                            )
                                        })}
                                </div>
                            </div>
                            <ul className="Popup-descriptionFull">
                                {
                                    product.fullDescription.map((item, i) => (<li key={i} >{item}</li>))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="f f-col">
                        <div className="Popup-switcher">
                        {
                            [{name: 'Detail info', id: 'detailInfo'},
                            {name: 'Top Customer Reviews', id: 'customerReview'}].map((item, idx) => {
                                return(
                                    <button key={idx} onClick={this.changeTab(item.id)} className={"Popup-switcher__tabButton" + ((this.state[item.id])? ' Popup-switcher__tabButton--active':'')}>{ item.name }</button>
                                )
                            })
                        }
                        
                        </div>
                        <div className="Popup-switcher__tabs">
                            {detailInfo && <div className="Popup-tab Popup-detailInfo">
                            
                            {product.detailInfo.map((item, i) => (<div key={i}  className="Popup-detailInfo__row">
                                <div>{item.name}</div>
                                <div>{item.info}</div>
                            </div>))
                            }

                            </div>}

                            {customerReview && <div className="Popup-tab Popup-customerReview">

                                <div className="Popup-customerReview__item">
                                    <div className="Popup-customerReview__itemInfo">
                                        <div className="Popup-customerReview__itemInfo__avatar f f-align-2-2">
                                            <img src={avatar}/>
                                        </div>
                                        <div className="Popup-customerReview__itemInfo__title">
                                            { product.reviews.items[currentReview].name }
                                        </div>
                                        <div className="Popup-customerReview__itemInfo__star">
                                            {
                                                [...Array.from({length: 5}).keys()].map((star, i) => {
                                                    return(<img key={i} src={star_blue} />)
                                                })
                                            }
                                        </div>
                                        <div className="Popup-customerReview__itemInfo__date">
                                            { product.reviews.items[currentReview].data }
                                        </div>
                                    </div>
                                    <div className="Popup-customerReview__item__rev">
                                        { product.reviews.items[currentReview].rev }
                                    </div>
                                </div>
                                <div className="Popup-customerReview-switcher">
                                    {
                                        [...Array.from({length: product.reviews.count}).keys()].map((star, i) => {
                                            return(<button  key={i} className={"Popup-customerReview-switcher__tabButton" + (currentReview == i ? ' Popup-customerReview-switcher__tabButton--active' : '')}onClick={this.changeCurrentReview(i)}></button>)
                                        })
                                    }
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
