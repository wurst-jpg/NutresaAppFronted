// Campo de formulario accesible: etiqueta, control y mensaje de error enlazados.
// `children` es una función que recibe las props de accesibilidad para el control.
export default function FormField({ id, label, error, children }) {
  const errorId = `${id}-error`;
  const controlProps = {
    id,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
  };
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-slate-200">
        {label}
      </label>
      {children(controlProps)}
      {error && (
        <p id={errorId} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses =
  'w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 ' +
  'focus:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 aria-[invalid=true]:border-red-500';
