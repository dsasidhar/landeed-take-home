import { z } from "zod";

const FormQuestionBaseSchema = z.object({
  label: z.string(),
  id: z.number(),
  validations: z.object({
    required: z.boolean(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    regEx: z.string().optional(),
  }),
});

export type IFormQuestionBase = z.infer<typeof FormQuestionBaseSchema>;

const FormQuestionTextSchema = FormQuestionBaseSchema.extend({
  type: z.literal("text"),
});

export type IFormQuestionText = z.infer<typeof FormQuestionTextSchema>;

const FormQuestionMultiSchema = FormQuestionBaseSchema.extend({
  type: z.literal("multi-select"),
  options: z.array(
    z.object({
      label: z.string(),
      id: z.string(),
    })
  ),
  allowCustomInput: z.boolean().optional(),
});

export type IFormQuestionMulti = z.infer<typeof FormQuestionMultiSchema>;

const FormQuestionSchema = z.union([
  FormQuestionTextSchema,
  FormQuestionMultiSchema,
]);

export type IFormQuestion = z.infer<typeof FormQuestionSchema>;

const FormPageSchema = z.object({
  title: z.string(),
  id: z.number(),
  questions: z.array(FormQuestionSchema),
});

export type IFormPage = z.infer<typeof FormPageSchema>;

export const FormConfigSchema = z.object({
  pages: z.array(FormPageSchema),
  timeout: z.number(),
});

export type IFormConfig = z.infer<typeof FormConfigSchema>;
