import Joi from 'joi';

export interface UrlShortInput {
  fullUrl: string;
}

export const urlShortInputSchema = Joi.object<UrlShortInput>({
  fullUrl: Joi.string().uri().required().trim(),
});
