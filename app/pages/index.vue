<template>
  <div class="bg-[#0F0F10] flex justify-center page-container shadow-2xl relative overflow-hidden">
    <div class="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
    <div class=" w-full lg:w-1/2 min-h-14 pb-[2vh] mx-8 shadow-accent content-end">
      <Form class="w-full" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="user-input">
          <FormItem>
            <FormControl>
              <Textarea class="resize-none min-h-[10vh] max-h-[25vh] textarea-class" v-bind="componentField" @update:modelValue="()=>{}" placeholder="Type your message here." />
            </FormControl>
          </FormItem>
        </FormField>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Textarea } from '@/components/ui/textarea'
import {
  FormControl,
  FormField,
  FormItem,
  Form
} from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
const formSchema = toTypedSchema(z.object({
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
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
  background-color: #2D0B0E;
}

</style>