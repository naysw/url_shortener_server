import Joi from "joi";

export interface UrlShortInput {
  originalUrl: string;
}

export const urlShortInputSchema = Joi.object<UrlShortInput>({
  originalUrl: Joi.string().uri({ allowRelative: true }).required().trim(),
});
