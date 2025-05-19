import React from 'react'
import SideNav from './_component/SideNav';
import Header from './_component/Header';
function layout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className='md:w-64 hidden md:block fixed'>
        <SideNav/>
      </div>
      <div className='md:ml-64'>
        <Header/>
          {children}
      </div>

    </div>
  )
}

export default layout
