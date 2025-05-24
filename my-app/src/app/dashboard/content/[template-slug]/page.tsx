"use client"
import React from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import {TEMPLATE} from '../../_component/TemplateListsSection'
import Template from '@/app/(data)/Template'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


interface PROPS{
  params:{
    'template-slug':string
  }
}
function createNewContent(props:PROPS) {
 const selectedTemplate:TEMPLATE|undefined=Template?.find((item)=>item.slug===props.params['template-slug'])

 const GenerateAIContent=(FormData:any)=>{

 }

  return (
    <div className='p-10'>
      <Link href={'/dashboard'}>
     <Button><ArrowLeft/> Back</Button>
     </Link>
    <div className=' grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
      {/*FormSection*/}
           <FormSection selectedTemplate={selectedTemplate}
           userFormInput={(v:any)=>console.log(v)}/>
      {/*OutputSection*/}
      <div className='col-span-2'>
      <OutputSection/>
      </div>
    </div>
</div>
  )
}

export default createNewContent
