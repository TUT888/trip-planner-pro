import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitLabel = 'Save',
  children
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <Button type="button" variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close form">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 px-6 py-5">
          {children}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{submitLabel}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}