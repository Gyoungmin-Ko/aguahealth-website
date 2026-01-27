import { useState, useEffect } from 'react'

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    // 전역에서 모달 열기 가능하도록
    window.openContactModal = () => setIsOpen(true)
    window.closeContactModal = () => setIsOpen(false)

    return () => {
      delete window.openContactModal
      delete window.closeContactModal
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('https://formspree.io/f/xrbblvyl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('문의가 성공적으로 전송되었습니다! 빠른 시일 내에 연락드리겠습니다.')
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        })
        setIsOpen(false)
      } else {
        alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('전송 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      id="contactModal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="p-6 sm:p-8">
          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsOpen(false)}
            className="float-right text-gray-400 hover:text-gray-600 text-3xl leading-none"
          >
            &times;
          </button>

          {/* 헤더 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">무료 상담 신청</h2>
            <p className="text-gray-600">
              궁금하신 사항을 남겨주시면 빠른 시일 내에 연락드리겠습니다.
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="modalName" className="block text-sm font-medium text-gray-700 mb-1">
                이름 *
              </label>
              <input
                type="text"
                id="modalName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#285BAB] focus:border-transparent transition-all"
                placeholder="이름을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="modalEmail" className="block text-sm font-medium text-gray-700 mb-1">
                이메일 *
              </label>
              <input
                type="email"
                id="modalEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#285BAB] focus:border-transparent transition-all"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="modalCompany" className="block text-sm font-medium text-gray-700 mb-1">
                회사명
              </label>
              <input
                type="text"
                id="modalCompany"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#285BAB] focus:border-transparent transition-all"
                placeholder="회사명을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="modalPhone" className="block text-sm font-medium text-gray-700 mb-1">
                연락처
              </label>
              <input
                type="tel"
                id="modalPhone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#285BAB] focus:border-transparent transition-all"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label htmlFor="modalMessage" className="block text-sm font-medium text-gray-700 mb-1">
                문의 내용 *
              </label>
              <textarea
                id="modalMessage"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#285BAB] focus:border-transparent transition-all resize-none"
                placeholder="문의하실 내용을 자유롭게 작성해주세요"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#285BAB] text-white py-3 rounded-lg hover:bg-[#1e4580] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-medium"
            >
              상담 신청하기
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
