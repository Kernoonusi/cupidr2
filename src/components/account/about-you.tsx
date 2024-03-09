"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Gender } from "@prisma/client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Cities } from "@/constants";
import { ProfileSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function AboutYou() {
  const user = useCurrentUser();
  const cities = Object.entries(Cities);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      bio: user?.bio || undefined,
      gender: user?.gender || Gender.male,
      location: (user?.location as Cities) || undefined,
      age: user?.age || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ProfileSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex gap-4 items-center">
              <FormLabel className="w-20">Bio</FormLabel>
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
            <FormItem className="flex gap-4 items-center">
              <FormLabel className="w-20">Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  className="flex gap-4 items-center"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      {...field}
                      value={Gender.male}
                      id="maleGender"
                    />
                    <Label htmlFor="maleGender">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      {...field}
                      value={Gender.female}
                      id="femaleGender"
                    />
                    <Label htmlFor="femaleGender">Female</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex gap-4 items-center">
              <FormLabel className="w-20">Location</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city[0]} value={city[1]}>
                        {city[1]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="flex gap-4 items-center ">
              <FormLabel className="w-20">Age</FormLabel>
              <FormControl>
                <Input
                  placeholder="Min age is 18"
                  type="number"
                  min={18}
                  max={99}
                  {...field}
                />
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
