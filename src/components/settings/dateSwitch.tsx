"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Switch } from "../ui/switch";

interface IFormInput {
	username: string;
}

export default function DateSwitch() {
    const form = useForm({
		defaultValues: {
			username: "",
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
					name="username"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between">
							<div>
								<FormLabel>Ready for dating</FormLabel>
								<FormDescription>
									If you are ready for dating, you can see others and they too will see you
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									className="data-[state=checked]:bg-secondary dark:data-[state=checked]:bg-secondary data-[state=unchecked]:bg-zinc-600 dark:data-[state=unchecked]:bg-zinc-600"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
