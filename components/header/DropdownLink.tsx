import {FC} from 'react'
import Link from 'next/link'
import {Menu} from '@headlessui/react'
interface IPropsDropdown {
    title: string;
    href: string;
    handlerLogout?: () => void;
}
const DropdownLink:FC<IPropsDropdown> = ({title, href, handlerLogout}) => (
    <Menu.Item>
        <Link
            href={href}
            className='dropdown-link'
            onClick={handlerLogout}
        >{title}</Link>
    </Menu.Item>
)
export default DropdownLink
