function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl bg-[#3bab35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2e8b33] disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
