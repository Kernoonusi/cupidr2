import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Gender } from "@prisma/client";

export function GenderRadioGroup({
  field,
}: {
  field: ControllerRenderProps<
    {
      gender: "male" | "female" | "both";
      agePref: number[];
    },
    "gender"
  >;
}) {
  return (
    <>
      <label
        htmlFor={`genderMale`}
        className="flex items-center px-4 py-2 bg-white border-0 rounded-l-md shadow-sm cursor-pointer border-r-2 dark:border-dark group hover:bg-secondary has-[:checked]:bg-secondary"
      >
        <input
          type="radio"
          {...field}
          id={`genderMale`}
          name="gender"
          value={Gender.male}
          checked={field.value === Gender.male}
          className="sr-only peer"
        />
        <span className="text-lg font-medium text-gray-700 capitalize peer-checked:text-white group-hover:text-white">
          Male
        </span>
      </label>

      <label
        htmlFor={`genderFemale`}
        className="flex items-center px-4 py-2 bg-white border-0 shadow-sm cursor-pointer group border-r-2 dark:border-dark hover:bg-secondary has-[:checked]:bg-secondary"
      >
        <input
          type="radio"
          {...field}
          id={`genderFemale`}
          name="gender"
          value={Gender.female}
          checked={field.value === Gender.female}
          className="sr-only peer"
        />
        <span className="text-lg font-medium text-gray-700 capitalize peer-checked:text-white group-hover:text-white">
          Female
        </span>
      </label>

      <label
        htmlFor={`genderBoth`}
        className="flex items-center px-4 py-2 bg-white border-0 rounded-r-md shadow-sm cursor-pointer group hover:bg-secondary has-[:checked]:bg-secondary"
      >
        <input
          type="radio"
          {...field}
          id={`genderBoth`}
          name="gender"
          value={Gender.both}
          checked={field.value === Gender.both}
          className="sr-only peer"
        />
        <span className="text-lg font-medium text-gray-700 capitalize peer-checked:text-white group-hover:text-white">
          Both
        </span>
      </label>
    </>
  );
}
