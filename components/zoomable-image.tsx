import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

export default function ZoomableImage({
  src,
  alt,
  className,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) return null
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt || ''}
          sizes="100vw"
          className={className}
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={500}
          height={100}
        />
      </DialogTrigger>
      <DialogContent >
        <DialogTitle>{'图片名称'}</DialogTitle>
        <DialogDescription>创建时间：2024年08月06日21:55:43 创建人：xxx</DialogDescription>
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md  ">
          <Image src={src} fill alt={alt || ''} className="h-full w-full object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
