import React, {Component} from 'react'
import shop from '../img/Logo_dark.png'
import item_white from '../img/item-white.png';
import item2_white from '../img/item2-white.png';
import star_white from '../img/star-white.png';
import {LazyImage} from '../helpers.js';
import Auth from './../store/AuthStore.js';
import Api from './../services/Api.js';
import items from './../products.js';
import Timer from './../components/Timer.js';

export default class Item extends Component {
    state = {}

    componentWillMount(){
        this.startDate = new Date();


        if(!Auth.uid){
            this.setState({product: items[Math.floor(Math.random() * items.length)]}, _ => {
                this.setState({activeColor: Object.keys(this.state.product.images)[0]});
            });
        }else{
            let _self = this;
            Api.auth().onAuthStateChanged((user) => {
                if(!user){
                    return _self.setState({product: items[Math.floor(Math.random() * items.length)]}, _ => {
                        this.setState({activeColor: Object.keys(this.state.product.images)[0]});
                    });
                }
                let { uid } = user;
                Api.getRef(`users/${uid}`).once('value')
                .then(snapshot => {
                  let {prod} = snapshot.val();
                  if(prod){
                    _self.setState({product: items.filter( p => p.productId == prod)[0]}, _ => {
                        this.setState({activeColor: Object.keys(this.state.product.images)[0]});
                    })
                  }else{
                    _self.setState({product: items[Math.floor(Math.random() * items.length)]}, _ => {
                        this.setState({activeColor: Object.keys(this.state.product.images)[0]});
                    });
                  }
                });
      
            });

        }
        let that = this;
        window.onmessage = function(e) {
            if(e.ports[0]){
                that.eventFromOutSide = e;
            }
        }
        

    }

    openPopup = (e) => {
        if(this.eventFromOutSide){
            e.preventDefault();
            this.eventFromOutSide.ports[0].postMessage({
                openPopup: true, 
                date: this.startDate.toISOString(),
                productId: this.state.product.productId
                });
        }
    } 

    changeColor = (color) => () => {
        this.setState({activeColor: color})
    }

    render() {
        let { product, activeColor } = this.state;

        return(
            (!product || !activeColor) ? <div>Loading</div>:
            <div className="Layout-iframe">
                
                <div className="Item">
                    <div className="Item__beta">BETA</div>
                    <a target="_blank" href={`${process.env.REACT_APP_BUILD ? 'https://comin.co/cominsystem' + encodeURIComponent( product.productId ) + '?utm_source=quotesgram&utm_medium=banner' + encodeURIComponent( product.productId ) + '&utm_campaign=logo'  : 'http://localhost:3000/?prod=' + encodeURIComponent( product.productId )}`} className="Item__shopMerch"><img src={shop}/></a>
                    <div className="Item-product">
                        <div className="Item-product__sale">
                            {"Best Price " + product.sale }
                        </div>
                        <div className="Item-product-image">
                            <LazyImage load={product.images[activeColor]}/>
                            <a target="_blank" href={`${process.env.REACT_APP_BUILD ? 'https://comin.co/cominsystem' + encodeURIComponent( product.productId ) + '?utm_source=quotesgram&utm_medium=banner' + encodeURIComponent( product.productId ) + '&utm_campaign=view'  : 'http://localhost:3000/?prod=' + encodeURIComponent( product.productId )}`} className="Item-product-image__hover" onClick={this.openPopup}>
                                <div className="Item-product-image__text">View</div>
                                <div className="Item-stars">
                                    {
                                        [...Array.from({length: 5}).keys()].map((star, i) => {
                                            return(<img key={i} src={star_white} />)
                                        })
                                    }
                                </div>
                            </a>
                        </div>
                        <div className="Item-product__footer">
                            <div className="Item-product-switcher">
                                {Object.entries(product.images).map((color, idx) => {
                                    return(
                                        <div key={color[0]} data-color={color[0]} onClick={this.changeColor(color[0])} className={"Item-product-switcher__color" + ((activeColor === color[0])? ' Item-product-switcher__color--active':'')} >{color[0]}</div>
                                    )
                                })}
                            </div>

                            <a target="_blank" href={`${process.env.REACT_APP_BUILD ? 'https://comin.co/cominsystem' + encodeURIComponent( product.productId ) + '?utm_source=quotesgram&utm_medium=banner' + encodeURIComponent( product.productId ) + '&utm_campaign=name'  : 'http://localhost:3000/?prod=' + encodeURIComponent( product.productId )}`} onClick={this.openPopup}>
                                <h2 className="h2 Item-product__title"> {product.title} </h2>
                            </a>

                            <div className="Item-product-price">
                                <div className="Item-product-price__old">
                                    {product.priceOld}
                                </div>
                                <div className="Item-product-price__new">
                                    {product.priceNew}
                                </div>
                            </div>

                            <Timer cn="Item-timer" />

                            <div className="Item-product__buy">
                                <a className="btn btn-primary btn-normal" target="_blank" href={`${process.env.REACT_APP_BUILD ? 'https://comin.co/cominsystem' + encodeURIComponent( product.productId ) + '?utm_source=quotesgram&utm_medium=banner' + encodeURIComponent( product.productId ) + '&utm_campaign=buy'  : 'http://localhost:3000/?prod=' + encodeURIComponent( product.productId )}`} onClick={this.openPopup} >VIEW DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <p className="Item-footer">
                        Powered by <a target="_blank" href={`${process.env.REACT_APP_BUILD ? 'https://comin.co/cominsystem' + encodeURIComponent( product.productId ) + '?utm_source=quotesgram&utm_medium=banner' + encodeURIComponent( product.productId ) + '&utm_campaign=comin'  : 'http://localhost:3000/?prod=' + encodeURIComponent( product.productId )}`}>Comin</a>
                    </p>

                </div>
            </div>
        )
    }
}