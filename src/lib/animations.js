/**
 * Premium Animation Variants
 * Easing: [0.22, 1, 0.36, 1] (Custom Cubic Bezier)
 */

export const ease = [0.22, 1, 0.36, 1];

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: ease
        }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: ease
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0,
            delayChildren: 0
        }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: ease
        }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: ease
        }
    }
};

export const scaleUp = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: ease
        }
    }
};

// Reusable viewport configuration
export const viewportSettings = {
    once: true,
    amount: 0.15
};
