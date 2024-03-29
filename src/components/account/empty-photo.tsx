"use client";
import * as z from "zod";
import { MutableRefObject, useRef, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { AlertTriangle, Check, Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { UploadSchema } from "@/schemas";
import { upload } from "@/actions/upload";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function EmptyPhoto({ i = 0 }: { i: number }) {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UploadSchema>>({
    resolver: zodResolver(UploadSchema),
  });

  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);

  const onSubmit = (values: z.infer<typeof UploadSchema>) => {
    form.reset();
    const formData = new FormData();
    Array.from(values.images).forEach((file, index) => {
      formData.append(`image`, file);
    });

    startTransition(() => {
      upload(formData).then((data) => {
        if (data?.success) {
          setSuccess(data.success);
          setError(undefined);
          update();
          setTimeout(() => {
            setSuccess(undefined);
          }, 1500);
        }
        if (data?.error) {
          setError(data.error);
          setSuccess(undefined);
        }
      });
    });
  };

  return (
    <div
      key={`empty-photo-${i}`}
      className="flex min-w-[100px] w-full rounded-lg justify-center aspect-[3/4] items-center bg-slate-100 border border-dashed dark:bg-slate-800 md:min-w-[200px] lg:min-w-[300px]"
    >
      <button type="button" className="flex flex-col">
        <p className="sr-only">upload photo</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => {
                // Get current images value (always watched updated)
                const { onChange, value, ...rest } = field;
                const images = form.watch("images");

                return (
                  <FormItem className="flex flex-col justify-center items-center">
                    {/* File Upload */}
                    <FormControl>
                      <div className="grow">
                        <label htmlFor="images">
                          {isPending ? (
                            <Loader2
                              size={48}
                              className="transition animate-spin"
                            />
                          ) : success ? (
                            <Check
                              size={48}
                              className="transition text-secondary"
                            />
                          ) : error ? (
                            <AlertTriangle
                              size={48}
                              className="transition text-primary"
                            />
                          ) : (
                            <Plus
                              size={48}
                              className="transition cursor-pointer hover:scale-125"
                            />
                          )}
                        </label>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple={true}
                          disabled={isPending}
                          className="hidden"
                          id="images"
                          {...rest}
                          onChange={(event) => {
                            // Triggered when user uploaded a new file
                            // FileList is immutable, so we need to create a new one
                            const dataTransfer = new DataTransfer();

                            // Add old images
                            if (images) {
                              Array.from(images).forEach((image) =>
                                dataTransfer.items.add(image),
                              );
                            }

                            // Add newly uploaded images
                            Array.from(event.target.files!).forEach((image) =>
                              dataTransfer.items.add(image),
                            );

                            // Validate and update uploaded file
                            const newFiles = dataTransfer.files;
                            onChange(newFiles);

                            formRef.current?.requestSubmit();
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </form>
        </Form>
      </button>
    </div>
  );
}
