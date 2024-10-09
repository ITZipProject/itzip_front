import Image from 'next/image';
import React, { useRef } from 'react';

interface ImageUploadButtonProps {
  onImageUpload: (imageUrls: string[]) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void processFiles(event.target.files);
  };

  const processFiles = async (files: FileList | null) => {
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadImage(files[i]);
        uploadedUrls.push(url);
      } catch (error) {
        console.error('Image upload failed:', error);
        uploadedUrls.push('![이미지 업로드 실패](서버와_연결이_안되었습니다)');
      }
    }

    onImageUpload(uploadedUrls);
  };

  const uploadImage = async (file: File): Promise<string> => {
    // 서버 업로드 하는 부분 만들어야 함...
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://example.com/images/${file.name}`);
      }, 1000);
    });
  };

  return (
    <div>
      <button
        className="bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded px-0.5"
        onClick={handleClick}
      >
        <Image src="/icons/blog/whiteMode_Image.png" alt="Upload Image" width={20} height={20} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadButton;
