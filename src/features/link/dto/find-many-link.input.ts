import Joi from "joi";
import { BaseQueryInput } from "src/dto/base-query.input";

export type FindManyLinkInput = BaseQueryInput;

export const findManyLinkInputSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
  keyword: Joi.string().trim(),
});
