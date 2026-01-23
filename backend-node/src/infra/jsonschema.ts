import Ajv, { type AnySchema, type ValidateFunction } from 'ajv';

const ajv = new Ajv({
  allErrors: true,
  strict: true,
  allowUnionTypes: true,
});

export type SchemaValidator<T> = {
  validate: (data: unknown) => T;
};

export function compileSchema<T>(schema: AnySchema): SchemaValidator<T> {
  const validateFn = ajv.compile(schema) as ValidateFunction<T>;

  return {
    validate: (data: unknown): T => {
      const ok = validateFn(data);
      if (!ok) {
        const errors = validateFn.errors?.map((e) => ({
          path: e.instancePath,
          message: e.message,
        }));
        throw new Error(`Schema validation failed: ${JSON.stringify(errors)}`);
      }
      return data as T;
    },
  };
}
