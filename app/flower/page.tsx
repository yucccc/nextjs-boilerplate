import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

import ZoomableImage from "@/components/zoomable-image"

export default function FLower() {
    return <div className="p-10">

        <Input placeholder="搜索菲林" />
        <div className="py-10">
            <div className="w-[200px]">
                <ZoomableImage
                    src="https://www.nico.fyi/_next/image?url=%2Fstatic%2Fimages%2Farticles%2Fgohan-miso-kare-udon2.jpeg&w=3840&q=75"></ZoomableImage>
            </div>
        </div>
        <Button>
            <Link href="/flower/upload">上传菲林</Link>
        </Button>

    </div>
}