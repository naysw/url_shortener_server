import Joi from "joi";

export interface UrlShortInput {
  fullUrl: string;
  expiredAt: Date;
}

export const urlShortInputSchema = Joi.object<UrlShortInput>({
  fullUrl: Joi.string().uri().required().trim(),
  expiredAt: Joi.date().greater("now").iso(),
});
