"use client";

import { usePathname } from "next/navigation";
import LinkButton from "../shared/linkButton";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { Gender } from "../shared/enums";
import RadioButton from "../shared/radioButton";
import { Slider2thumb } from "../ui/slider2thumb";
import { useState } from "react";

const titles: Map<string, string> = new Map([
	["/", "Cupidr"],
	["chat", "Chat"],
	["account", "Account"],
	["settings", "Settings"],
]);

interface IFormInput {
	gender: Gender;
	agePref: number[];
}

export default function HeaderTitle() {
	const pathname = usePathname()?.split("/")[1];
	const currentPageTitle = titles.get(pathname || "/") || "Cupidr";
	const [agePref, setAgePref] = useState([18, 50]);

	const form = useForm({
		defaultValues: {
			gender: Gender.male,
			agePref: [18, 50],
		},
	});

	const agePrefHandler = (value: number[]) => {
		setAgePref(value);
	};

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
	};

	return (
		<section className="px-4 py-2 w-full h-12 flex justify-between items-center">
			<h1 className="text-3xl font-bold">{currentPageTitle}</h1>
			{currentPageTitle === "Account" && (
				<LinkButton href="/settings" passHref>
					<span className="material-symbols-outlined text-3xl">settings</span>
				</LinkButton>
			)}
			{currentPageTitle === "Chat" && (
				<Drawer>
					<DrawerTrigger className="flex items-center">
						<span className="material-symbols-outlined text-3xl">tune</span>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle className="text-3xl">Filters</DrawerTitle>
						</DrawerHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8 flex flex-col justify-center px-4">
								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="flex flex-col gap-4">
													<FormLabel className="text-2xl">Gender</FormLabel>
													<div className="flex mx-auto justify-center">
														<RadioButton field={field} gender={Gender.male} />
														<RadioButton field={field} gender={Gender.female} />
														<RadioButton field={field} gender={Gender.both} />
													</div>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="agePref"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="grid grid-cols-2 gap-4">
													<FormLabel className="text-2xl">Age Range</FormLabel>
													<p className="self-center text-center">{`${agePref[0]} - ${agePref[1]}`}</p>
													<Slider2thumb
														className="w-11/12 mx-auto col-span-2"
														onValueChange={(e) => {
															field.onChange(e), agePrefHandler(e);
														}}
														value={field.value}
														min={18}
														max={99}
														step={1}
													/>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-fit px-6 mx-auto">
									Apply
								</Button>
								<br />
							</form>
						</Form>
					</DrawerContent>
				</Drawer>
			)}
		</section>
	);
}
