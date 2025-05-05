import React from 'react'
import { Link, useResolvedPath } from 'react-router-dom'
import { BookA, FlaskConical } from 'lucide-react'

import ThemeSelector from './ThemeSelector'

const NavBar = () => {

    const { pathname } = useResolvedPath();
    const isHomePage = pathname === '/';

    return (
        <div className='bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto'>
                <div className='navbar px-4 min-h-[4rem] justify-between'>

                    <div className="flex-1 lg:flex-none">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="flex items-center gap-2">
                                <BookA className="size-9 text-primary" />
                                <span
                                    className="font-semibold font-mono tracking-widest text-2xl 
                                    bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                                >
                                    Ammaar Zaki Portfolio Website
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className='flex items-center gap-4'>

                        <ThemeSelector />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBar