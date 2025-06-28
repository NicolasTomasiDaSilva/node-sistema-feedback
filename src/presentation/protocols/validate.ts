export interface IValidator<Output> {
  validate(data: unknown): Output;
}
