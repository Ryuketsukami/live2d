<template>
  <div
    class="bg-[#0F0F10] flex justify-center page-container shadow-2xl relative overflow-hidden"
  >
    <div
      class="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"
    ></div>
    <div
      class="w-full lg:w-1/2 min-h-14 pb-[2vh] mx-8 shadow-accent content-end"
    >
      <form class="w-full" @keydown.enter.exact.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="userInput">
          <FormItem>
            <FormControl>
              <Textarea
                class="resize-none min-h-[10vh] max-h-[25vh] textarea-class"
                v-bind="componentField"
                placeholder="Type your message here."
              />
            </FormControl>
          </FormItem>
        </FormField>
        <button class="hidden" type="submit">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
const formSchema = toTypedSchema(
  z.object({
    userInput: z
      .string()
      .min(1, {
        message: "Input must be at least 1 character",
      })
      .max(1000, {
        message: "Input must not be longer than 1000 characters.",
      }),
  })
);

const { handleSubmit, submitForm, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(
  (values) => {
    console.log(values);
    resetForm();
  },
  (errors) => {
    console.error(errors);
  }
);
</script>

<style>
.page-container {
  /* min-height: calc(30vh - 80px); */
  min-height: 30vh;
}

@media only screen and (max-width: 1024px) {
  .page-container {
    min-height: 30vh;
  }
}

.textarea-class {
  background-color: #2d0b0e;
}
</style>
