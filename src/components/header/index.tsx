import Link from '../link'
import { Routes } from '@/constants/enums'

const Header = () => {
    return (
        <div className='container flex h-16 items-center justify-between '>
            <Link href={Routes.ROOT}> 🍕 Pizza</Link>
        </div>
    )
}

export default Header