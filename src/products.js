const items = [
    // {
    //     productId: '1',
    //     priceNew: '$49.00',
    //     priceOld: '$99.00',
    //     title: 'Canvas with Quote',
    //     sale: '-50%',
    //     saleAmount: '$50',
    //     images: {
    //         white: () => import('./img/item-white.png'),
    //         blue: () => import('./img/item-blue.png'),
    //         red: () => import('./img/item-red.png')
    //     }
    // },
    // {
    //     productId: '2',
    //     priceNew: '$9.00',
    //     priceOld: '$29.00',
    //     title: 'Throw Pillow',
    //     sale: '-70%',
    //     saleAmount: '$20',
    //     images: {
    //         white: () => import('./img/item2-white.png'),
    //         blue: () => import('./img/item2-blue.png'),
    //         red: () => import('./img/item2-red.png')
    //     }
    // },
    // {
    //     productId: '1',
    //     priceNew: '$49.00',
    //     priceOld: '$99.00',
    //     title: 'Heated Blanket',
    //     fullTitle: 'MicroPlush Sherpa Electric Heated Blanket Full Denim',
    //     reviews: {
    //         count: 3,
    //         items: [{
    //             name: 'Zig',
    //             data: 'July 15, 2016',
    //             rev: 'This is a very nice blanket. Very soft and light weight, the wires are very thin, and the control box is easy to use and lights up in the dark. I bought the Queen size it had dual controls. Ample size for the bed, hangs down a foot on both sides, and 18 inches at the foot of the bed leaving 9 inches at the top of the bed. So if you wanted to have the blanket higher at the top there is ample length to do so and have your feet well covered.'
    //         },
    //         {
    //             name: 'shog',
    //             data: 'June 29, 2016',
    //             rev: 'My always-cold girlfriend didn\'t know about electric blankets. This thing blew her mind. It became a sanctuary for her and the cats and to a lesser extent me, throughout the winter. I, who am experienced in the ways of electric blankets, find this a step above the usual quality. The control unit has a very clear glowing digital display and a very intuitive interface. When the season ended we just dropped it in a tub of warm water with oxi clean, rinse, line dry, done.'
    //         },
    //         {
    //             name: 'Kim',
    //             data: 'September 5, 2016',
    //             rev: 'Love this blanket. It is very very soft and miraculously it is made of fabric that does not attract cat fur! Heats up quickly, and effective at even low settings; I use it under my very lightweight silk duvet. I wish manufacturers would stop making self shut-off controls, I don\'t think they are necessary. But I turn control off and then on again just before going to sleep, as an easy work around. The contol is easy to use even in the dark and the blanket is a lovely cream color.'
    //         }]
    //     },
    //     fullDescription: [
    //         'Energy Saving',
    //         'Digital control provides therapeutic warmth with 10 heat settings',
    //         'Machine washable for your convenience, Packaged in a reusable zipper bag',
    //         '100% Polyester Microplush top Sherpa Bottom, Ultra-thin wire for added comfort Five Year Manufacturer Warranty'
    //     ],
    //     detailInfo: [
    //         {name: 'Package Dimensions',
    //         info: '16.6 x 13.3 x 10.6 inches' },
    //         {name: 'Item Weight',
    //         info: '7.33 pounds' },
    //         {name: 'Shipping Weight',
    //         info: '7.33 pounds' },
    //         {name: 'Manufacturer',
    //         info: 'Biddeford' },
    //         {name: 'ASIN',
    //         info: 'B076B6XB8T' },
    //     ],
    //     sale: '-50%',
    //     saleAmount: '$50',
    //     images: {
    //         blue: () => import('./img/Heated_Blanket_Blue_main.jpg'),
    //         beige: () => import('./img/Heated_Blanket_Beige_main.jpg'),
    //         red: () => import('./img/Heated_Blanket_Red_main.jpg'),
    //         green: () => import('./img/Heated_Blanket_Green_main.jpg')
    //     },
    //     beige:[
    //         () => import('./img/Heated_Blanket_Beige_main.jpg'),
    //         () => import('./img/Heated_Blanket_Beige_1.jpg'),
    //         () => import('./img/Heated_Blanket_Beige_2.jpg')
    //     ],
    //     beigeThumbnail:[
    //         () => import('./img/Heated_Blanket_Beige_main_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Beige_1_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Beige_2_thumbnail.jpg')
    //     ],
    //     blue:[
    //         () => import('./img/Heated_Blanket_Blue_main.jpg'),
    //         () => import('./img/Heated_Blanket_Blue_1.jpg'),
    //         () => import('./img/Heated_Blanket_Blue_2.jpg')
    //     ],
    //     blueThumbnail:[
    //         () => import('./img/Heated_Blanket_Blue_main_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Blue_1_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Blue_2_thumbnail.jpg')
    //     ],
    //     red:[
    //         () => import('./img/Heated_Blanket_Red_main.jpg'),
    //         () => import('./img/Heated_Blanket_Red_1.jpg'),
    //         () => import('./img/Heated_Blanket_Red_2.jpg')
    //     ],
    //     redThumbnail:[
    //         () => import('./img/Heated_Blanket_Red_main_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Red_1_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Red_2_thumbnail.jpg')
    //     ],
    //     green:[
    //         () => import('./img/Heated_Blanket_Green_main.jpg'),
    //         () => import('./img/Heated_Blanket_Green_1.jpg'),
    //         () => import('./img/Heated_Blanket_Green_2.jpg')
    //     ],
    //     greenThumbnail:[
    //         () => import('./img/Heated_Blanket_Green_main_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Green_1_thumbnail.jpg'),
    //         () => import('./img/Heated_Blanket_Green_2_thumbnail.jpg')
    //     ],
    // },


    
    {
        productId: '2',
        priceNew: '$9.00',
        priceOld: '$29.00',
        title: 'Set of Pillows',
        fullTitle: 'Set of Decorative New Geometric Series Throw Pillow (4 items)',
        reviews: {
            count: 3,
            items: [{
                name: 'Helle B',
                data: 'August 25, 2017',
                rev: 'The pillow cases are totally beautiful and very soft. Fulfilled my expectations and some! Would happily buy more from this company!'
            },
            {
                name: 'Ashley Hughes',
                data: 'December 9, 2017',
                rev: 'Matches nicely in my living room. These covers spiced up my old boring couch pillows. Adorable design.'
            },
            {
                name: 'Mermaid62',
                data: 'July 5, 2017',
                rev: 'I\'m very pleased with these pillow covers. The colors are true to the picture. The fabric is soft. They are a nice addition to my screened porch decor.'
            }]
        },
        fullDescription: [
            'Made of Polyester and Polyester Blend',
            'Size: 18 x 18 inch, 45cm x 45cm',
            'Geometric Red Set of 4',
            'Machine wash in cold water, delicate cycle',
            'Hidden zipper closure.'
        ],
        detailInfo: [
            {name: 'Package Dimensions',
            info: '10.3 x 9.5 x 0.7 inches' },
            {name: 'Item Weight',
            info: '9.6 ounces' },
            {name: 'Shipping Weight',
            info: '9.6 ounces' },
            {name: 'Manufacturer',
            info: 'Phantoscope' },
            {name: 'ASIN',
            info: 'B073DQGPDJ' },
        ],
        sale: '-70%',
        saleAmount: '$20',
        images: {
            green: () => import('./img/pillows_green_main.jpg'),
            black: () => import('./img/pillows_black_main.jpg'),
            pink: () => import('./img/pillows_pink_main.jpg'),
            red: () => import('./img/pillows_red_main.jpg')},
        black:[
            () => import('./img/pillows_black_main.jpg'),
            () => import('./img/pillows_black_2.jpg'),
            () => import('./img/pillows_black_3.jpg'),
            () => import('./img/pillows_black_4.jpg')
        ],
        blackThumbnail:[
            () => import('./img/pillows_black_main_thumbnail.jpg'),
            () => import('./img/pillows_black_2_thumbnail.jpg'),
            () => import('./img/pillows_black_3_thumbnail.jpg'),
            () => import('./img/pillows_black_4_thumbnail.jpg')
        ],
        green:[
            () => import('./img/pillows_green_main.jpg'),
            () => import('./img/pillows_green_2.jpg'),
            () => import('./img/pillows_green_3.jpg'),
            () => import('./img/pillows_green_4.jpg')
        ],
        greenThumbnail:[
            () => import('./img/pillows_green_main_thumbnail.jpg'),
            () => import('./img/pillows_green_2_thumbnail.jpg'),
            () => import('./img/pillows_green_3_thumbnail.jpg'),
            () => import('./img/pillows_green_4_thumbnail.jpg')
        ],
        pink:[
            () => import('./img/pillows_pink_main.jpg'),
            () => import('./img/pillows_pink_2.jpg'),
            () => import('./img/pillows_pink_3.jpg'),
            () => import('./img/pillows_pink_4.jpg')
        ],
        pinkThumbnail:[
            () => import('./img/pillows_pink_main_thumbnail.jpg'),
            () => import('./img/pillows_pink_2_thumbnail.jpg'),
            () => import('./img/pillows_pink_3_thumbnail.jpg'),
            () => import('./img/pillows_pink_4_thumbnail.jpg')
        ],
        red:[
            () => import('./img/pillows_red_main.jpg'),
            () => import('./img/pillows_red_2.jpg'),
            () => import('./img/pillows_red_3.jpg'),
            () => import('./img/pillows_red_4.jpg')
        ],
        redThumbnail:[
            () => import('./img/pillows_red_main_thumbnail.jpg'),
            () => import('./img/pillows_red_2_thumbnail.jpg'),
            () => import('./img/pillows_red_3_thumbnail.jpg'),
            () => import('./img/pillows_red_4_thumbnail.jpg')
        ]
    }
    
]
export default items;