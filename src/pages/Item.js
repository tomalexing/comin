import React, {Component} from 'react'
import shop from '../img/shop.png'
import item_white from '../img/item-white.png';
import item2_white from '../img/item2-white.png';
import {LazyImage} from '../helpers.js';

const items = [
    {
        priceNew: '$49.00',
        priceOld: '$99.00',
        title: 'Canvas with Quote',
        sale: '-50%',
        images: {
            white: () => import('../img/item-white.png'),
            blue: () => import('../img/item-blue.png'),
            red: () => import('../img/item-red.png')
        }
    },
    {
        priceNew: '$9.00',
        priceOld: '$29.00',
        title: 'Throw Pillow',
        sale: '-70%',
        images: {
            white: () => import('../img/item2-white.png'),
            blue: () => import('../img/item2-blue.png'),
            red: () => import('../img/item2-red.png')
        }
    }
    
]

export default class Item extends Component {


    state = {
        activeColor: 'white'
    }

    componentWillMount(){
        this.setState({product: items[Math.floor(Math.random() * items.length)]});
    }

    changeColor = (color) => () => {
        console.log('d');
        this.setState({activeColor: color})
    }

    render() {
        let { product, activeColor } = this.state;

        return(
            <div className="Item">
                <div className="Item__shopMerch"><img src={shop}/></div>
                <div className="Item-product">
                    <div className="Item-product__sale">
                        {product.sale}
                    </div>
                    <div className="Item-product-image">
                        <LazyImage load={product.images[activeColor]}/>
                        <div className="Item-product-image__hover">
                            <div className="Item-product-image__text">SALE {product.sale}</div>
                        </div>
                    </div>
                    <div className="Item-product__footer">
                        <div className="Item-product-switcher">
                            {Object.entries(product.images).map((color, idx) => {
                                return(
                                    <div key={color[0]} data-color={color[0]} onClick={this.changeColor(color[0])} className={"Item-product-switcher__color" + ((activeColor === color[0])? ' Item-product-switcher__color--active':'')} >{color[0]}</div>
                                )
                            })}
                        </div>
                   
                        <h2 className="h2 Item-product__title"> {product.title} </h2>

                        <div className="Item-product-price">
                            <div className="Item-product-price__old">
                                {product.priceOld}
                            </div>
                            <div className="Item-product-price__new">
                                {product.priceNew}
                            </div>
                        </div>
                        <div className="Item-product__buy">
                            <a className="btn btn-primiry btn-normal" href="http://google.com">BUY NOW</a>
                        </div>
                    </div>
                </div>
                <p className="Item-footer">
                    Powered by <a href="http://comin.co">Comin</a>
                </p>

            </div>
        )
    }
}