declare module "./swagger" {
  import { Serve, SetupOptions } from "swagger-ui-express";
  export const swaggerUi: { serve: Serve; setup: (specs: any, opts?: SetupOptions) => any };
  export const specs: any;
}