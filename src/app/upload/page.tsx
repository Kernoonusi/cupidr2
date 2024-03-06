"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { upload } from "@/actions/upload";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { deleteImage } from "@/actions/delete-image";

const UploadPage = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UploadSchema>>({
    resolver: zodResolver(UploadSchema),
  });

  const onClick = (path: string) => {
    deleteImage(path).then(() => update());
  };

  const onSubmit = (values: z.infer<typeof UploadSchema>) => {
    form.reset();
    const formData = new FormData();
    Array.from(values.images).forEach((file, index) => {
      formData.append(`image`, file);
    });

    startTransition(() => {
      upload(formData).then((data) => {
        if (data.success) {
          setSuccess(data.success);
          setError(undefined);
          update();
        }
        if (data.error) {
          setError(data.error);
          setSuccess(undefined);
        }
      });
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Upload images</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    {/* File Upload */}
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple={true}
                        disabled={form.formState.isSubmitting}
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
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              variant="default"
              className="flex w-full flex-row items-center gap-2"
              size="lg"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <div>
        {user &&
          user.images.map((image) => (
            <>
              <Image
                alt="image"
                width={200}
                height={200}
                key={image.path}
                src={image.url}
              />
              <Button onClick={() => onClick(image.path)}>Delete image</Button>
            </>
          ))}
      </div>
    </Card>
  );
};

export default UploadPage;
