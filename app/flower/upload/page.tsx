'use client'
import { useUploadFile } from "@/hooks/use-upload-file"

import { FileUploader } from "@/components/file-uploader"
import { UploadedFilesCard } from '../../_components/uploaded-files-card'




export default function FLowerUpload() {
    const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
        "imageUploader",
        { defaultUploadedFiles: [] }
    )

    return (
        <div className="p-10">
            <div className="space-y-6">
                <FileUploader
                    maxFileCount={10}
                    maxSize={4 * 1024 * 1024}
                    progresses={progresses}
                    onUpload={onUpload}
                    disabled={isUploading}
                />
                <UploadedFilesCard uploadedFiles={uploadedFiles} />
            </div>
        </div>

    )
}

