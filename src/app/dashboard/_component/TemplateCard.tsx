import React from 'react'
import type { TEMPLATE as TemplateType } from '@/types/templates'
import Image from 'next/image'
import Link from 'next/link'

function TemplateCard(item: TemplateType) {
  return (
    <Link href={'/dashboard/content/' + item?.slug}>
      <div className="p-5 shadow-md bg-white rounded-md border flex-col  gap-3 cursor-pointer hover:scale-105 transition-all h-full">
        <Image src={item.icon} alt="icon" width={50} height={50} />
        <h2 className="font-medium text-lg">{item.name}</h2>
        <p className="text-gray-500 line-clamp-3 ">{item.desc}</p>
      </div>
    </Link>
  )
}

export default TemplateCard