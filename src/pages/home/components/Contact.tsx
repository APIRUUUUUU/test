import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const formBody = new URLSearchParams();
      formBody.append('company', formData.company);
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('subject', formData.subject);
      formBody.append('message', formData.message);
      
      const response = await fetch('https://readdy.ai/api/form/d82n69i7ocflitlitkbg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });
      
      if (response.ok) {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ company: '', name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 3000);
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch {
      setIsSubmitting(false);
      setSubmitStatus('error');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-32 bg-yellow-50 overflow-hidden" ref={ref}>
      {/* 斜めストライプ装飾 */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(250, 204, 21, 0.04) 80px, rgba(250, 204, 21, 0.04) 160px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-7xl md:text-9xl font-bold mb-16 text-yellow-400"
            style={{ fontFamily: 'Rubik Mono One, cursive', letterSpacing: '0.05em' }}
          >
            CONTACT
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900">お問い合わせ</h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              スポンサーや案件のご相談、コラボレーションのご提案など、お気軽にお問い合わせください。
            </p>
          </motion.div>

          <motion.form
            data-readdy-form="contact"
            action="https://readdy.ai/api/form/d82n69i7ocflitlitkbg"
            method="POST"
            encType="application/x-www-form-urlencoded"
            onSubmit={handleSubmit}
            className="bg-yellow-50 p-8 rounded-lg"
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="company" className="block text-sm font-bold text-gray-900 mb-2">
                  会社名・団体名
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                  お名前 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                  件名 *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                  お問い合わせ内容 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                />
                <p className="text-xs text-gray-600 mt-1">
                  {formData.message.length}/500文字
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  className="p-4 bg-green-100 text-green-700 rounded-lg text-center font-bold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  お問い合わせありがとうございます！
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  送信に失敗しました。時間をおいて再度お試しください。
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}