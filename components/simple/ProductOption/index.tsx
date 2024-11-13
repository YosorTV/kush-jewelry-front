import { Input } from '@/components/elements';
import { cn } from '@/lib';

export const ProductOption = ({ id, value, title, name, className, onChange, checked = true }: any) => {
  return (
    <label
      key={id}
      htmlFor={id}
      className={cn(
        'flex w-auto cursor-pointer items-center justify-start gap-3 underline-offset-8 hover:underline',
        className
      )}
    >
      <Input
        id={id}
        type='radio'
        defaultChecked={checked}
        checked={checked}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.checked)}
        className='radio w-6'
      />
      <span className='w-full whitespace-pre-wrap text-pretty font-semibold text-base-200'>{title}</span>
    </label>
  );
};
