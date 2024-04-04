import {
  FormConfigSchema,
  staticQuestions,
  validate,
} from "dynamic-survey-common";
import express, { Application, Request, Response } from "express";

import { storeInput } from "./db";
import dynamicForms from "./dynamicForm.json";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// make sure the forms are of the correct type
const formConfig = FormConfigSchema.parse({
  pages: [...staticQuestions.pages, ...dynamicForms.pages],
  timeout: staticQuestions.timeout,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/dynamic-forms", (req: Request, res: Response) => {
  res.json(dynamicForms);
});
app.post("/data", (req: Request, res: Response) => {
  console.log(req.body);
  const submittedData = req.body;

  const isValidInput = formConfig.pages.every((page) => {
    return page.questions.every(
      (question) =>
        validate(submittedData[question.id], question.validations) === undefined
    );
  });

  if (!isValidInput) {
    res.status(400).json({
      message: "Invalid input",
    });
    return;
  }

  storeInput(submittedData);
  res.json({
    message: "Data received successfully",
    yourData: submittedData,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
