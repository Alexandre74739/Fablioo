import type { ComponentType } from "react";

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  icon?: ComponentType<{ className?: string }>;
}

const fieldClass =
  "w-full rounded-xl border border-encre/15 bg-paper px-4 py-3 text-encre placeholder:text-encre/40 transition-colors duration-200 focus:border-rosewood focus:outline-none focus:ring-2 focus:ring-rosewood/15";

export default function Input({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  required,
  rows,
  icon: Icon,
}: InputProps) {
  const field = rows ? (
    <textarea
      id={id}
      name={name}
      rows={rows}
      required={required}
      placeholder={placeholder}
      className={`${fieldClass} resize-none`}
    />
  ) : (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      placeholder={placeholder}
      className={Icon ? `${fieldClass} pl-11` : fieldClass}
    />
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-encre">
        {label}
      </label>
      {Icon ? (
        <div className="relative">
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-encre/40" />
          {field}
        </div>
      ) : (
        field
      )}
    </div>
  );
}
