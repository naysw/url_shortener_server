import Joi from "joi";
import { BaseQueryInput } from "../../../dto/base-query.input";
import { allowedOrderBy } from "../../../utils/customValidation";

export type FindManyLinkInput = BaseQueryInput;

export const findManyLinkInputSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
  keyword: Joi.string().trim(),
  orderBy: Joi.string()
    .max(255)
    .trim()
    .custom(allowedOrderBy(["visitCount", "createdAt", "expiredAt"])),
});
