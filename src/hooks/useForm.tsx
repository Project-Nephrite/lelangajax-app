import {
  useState,
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
} from "react";

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T extends Record<string, any>>(options: {
  initialValues: T;
  validate: (values: T) => ValidationErrors<T>;
  onSubmit: (values: T) => void | Promise<void>;
}) {
  const { initialValues, validate, onSubmit } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type, checked, files } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : type === "file"
              ? (e.target as HTMLInputElement).multiple
                ? Array.from(files ?? [])
                : (files?.[0] ?? null)
              : value,
      }));
    },

    [],
  );
  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values]);

  const handleBlur = useCallback(() => {
    setErrors(validate(values));
  }, [values, validate]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validate, onSubmit],
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
