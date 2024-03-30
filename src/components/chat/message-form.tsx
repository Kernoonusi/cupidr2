import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { ChangeEventHandler } from "react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageFormProps {
  form: UseFormReturn<{ message: string }, any, { message: string }>;
  onSubmit: SubmitHandler<{ message: string }>;
  handleTyping: ChangeEventHandler<HTMLInputElement>;
}

export const MessageForm = ({
  form,
  onSubmit,
  handleTyping,
}: MessageFormProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between gap-x-2 dark:bg-dark"
      >
        <FormField
          control={form.control}
          name="message"
          rules={{
            required: "Type a message",
          }}
          render={({ field }) => {
            const { onChange, ...rest } = field;
            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="bg-gray-100 shadow-md dark:bg-slate-800"
                    type="text"
                    placeholder="Type a message"
                    autoComplete="off"
                    onChange={(e) => {
                      onChange(e);
                      handleTyping(e);
                    }}
                    {...rest}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="bg-primary shadow-md dark:bg-primary">
          <SendHorizontal size={24} />
        </Button>
      </form>
    </Form>
  );
};
