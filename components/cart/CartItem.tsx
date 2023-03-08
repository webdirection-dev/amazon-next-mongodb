import React, {FC} from "react"
import {useAppDispatch} from '../../static/store'
import {managerQuantityThisItem, removeProductFromCart} from '../../static/store/cart-slice'
import Link from 'next/link'
import Image from 'next/image'
import {IProduct} from '../../static/types/types-app'
import {XCircleIcon, MinusIcon, PlusIcon} from '@heroicons/react/outline'

const CartItem: FC<{item: IProduct}> = ({item}) => {
    const dispatch = useAppDispatch()

    return(
        <tr className='border-b'>
            <td>
                <Link
                    className='flex items-center'
                    as={'/product/'+item.slug}
                    href={ {pathname: '/product/[id]', query: {...item}} }
                >
                    <Image src={item.image} alt={item.name} width={50} height={50}/>
                    &nbsp;
                    {item.name}
                </Link>
            </td>

            <td className='flex items-center justify-center p-5'>
                <MinusIcon
                    className='btn'
                    style={{width: '17px', height: '17px'}}
                    onClick={() => dispatch( managerQuantityThisItem({localId: item.localId, act: 'dec'}) )}
                />

                <span style={{color: 'rgb(37 99 235)', margin: '0 10px'}}>{item.quantityThisProduct}</span>

                <PlusIcon
                    className='btn'
                    style={{width: '17px', height: '17px'}}
                    onClick={() => dispatch( managerQuantityThisItem({localId: item.localId, act: 'inc'}) )}
                />
            </td>

            <td className='p-5 text-center' style={{textAlign: 'center'}}>${item.price}</td>

            <td className='p-5 text-center' style={{textAlign: 'center'}}>
                <button onClick={() => dispatch(removeProductFromCart(item))}>
                    <XCircleIcon style={{width: '25px', height: '25px', color: 'coral'}}/>
                </button>
            </td>
        </tr>
    )
}
export default CartItem
