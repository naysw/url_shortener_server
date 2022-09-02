import Joi from "joi";
import { BaseQueryInput } from "src/dto/base-query.input";

export type FindManyUrlInput = BaseQueryInput;

export const findManyUrlInputSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});
