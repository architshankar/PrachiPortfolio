import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";
import { Upload, X, Check } from "lucide-react";

// Don't forget to import the library's mandatory CSS styles!
import "react-image-crop/dist/ReactCrop.css";

// Helper function to center the initial crop tool box on the image
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

interface ImageUploaderProps {
  onImageCropped: (file: File) => void;
}

export function ImageUploaderWithCrop({ onImageCropped }: ImageUploaderProps) {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const ASPECT_RATIO = 16 / 11; // Matches your PostCard aspect-[16/11]

  // Handle file selection
  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Reset crop box
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
        setIsModalOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // Automatically scope the crop when the image loads in the modal
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, ASPECT_RATIO));
  }

  // Generate the actual cropped image file from the canvas coordinates
  async function generateCroppedFile() {
    if (!imgRef.current || !completedCrop) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

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

    // Convert canvas to a real File object ready for backend upload
    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedFile = new File([blob], "cropped-cover.jpg", { type: "image/jpeg" });
      
      // Update local preview state
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(croppedFile));
      
      // Send final file back up to your parent Essay Form component
      onImageCropped(croppedFile);
      setIsModalOpen(false);
    }, "image/jpeg");
  }

  return (
    <div className="w-full space-y-4">
      <label className="block text-sm font-medium text-navy/80">Essay Cover Photo (16:11 Ratio)</label>
      
      {/* Upload Zone & Preview Card */}
      <div className="flex items-center gap-4">
        {!previewUrl ? (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-muted hover:border-gold rounded-lg cursor-pointer bg-cream/50 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-gray-500">Click to upload essay cover photo</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
          </label>
        ) : (
          <div className="relative w-64 aspect-[16/11] rounded-lg overflow-hidden border border-muted">
            <img src={previewUrl} alt="Cropped Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Cropping Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 flex flex-col max-h-[90vh]">
            <h3 className="text-lg font-bold mb-2">Adjust Cover Image Layout</h3>
            <p className="text-xs text-gray-500 mb-4">Drag and resize the frame to choose how your photo appears on the blog feed.</p>
            
            {/* Cropping Workspace */}
            <div className="flex-1 overflow-auto bg-gray-100 p-4 rounded-lg flex items-center justify-center max-h-[50vh]">
              {imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={ASPECT_RATIO}
                  keepSelection
                >
                  <img
                    ref={imgRef}
                    alt="Crop workspace"
                    src={imgSrc}
                    onLoad={onImageLoad}
                    className="max-w-full max-h-[45vh] object-contain"
                  />
                </ReactCrop>
              )}
            </div>

            {/* Modal Controls */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={generateCroppedFile}
                className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-opacity-90 bg-slate-900"
              >
                <Check size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}