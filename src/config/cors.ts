/**
 * cors options
 *
 * @type
 */
export default {
  /**
   * allow methods
   */
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

  /**
   * allow headers
   */
  allowedHeaders: ["Content-Type", "Accept", "Authorization"],

  /**
   * allow origin
   */
  origin: "*",

  /**
   *
   */
  preflightContinue: false,
};
