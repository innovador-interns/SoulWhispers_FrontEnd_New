import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import contactImage from '../assets/contactus2.jpg'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { sendContactMessage } from '../services/contact.service'

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number')
    .optional(),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required')
})

function ContactPage() {

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const data = await sendContactMessage(values);
      console.log('API Response:', data);
      toast?.success?.('Your message has been sent successfully!');
      resetForm();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast?.error?.('Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0f4f24] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you on your wellness journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200"
          >

            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                message: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#3bab35] focus:ring-2 focus:ring-[#3bab35]/20 outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#3bab35] focus:ring-2 focus:ring-[#3bab35]/20 outline-none transition-all"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#3bab35] focus:ring-2 focus:ring-[#3bab35]/20 outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      name="message"
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#3bab35] focus:ring-2 focus:ring-[#3bab35]/20 outline-none transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#3bab35] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-[#2e8b33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block lg:block"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <motion.img
                src={contactImage}
                alt="Contact Us"
                className="w-full h-[640px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating elements for animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-[#3bab35]/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#3bab35]/15 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
