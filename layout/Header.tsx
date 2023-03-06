import Link from "next/link"
import {useRouter} from 'next/router'
import {useAppSelector} from '../static/store'
import {selectCartInfo} from '../static/store/cart-slice'
import {useEffect, useState} from 'react'

const Header = () => {
    const router = useRouter()
    const {quantityAllItems} = useAppSelector(store => selectCartInfo(store))
    const [itemsLength, setItemsLength] = useState(0)

    useEffect(() => {setItemsLength(quantityAllItems)
    }, [quantityAllItems])

    return(
        <header>
            <nav className='shadow-md'>
                <ul className='flex justify-between items-center h-12 px-4'>
                    <li><Link href='/' className='text-lg font-bold'>myStore</Link></li>

                    <ul className='flex'>
                        {!router.pathname.endsWith('cart') &&
                            <li>
                                <Link href='/cart' className='mr-1 p-2 relative'>
                                    Cart {itemsLength > 0 && (
                                    <span
                                        className='flex justify-center items-center text-xs font-bold text-white rounded-full absolute'
                                        style={{top: '-5px', right: '-10px', zIndex: -1, width: '25px', height: '25px', backgroundColor: 'coral'}}
                                    >{itemsLength}</span>
                                )}
                                </Link>
                            </li>
                        }

                        {!router.pathname.endsWith('login') &&
                            <li><Link href='/login' className='p-2'>Login</Link></li>
                        }
                    </ul>
                </ul>
            </nav>
        </header>
    )
}

export default Header

