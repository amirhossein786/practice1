import {useState} from "react";
import {toast} from "react-toastify";

const UploadImage = ({onImagesChange}) => {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),

        }));

        const updatedImages = [...selectedImages, ...newImages];
        setSelectedImages(updatedImages);
        onImagesChange(updatedImages); // ✅ ارسال مقدار صحیح به والد
        toast.success("✅ تصویر با موفقیت آپلود شد.", {theme: "colored" , autoClose : 2000});

    };

    const removeImage = (index) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        onImagesChange(updatedImages);
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="upload-image"/>
            <label htmlFor="upload-image">
                <span className="bg-blue-500 text-white px-16 py-2 rounded cursor-pointer">
                    انتخاب تصاویر
                </span>
            </label>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={image.preview}
                            alt={`تصویر ${index + 1}`}
                            className="w-24 h-24 object-cover rounded border"/>
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2">
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadImage;
