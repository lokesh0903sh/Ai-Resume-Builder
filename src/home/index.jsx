import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Star, Users, Zap, FileText, Download, Eye, Sparkles } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <Header/>
      
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 pt-20 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-300 mb-8">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Builder
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Build Your Resume{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                With AI
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Effortlessly craft a standout resume with our AI-powered builder. 
              Get professional templates, smart suggestions, and land your dream job faster.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/dashboard">
                <Button size="lg" className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Eye className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free to Start</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose Our AI Resume Builder?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Give mock interview in just 3 simple easy steps and land your dream job
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-600">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  AI-Powered Content
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Let AI generate professional content for your resume based on your experience and industry.
                </dd>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  Professional Templates
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Choose from dozens of ATS-friendly templates designed by hiring professionals.
                </dd>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-600">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  Easy Export
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Download your resume in PDF format, ready to send to employers instantly.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              How it Works?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Create your professional resume in just 3 simple steps
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  Fill Your Details
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Enter your personal information, work experience, education, and skills.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  AI Enhancement
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Our AI optimizes your content for maximum impact and ATS compatibility.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                  Download & Apply
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Download your polished resume and start applying to your dream jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.
            </p>
            <div className="mt-10">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Start Building Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center">
            <img src="/logo.svg" alt="Logo" className="mx-auto h-10 w-auto mb-4" />
            <p className="text-sm text-gray-400">
              © 2025 AI Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
