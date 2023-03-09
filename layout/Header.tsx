import Link from "next/link"
import {Menu} from '@headlessui/react'
import DropdownLink from '../components/header/DropdownLink'
import {useHeader} from '../components/header/use-header'

const Header = () => {
    const {itemsLength, session, checkPathname, handlerLogout} = useHeader()

    return(
        <header>
            <nav className='shadow-md'>
                <ul className='flex justify-between items-center h-12 px-4'>
                    <li><Link href='/' className='text-lg font-bold'>myStore</Link></li>

                    <ul className='flex'>
                        {!checkPathname('cart') &&
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

                        {!checkPathname('login') &&
                            <li>
                                {session?.user ?
                                    <Menu as='div' className='relative inline-block'>
                                        <Menu.Button className='text-blue-600'>{session?.user.name}</Menu.Button>
                                        <Menu.Items className='absolute right-0 w-56 bg-white origin-top-right shadow-lg'>
                                            <DropdownLink href='/profile' title='Profile' />
                                            <DropdownLink href='/order-history' title='Order History' />
                                            <DropdownLink href='#' title='Logout' handlerLogout={handlerLogout}/>
                                        </Menu.Items>
                                    </Menu>
                                : <Link href='/login' className='p-2'>Login</Link>
                                }
                            </li>
                        }
                    </ul>
                </ul>
            </nav>
        </header>
    )
}
export default Header
