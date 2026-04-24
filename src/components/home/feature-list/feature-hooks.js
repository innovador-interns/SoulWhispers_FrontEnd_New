import { useCallback, useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export function useTilt(max = 8) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 200, damping: 22 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 200, damping: 22 })

  const onMove = useCallback((e) => {
    if (typeof window !== 'undefined') {
      const canTilt = window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches
      if (!canTilt) return
    }
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }, [x, y])

  const onLeave = useCallback(() => { x.set(0); y.set(0) }, [x, y])

  return { ref, rotateX, rotateY, onMove, onLeave }
}
