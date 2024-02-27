import React from "react";
import { Gender } from "./enums";
import styles from "./styles.module.css";

export default function RadioButton({ field, gender }: { field: any; gender: Gender }) {
	return (
		<label
			htmlFor={`gender${gender}`}
			className={"flex items-center px-4 py-2 bg-white border-0 rounded-md shadow-sm cursor-pointer " + styles.radioButton}>
			<input type="radio" {...field} id={`gender${gender}`} name="gender" value={gender} className="sr-only" />
			<span className="text-sm font-medium text-gray-700">{gender}</span>
		</label>
	);
}
