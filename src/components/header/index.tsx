import Link from '../link'
import { Routes } from '@/constants/enums'
import Navbar from './Navbar'

const Header = () => {
    return (
        // <div className='container flex h-16 items-center justify-between '>
        <header className='py-4 md:py-6 flex justify-center'>
            <div className='container flex items-center gap-6 lg:gap-10 justify-between'>
                <Link href={Routes.ROOT} className='text-2xl font-bold'> 🍕 Pizza</Link>
                <Navbar />
            </div>
        </header>
    )
}

export default Header