"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { GenderPreference } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider2thumb } from "@/components/ui/slider2thumb";
import { GenderRadioGroup } from "@/components/header/gender-radio-group";
import { PreferencesSchema } from "@/schemas";
import { setPreferences } from "@/actions/set-preferences";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Loader2 } from "lucide-react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export function PreferencesForm() {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [agePref, setAgePref] = useState(
    [user?.preferences.minAge, user?.preferences.maxAge] || [18, 50],
  );

  const form = useForm<z.infer<typeof PreferencesSchema>>({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      gender: user?.preferences.gender || GenderPreference.male,
      agePref: [user?.preferences.minAge, user?.preferences.maxAge] || [18, 50],
    },
  });

  const agePrefHandler = (value: number[]) => {
    setAgePref(value);
  };

  const onSubmit = (values: z.infer<typeof PreferencesSchema>) => {
    startTransition(() => {
      setPreferences(values).then((data) => {
        if (data?.success) {
          setSuccess(data.success);
          setError(undefined);
          update();
        }
        if (data?.error) {
          setError(data.error);
          setSuccess(undefined);
        }
      });
    });
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col justify-center px-4"
        >
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <FormLabel className="text-2xl">Gender</FormLabel>
                    <div className="flex mx-auto justify-center">
                      <GenderRadioGroup field={field} />
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
                      disabled={isPending}
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-fit px-6 mx-auto"
          >
            {isPending ? (
              <Loader2 size={24} className="transition animate-spin" />
            ) : (
              "Apply"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
