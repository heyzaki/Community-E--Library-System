import React, { useState } from "react";

const ImageUploader = ({ onChange }) => {
	const [previewImage, setPreviewImage] = useState(null);

	const handleSelectImage = (event) => {
		const file = event.target.files[0];
		onChange?.(file);
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<label htmlFor="bookCoverImage">Upload Book Cover Image (Required)</label>
			<input
				type="file"
				id="bookCoverImage"
				onChange={handleSelectImage}
				required
				accept="image/*"
			/>
			{previewImage && (
				<img
					src={previewImage}
					alt="Preview"
					style={{ width: "100px", height: "100px" }}
				/>
			)}
		</div>
	);
};

export default ImageUploader;
