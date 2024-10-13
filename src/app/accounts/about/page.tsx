'use client';

import AccountMenu from '@/components/account/accountMenu';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoLogoGithub } from 'react-icons/io5';
import { IoIosCamera } from 'react-icons/io';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FaChevronDown, FaBagShopping, FaUser } from 'react-icons/fa6';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">
    {children}
    <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
  </h2>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)' }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300 border border-gray-200 dark:border-gray-700"
  >
    <div className="text-orange-500 mb-6 text-4xl">{icon}</div>
    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

interface TeamMemberProps {
  name: string;
  role: string;
  github: string;
  description: string;
  skills: string[];
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, github, description, skills, image }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="p-8">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 opacity-20"></div>
        </div>
        <h3 className="text-2xl font-semibold mb-2 text-center text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">{role}</p>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 text-xs rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{description}</p>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
              >
                <IoLogoGithub className="w-4 h-4 mr-2" />
                GitHub 프로필
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-orange-500 hover:text-orange-600 transition-colors flex items-center mx-auto text-sm font-medium"
        >
          {isExpanded ? '접기' : '더 보기'}
          <FaChevronDown className={`w-4 h-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <main className="flex w-full max-w-full h-full">
      <div className="overflow-y-auto space-y-10 items-center hidden lg:flex lg:flex-col lg:min-w-[28rem] lg:w-[28rem] lg:max-w-[28rem] border-r-[1px] border-gray-100 dark:border-r-2 dark:border-gray-700">
        <div className="text-3xl font-extrabold w-full px-7 pt-20">설정</div>
        <AccountMenu />
      </div>

      <div className="h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="url(#logo-gradient)" />
                <path
                  d="M20 10C14.5 10 10 14.5 10 20C10 25.5 14.5 30 20 30C25.5 30 30 25.5 30 20C30 14.5 25.5 10 20 10ZM20 28C15.6 28 12 24.4 12 20C12 15.6 15.6 12 20 12C24.4 12 28 15.6 28 20C28 24.4 24.4 28 20 28Z"
                  fill="white"
                />
                <circle cx="20" cy="20" r="3" fill="white" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9500" />
                    <stop offset="1" stopColor="#FF5E3A" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                감귤마켓
              </h1>
            </div>
          </nav>
        </header>

        <main>
          <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500 opacity-90"></div>
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-extrabold mb-6 text-white"
              >
                We are Team Tangerinenee
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl mb-8 text-white"
              >
                조화와 지속 가능한 성장을 추구하는 감귤조직입니다.
              </motion.p>
              <motion.a
                href="#about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-100 transition-colors duration-300 inline-block"
              >
                자세히 알아보기
              </motion.a>
            </div>
          </section>

          <section id="about" className="py-24">
            <div className="container mx-auto px-4">
              <SectionTitle>감귤마켓 소개</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                    감귤마켓은 조화와 지속 가능한 성장을 추구하는 혁신적인 마켓플레이스입니다. 우리는 팀 개개인 모두가
                    주어진 위치에 상관없이 모든 일에 오너십을 가지고 적극적으로 참여하는 문화를 만들어가고 있습니다.
                  </p>
                  <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
                    우리의 목표는 사용자들에게 편리하고 신뢰할 수 있는 거래 플랫폼을 제공하는 것입니다. 최신 기술과
                    사용자 중심의 디자인을 통해 지속적으로 서비스를 개선하고 있습니다.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    감귤마켓 팀은 항상 더 나은 서비스를 제공하기 위해 노력하고 있으며, 사용자 피드백을 적극적으로
                    반영하여 플랫폼을 발전시키고 있습니다.
                  </p>
                </div>
                <div className="relative">
                  <img src="/tangerinee.png" alt="감귤마켓 팀" className="rounded-lg shadow-xl" />
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="bg-gray-100 dark:bg-gray-800 py-24">
            <div className="container mx-auto px-4">
              <SectionTitle>주요 특징</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<FaBagShopping />}
                  title="신뢰할 수 있는 거래"
                  description="검증된 사용자 간의 안전한 거래 시스템을 제공합니다. 투명한 리뷰 시스템으로 신뢰도를 높입니다."
                />
                <FeatureCard
                  icon={<FaUser />}
                  title="편리한 사용자 경험"
                  description="직관적인 인터페이스로 누구나 쉽게 이용할 수 있습니다. Apache Pulsar를 사용하는 채팅으로 조용히 연결됩니다."
                />
                <FeatureCard
                  icon={<IoIosCamera />}
                  title="지속적인 혁신"
                  description="최신 기술을 적용하여 서비스를 지속적으로 개선합니다. AI 기반 추천 시스템으로 맞춤형 서비스를 제공합니다."
                />
              </div>
            </div>
          </section>

          <section id="team" className="py-24">
            <div className="container mx-auto px-4">
              <SectionTitle>팀 멤버</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMember
                  name="공미희"
                  role="백엔드 개발자"
                  github="https://github.com/heeeee-github"
                  description="상품 관리 및 신고 시스템 개발을 담당하고 있습니다. 테스트 주도 개발(TDD)에 관심이 많으며, 안정적이고 확장 가능한 백엔드 아키텍처 설계에 주력하고 있습니다."
                  skills={['백엔드', '상품 관리', '신고 시스템', '테스트 앱']}
                  image="/placeholder.svg?height=200&width=200"
                />
                <TeamMember
                  name="권용인"
                  role="백엔드 개발자"
                  github="https://github.com/vanhalenpanam"
                  description="좋아요 기능과 이미지 처리 시스템을 개발하고 있습니다. OpenCV를 사용하여 이미지 프로세스 로직을 구현하였습니다."
                  skills={['백엔드', '좋아요 기능', '이미지 처리', '데이터베이스 최적화']}
                  image="/placeholder.svg?height=200&width=200"
                />
                <TeamMember
                  name="김동현"
                  role="풀스택 개발자"
                  github="https://github.com/ds5105119"
                  description="계정 관리, 게시글, 팔로우, 댓글, 채팅 등 다양한 기능을 개발하고 있습니다. CS/CE의 전반적인 분야에 흥미를 갖고 있으며, 프론트엔드와 백엔드를 아우르는 폭넓은 기술 스택을 보유하고 있습니다."
                  skills={['풀스택', '계정 관리', '채팅 시스템', 'UI/UX', 'Apache Pulsar', 'Docker']}
                  image="/placeholder.svg?height=200&width=200"
                />
              </div>
            </div>
          </section>

          <section id="contact" className="bg-gray-100 dark:bg-gray-800 py-24">
            <div className="container mx-auto px-4 text-center">
              <SectionTitle>문의하기</SectionTitle>
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
                감귤마켓에 대해 더 알고 싶거나 협업을 원하시나요? 언제든 연락 주세요!
              </p>
              <a
                href="mailto:ds5105119@gmail.com"
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 inline-flex items-center"
              >
                <MdOutlineAlternateEmail className="w-5 h-5 mr-2" />
                이메일 보내기
              </a>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white">
          <div className="border-t border-gray-800 py-6 text-sm text-gray-400 text-center">
            © 2024 감귤마켓. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}
