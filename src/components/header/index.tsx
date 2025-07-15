import React from 'react'
import Link from '../link'

const Header = () => {
    return (
        <div className='container flex h-16 items-center justify-between '>
            <Link href={'/'}>Pizza</Link>
        </div>
    )
}

export default Header