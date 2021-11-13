const button_styles = {
    "background-color": "black",
    ":hover": {
        "background-color": "white",
        "color": "black"
    },
    "border": "1px solid black"
} 

function createCart(){
    ui.createComponent('cart', {
        node: document.getElementById('toggle2')
    })
}


function createUIComponent(id){
    ui.createComponent('collection', {
        id: id,
        node: document.getElementById(id),
        toggles: [
            {
                node: document.getElementById('toggle2'),
            }
        ],
        options: {
            productSet: {
                iframe: true,
                contents: {
                    pagination: false,
                },
                templates: {
                    products: '<div class="{{data.classes.productSet.products}}"></div>',
                },
                styles: {
                    products: {
                        display: 'flex',
                        "flex-direction": 'column',
                        "justify-content": 'space-around',
                        "align-items": 'center',
                        "@media (max-width: 600px)": {
                            "flex-direction": 'column'
                        }
                    }
                }
            },
            product: {
                buttonDestination: 'modal',
                isButton: true,
                contents: {
                    button: false
                },
                styles: {
                    product: {
                        width: 'auto',
                    },
                    title: {
                        "color": "white",
                    },
                    price: {
                        "color": "white",
                    },
                    compareAt: {
                        "color": "white",
                    },
                    img: {
                        height: '300px',
                        "min-width": '300px'
                    },
                    button: button_styles,
                }
            },
            cart: {
                startOpen: false,
                contents: {
                    note: true
                },
                styles: {
                    button: button_styles,
                    close: {
                        outline: 'none',
                        border: 'none'
                    }
                }
            },
            modal: {
                styles: {
                    close: {
                        outline: 'none',
                        border: 'none'
                    },
                    overlay: {
                        "background-color": "black",
                        "transition": "background-color 200ms ease"
                    }
                }
            },
            modalProduct: {
                contents: {
                    imgWithCarousel: true,
                    img: false,
                },
            },
            toggle: {
                iframe: true,
                sticky: false,
                templates: {
                    count: '<div class="{{data.classes.toggle.count}}" data-element="toggle.count">{{# data.count > 0}}<span>{{data.count}}</span>{{/ data.count > 0}}</div>',
                },
                contents: {
                    count: true,
                    icon: true,
                },
                order: ['icon', 'count'],
                styles: {
                    toggle: {
                        "background-color": "transparent",
                        ":hover": {
                            "background-color": 'white'
                        },
                        "height": 'auto'
                    },
                    iconPath: {
                        "fill": "white",
                    },
                    count: {
                        "margin-top": "8px",
                        "margin-left": "4px"
                    }
                }
            }
        }
    });
}

function parseId(id){
    return atob(id).split("/")[4];
}

function createCollectionDivs(col){
    console.log(col)
        $("#collectionList").append(`<div class="collection-details-outer" id="${col.handle}">
                                        <div class="collection-details">
                                            <h2 class="collection_title">${col.title}</h2>
                                            <img class="collection_image" src="${col.image ? col.image.src : ''}" alt="${col.title} product collection image" width="200" height="200"/>
                                        </div>
                                        <div class="product-set-wrap" id="${parseId(col.id)}"></div>
                                    </div>`);
}

function createCollections(col){
    col.filter(c => c.handle !== 'frontpage').forEach(c => { 
        let shortId = parseId(c.id)
        
        $("#collectionList").append(createCollectionDivs(c));

        createUIComponent(shortId);
        
    });

    
}

client.collection.fetchAll().then((collections) => {
    createCollections(collections);
});