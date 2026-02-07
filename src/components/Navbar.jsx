import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import companyData from '../data/company.json'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const location = useLocation()

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 메뉴 항목
  const menuItems = [
    { label: '홈', path: '/' },
    { label: '회사소개', path: '/about' },
    {
      label: '서비스',
        submenu: [
        { label: '시장진입전략', path: '/services/market-entry' },
        { label: '경제성평가', path: '/services/economics' },
        { label: '인허가지원', path: '/services/regulatory' },
        { label: '요양급여비용청구', path: '/services/claims' },
        { label: '퇴장방지의약품 및 약가조정', path: '/services/withdrawal-prevention' },
        { label: '의료기기', path: '/services/medical-device' },
      ]
    },
    { label: 'AI솔루션', path: '/ai-solutions' },
    { label: '인사이트', path: '/insights' },
  ]

  const isActive = (path) => location.pathname === path

  const openContactModal = () => window.openContactModal?.()

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/static/agua-health-logo.png" 
              alt="Agua Health Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-[#285BAB]">
              {companyData.name}
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <ul className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              item.submenu ? (
                <li 
                  key={index} 
                  className="relative group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button 
                    className={`text-gray-700 hover:text-[#285BAB] transition-colors font-medium ${
                      location.pathname.startsWith('/services') ? 'text-[#285BAB]' : ''
                    }`}
                  >
                    {item.label}
                    <svg 
                      className="inline-block ml-1 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* 서브메뉴 */}
                  <ul className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 transition-all duration-200 ${
                    isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    {item.submenu.map((subitem, subindex) => (
                      <li key={subindex}>
                        <Link
                          to={subitem.path}
                          className={`block px-4 py-3 hover:bg-blue-50 hover:text-[#285BAB] transition-colors ${
                            isActive(subitem.path) ? 'text-[#285BAB] bg-blue-50' : 'text-gray-700'
                          }`}
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`transition-colors font-medium ${
                      isActive(item.path)
                        ? 'text-[#285BAB]'
                        : 'text-gray-700 hover:text-[#285BAB]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            ))}
            <li>
              <button
                onClick={openContactModal}
                className="bg-[#285BAB] text-white px-6 py-2 rounded-lg hover:bg-[#1e4580] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg font-medium"
              >
                Contact Us
              </button>
            </li>
          </ul>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-700 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'
        }`}>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              item.submenu ? (
                <li key={index} className="border-t border-gray-100 pt-2">
                  <div className="px-4 py-2 text-gray-500 text-sm font-medium">
                    {item.label}
                  </div>
                  <ul className="pl-4 space-y-1">
                    {item.submenu.map((subitem, subindex) => (
                      <li key={subindex}>
                        <Link
                          to={subitem.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-2 rounded-lg transition-colors ${
                            isActive(subitem.path)
                              ? 'text-[#285BAB] bg-blue-50'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'text-[#285BAB] bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            ))}
            <li className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openContactModal()
                }}
                className="w-full bg-[#285BAB] text-white px-6 py-3 rounded-lg hover:bg-[#1e4580] transition-colors font-medium"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
