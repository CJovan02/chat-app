import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

interface TextInputProps {
  id: string;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  inputClassName?: string;
}

const TextInput = ({
  id,
  label,
  placeholder,
  required,
  disabled,
  maxLength,
  type,
  description,
  inputClassName
}: TextInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState }) => {
        const { ref, ...fieldRest } = field;
        return (
          <Field data-invalid={fieldState.invalid}>
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
            <Input
              id={id}
              required={required}
              disabled={disabled}
              ref={ref}
              maxLength={maxLength}
              placeholder={placeholder}
              {...fieldRest}
              aria-invalid={fieldState.invalid}
              autoComplete='off'
              value={field.value ?? ''}
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(type === 'number' ? Number(value) : value);
              }}
              type={type || 'text'}
              className={inputClassName}
            />
            {description !== undefined && (
              <FieldDescription>{description}</FieldDescription>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
    // <Controller
    //   name={id}
    //   control={control}
    //   render={({ field, fieldState: { error: fieldError } }) => {
    //     const hasError = !!fieldError;
    //     const { ref, ...fieldRest } = field;
    //     return (
    //       <>
    //         <Label
    //           htmlFor={id}
    //           aria-required={required}
    //           aria-disabled={disabled}
    //           className='font-semibold pb-2'>
    //           {label}
    //         </Label>
    //         <Input
    //           id={id}
    //           required={required}
    //           disabled={disabled}
    //           ref={ref}
    //           maxLength={maxLength}
    //           placeholder={placeholder}
    //           {...fieldRest}
    //           value={field.value ?? ''}
    //           onChange={(event) => {
    //             const value = event.target.value;
    //             field.onChange(type === 'number' ? Number(value) : value);
    //           }}
    //           type={type || 'text'}
    //         />
    //         {hasError && (
    //           <p className='text-sm text-red-600'>{fieldError?.message}</p>
    //         )}
    //       </>
    //     );
    //   }}
    //   />
  );
};

export default TextInput;
