import React from "react";
import { Gender } from "./enums";
import "./radioButton.css";

export default function RadioButton({ field, gender }: { field: any; gender: Gender }) {
	return (
		<label
			htmlFor={`gender${gender}`}
			className="flex items-center px-4 py-2 bg-white border-0 rounded-l-md shadow-sm cursor-pointer radioButton">
			<input
				type="radio"
				{...field}
				id={`gender${gender}`}
				name="gender"
				value={gender}
				checked={field.value === gender}
				className="sr-only"
			/>
			<span className="text-lg font-medium text-gray-700 capitalize">{gender}</span>
		</label>
	);
}
