import { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useLanguageStore } from '../../stores/useLanguageStore';
import { Button } from '../ui/Button';

interface ImageCropDialogProps {
  imageUrl: string;
  onCrop: (croppedBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export function ImageCropDialog({ 
  imageUrl, 
  onCrop, 
  onCancel, 
  aspectRatio = 1 
}: ImageCropDialogProps) {
  const { language } = useLanguageStore();
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCrop = () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        onCrop(blob);
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      
      <div className="relative bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'km' ? 'កែសម្រួលរូបភាព' : 'Crop Image'}
        </h3>

        <div className="mb-6">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
            circularCrop
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop preview"
              className="max-h-[60vh] w-auto mx-auto"
            />
          </ReactCrop>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            {language === 'km' ? 'បោះបង់' : 'Cancel'}
          </Button>
          <Button
            onClick={handleCrop}
          >
            {language === 'km' ? 'កែសម្រួល' : 'Crop'}
          </Button>
        </div>
      </div>
    </div>
  );
}