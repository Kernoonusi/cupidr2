"use client";

import { Plus, XCircle } from "lucide-react";
import Image from "next/image";

const photo = [
	"/userPhotos/1.png",
	"/userPhotos/2.png",
	"/userPhotos/3.png",
	"/userPhotos/4.png",
	"/userPhotos/5.png",
	// "/userPhotos/6.png",
];
export default function PhotosGallery() {
	return (
		<>
			{photo.map((photo, index) => (
				<div key={index} className="relative">
                    <button type="button" className="absolute top-2 right-2"><p className="sr-only">delete photo</p><XCircle size={30} /></button>
					<Image
						src={photo}
						alt="user photos"
						className=" object-cover rounded-lg"
						width={360}
						height={640}
					/>
				</div>
			))}
			{photo.length < 6 && (
				<div className="flex w-full h-full rounded-lg justify-center items-center bg-slate-100 dark:bg-slate-800">
					<button type="button" className="flex flex-col">
						<p className="sr-only">Add photo</p>
						<Plus size={48} />
					</button>
				</div>
			)}
		</>
	);
}
