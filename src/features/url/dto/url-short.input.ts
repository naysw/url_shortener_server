import Joi from "joi";

export interface UrlShortInput {
  originalUrl: string;
  expiredAt: Date;
}

export const urlShortInputSchema = Joi.object<UrlShortInput>({
  originalUrl: Joi.string().uri({ allowRelative: true }).required().trim(),
  expiredAt: Joi.string().isoDate().trim(),
});
