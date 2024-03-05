"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Gender } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IFormInput {
	description: string;
}

export default function AboutYou() {
	const form = useForm({
		defaultValues: {
			description: "",
			gender: Gender.male,
		},
	});
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea className="resize-none" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="gender"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Gender</FormLabel>
							<FormControl>
								<RadioGroup defaultValue="maleGender">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="maleGender" id="maleGender" />
										<Label htmlFor="maleGender">Male</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="femaleGender" id="femaleGender" />
										<Label htmlFor="femaleGender">Female</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Apply</Button>
			</form>
		</Form>
	);
}
