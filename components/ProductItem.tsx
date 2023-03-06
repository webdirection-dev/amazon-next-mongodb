import {FC} from 'react'
import Link from 'next/link'
import {IProduct} from '../static/types/types-app'
import {useAppDispatch} from '../static/store'
import {addProductToCart} from '../static/store/cart-slice'

const ProductItem: FC<{item: IProduct}> = ({item}) => {
    const dispatch = useAppDispatch()

    return(
        <div className="card">
            <Link
                href={{
                    pathname: '/product/[id]',
                    query: {...item},
                }}
                as={'/product/'+item.slug}
            >
                <img src={item.image} alt={item.name} className='rounded shadow bg-gray-100' style={{minHeight: '362px'}}/>
            </Link>

            <div className="flex flex-col justify-center items-center p-5">
                <Link
                    href={{
                        pathname: '/product/[id]',
                        query: {...item},
                    }}
                    as={'/product/'+item.slug}
                >
                    <h2 className="text-lg">{item.name}</h2>
                </Link>

                <p className='mb-2'>{item.brand}</p>
                <p>${item.price}</p>
                <button className='primary-button' type='button' onClick={() => dispatch(addProductToCart(item))}>Add to cart</button>
            </div>
        </div>
    )
}
export default ProductItem
