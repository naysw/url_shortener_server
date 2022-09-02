import Joi from "joi";

export interface UrlShortInput {
  fullUrl: string;
  expiredAt: Date;
}

export const urlShortInputSchema = Joi.object<UrlShortInput>({
  fullUrl: Joi.string().uri({ allowRelative: true }).required().trim(),
  expiredAt: Joi.string().isoDate().trim(),
});
