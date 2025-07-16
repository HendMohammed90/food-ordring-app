import Link from '../link'
import { Routes } from '@/constants/enums'
import Navbar from './Navbar'

const Header = () => {
    return (
        // <div className='container flex h-16 items-center justify-between '>
        <header className='py-4 md:py-6'>
            <div className='container flex items-center justify-between'>
                <Link href={Routes.ROOT}> 🍕 Pizza</Link>
                <Navbar />
            </div>
        </header>
    )
}

export default Header