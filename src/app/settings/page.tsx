"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Form,
    FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
	username: string;
}

export default function Settings() {
	const form = useForm({
		defaultValues: {
			username: "",
		},
	});
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data);
	};
	return (
		<main className="max-w-7xl mx-auto px-4">
			<Card className="w-full mt-4 dark:bg-dark">
				<CardHeader>
					<CardTitle>Settings</CardTitle>
				</CardHeader>
				<CardContent>
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
											<Switch />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
			</Card>
		</main>
	);
}
