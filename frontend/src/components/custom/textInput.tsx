import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface TextInputProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
}

const TextInput = ({
  id,
  label,
  placeholder,
  required,
  disabled,
  maxLength,
  type,
}: TextInputProps) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={id}
        control={control}
        render={({ field, fieldState: { error: fieldError } }) => {
          const hasError = !!fieldError;
          const { ref, ...fieldRest } = field;
          return (
            <>
              <Label
                htmlFor={id}
                aria-required={required}
                aria-disabled={disabled}
                className='font-semibold pb-2'>
                {label}
              </Label>
              <Input
                id={id}
                required={required}
                disabled={disabled}
                ref={ref}
                type={type || 'text'}
                maxLength={maxLength}
                placeholder={placeholder}
                {...fieldRest}
                value={field.value ?? ''}
              />
              {hasError && (
                <p className='text-sm text-red-600'>{fieldError?.message}</p>
              )}
            </>
          );
        }}></Controller>
    </>
  );
};

export default TextInput;
