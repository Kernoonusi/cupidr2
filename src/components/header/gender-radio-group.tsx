import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { GenderPreference } from "@prisma/client";

export function GenderRadioGroup({
  field,
  disabled,
}: {
  field: ControllerRenderProps<
    {
      gender: GenderPreference;
      agePref: number[];
    },
    "gender"
  >;
  disabled?: boolean;
}) {
  return (
    <>
      <label
        htmlFor={`genderMale`}
        className="flex items-center px-4 py-2 bg-white border-0 rounded-l-md shadow-sm cursor-pointer border-r-2 dark:border-dark group hover:bg-secondary has-[:checked]:bg-secondary"
      >
        <input
          disabled={disabled}
          type="radio"
          {...field}
          id={`genderMale`}
          name="gender"
          value={GenderPreference.male}
          checked={field.value === GenderPreference.male}
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
          disabled={disabled}
          type="radio"
          {...field}
          id={`genderFemale`}
          name="gender"
          value={GenderPreference.female}
          checked={field.value === GenderPreference.female}
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
          disabled={disabled}
          type="radio"
          {...field}
          id={`genderBoth`}
          name="gender"
          value={GenderPreference.both}
          checked={field.value === GenderPreference.both}
          className="sr-only peer"
        />
        <span className="text-lg font-medium text-gray-700 capitalize peer-checked:text-white group-hover:text-white">
          Both
        </span>
      </label>
    </>
  );
}
