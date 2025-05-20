import React, { useEffect, useState } from 'react'
import Template from '@/app/(data)/Template'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
  name: string,
  desc: string,
  category: string,
  icon: string,
  aiPrompt: string,
  slug: string,
  form?: Form[]
}

export interface Form {
  label: string,
  field: string,
  name: string,
  required?: boolean
}

function TemplateListsSection({userSearchInput}:any) {
 
  const[templateList,setTemplateList]=useState(Template)
  useEffect(()=>{
    if(userSearchInput){
      const filterData =Template.filter(item=>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData)
    }else{
      setTemplateList(Template)
    }
  },[userSearchInput])

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 gap-5 p-10 '>
      {templateList.map((item: TEMPLATE, index: number) => (
     <TemplateCard key ={index} {...item}/>
      ))}
    </div>
  )
}

export default TemplateListsSection
