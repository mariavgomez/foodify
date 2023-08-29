import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles = {
  solid: {
    cyan: 'relative overflow-hidden bg-green-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-green-500 text-white hover:bg-green-400 active:bg-gray-800 active:text-white/80',
  },
  outline: {
    gray: 'border-green-500 text-gray-700 hover:border-green-800 active:bg-gray-100 active:text-gray-700/80',
  },
}

export function Button({ variant, color, className, ...props }) {
  variant = variant ?? 'solid'
  color = color ?? 'gray'

  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
