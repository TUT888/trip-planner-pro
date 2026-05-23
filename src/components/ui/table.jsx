import { cn } from '@/lib/utils';

export function Table({ className, ...props }) {
  return <table className={cn('w-full text-sm', className)} {...props} />;
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn('[&_tr]:border-b', className)} {...props} />;
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

export function TableRow({ className, ...props }) {
  return <tr className={cn('border-b border-border hover:bg-muted/50', className)} {...props} />;
}

export function TableHead({ className, ...props }) {
  return <th className={cn('h-11 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-gray-500', className)} {...props} />;
}

export function TableCell({ className, ...props }) {
  return <td className={cn('px-4 py-3 align-middle', className)} {...props} />;
}