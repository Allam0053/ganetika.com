'use client';

import * as React from 'react';
import '@/lib/env';

import { supabase } from '@/lib/utils';

import { Content } from '@/types/content';

export type Insight = Content;

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const mainHeaderRef = React.useRef<HTMLElement>(null);
  const mobileMenuButtonRef = React.useRef<HTMLButtonElement>(null);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // const header = document.getElementById('main-header');
    // const mobileMenuButton = document.getElementById('mobile-menu-button');
    // const mobileMenu = document.getElementById('mobile-menu');
    const header = mainHeaderRef.current;
    const mobileMenuButton = mobileMenuButtonRef.current;
    const mobileMenu = mobileMenuRef.current;

    // Header scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled', 'text-primary-dark');
            header.classList.remove('text-white');
        } else {
            header.classList.remove('scrolled', 'text-primary-dark');
            header.classList.add('text-white');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on page load

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
  }, []);

  const [insights, setInsights] = React.useState<Insight[]>([]);


    // const [todos, setTodos] = React.useState([])
  
    React.useEffect(() => {
      async function getTodos() {
        const { data: todos } = await supabase.from('content').select('*');
  
        console.log('duar todos', todos);
        if (todos.length > 1) {
          setInsights(todos)
        }
      }
  
      getTodos();
    }, []);

  return (
    <>
      <header ref={mainHeaderRef} id="main-header" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
          <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                  <a href="#" className="text-xl md:text-2xl font-bold logo-text text-white">
                      Ganetika Capital Partners
                  </a>

                  <nav className="hidden md:flex items-center space-x-8">
                      <a href="#insights" className="nav-link text-white font-medium hover:text-gold transition">Insights</a>
                      <a href="#strategies" className="nav-link text-white font-medium hover:text-gold transition">Strategies</a>
                      <a href="#about" className="nav-link text-white font-medium hover:text-gold transition">About Us</a>
                      <a href="#" className="nav-link text-white font-medium hover:text-gold transition">Contact</a>
                  </nav>

                  <div className="flex items-center space-x-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 nav-link text-white cursor-pointer hover:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <a href="#" className="hidden sm:block bg-gold text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition">Client Login</a>
                      <button ref={mobileMenuButtonRef} id="mobile-menu-button" className="md:hidden text-white focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
          <div id="mobile-menu" className="hidden md:hidden bg-white text-primary-dark">
              <a href="#insights" className="block py-3 px-6 hover:bg-gray-100">Insights</a>
              <a href="#strategies" className="block py-3 px-6 hover:bg-gray-100">Strategies</a>
              <a href="#about" className="block py-3 px-6 hover:bg-gray-100">About Us</a>
              <a href="#" className="block py-3 px-6 hover:bg-gray-100">Contact</a>
              <a href="#" className="block py-3 px-6 bg-gray-50 font-semibold">Client Login</a>
          </div>
      </header>
      <main>
        
        <section className="relative h-screen flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/1A2634/FFFFFF?text=Modern+Office+Building')" }}>
            <div className="absolute inset-0 bg-slate-900/60"></div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">Principled Investing. <br/> Enduring Value.</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                    We are a leading global investment firm, pursuing a disciplined, value-oriented approach to credit, real assets, and private equity.
                </p>
                <a href="#about" className="mt-8 inline-block border-2 border-gold text-gold font-semibold py-3 px-8 rounded-md hover:bg-gold hover:text-white transition duration-300">
                    Our Philosophy
                </a>
            </div>
        </section>

        
        <section id="insights" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark text-center mb-4">Featured Insights</h2>
                <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Explore our latest thinking on markets, strategies, and the global economic landscape.</p>
                
                <div id="insight-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                  {insights && insights.map((insight) => InsightCard(insight.id, insight.title, insight.content, insight.tag))}
                    
                    <div className="bg-white rounded-lg overflow-hidden group">
                        <img src="https://placehold.co/600x400/E2E8F0/1A2634?text=Abstract+Market+Graph" alt="Market analysis" className="w-full h-48 object-cover group-hover:opacity-90 transition"/>
                        <div className="p-6">
                            <p className="text-sm text-gold font-semibold mb-2">Market Commentary</p>
                            <h3 className="text-xl font-bold text-primary-dark mb-3">Navigating Market Volatility in 2025</h3>
                            <p className="text-gray-600 mb-4">A look at the key indicators and strategic positioning for the second half of the year.</p>
                            <a href="#" className="font-semibold text-gold link-arrow">Read More</a>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg overflow-hidden group">
                        <img src="https://placehold.co/600x400/E2E8F0/1A2634?text=Sustainable+Energy" alt="Sustainable Investing" className="w-full h-48 object-cover group-hover:opacity-90 transition"/>
                        <div className="p-6">
                            <p className="text-sm text-gold font-semibold mb-2">Sustainable Investing</p>
                            <h3 className="text-xl font-bold text-primary-dark mb-3">The Future of Green Bonds and Credit</h3>
                            <p className="text-gray-600 mb-4">How ESG factors are creating new opportunities in the sustainable credit markets.</p>
                            <a href="#" className="font-semibold text-gold link-arrow">Read More</a>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg overflow-hidden group">
                        <img src="https://placehold.co/600x400/E2E8F0/1A2634?text=Global+Logistics" alt="Real Assets" className="w-full h-48 object-cover group-hover:opacity-90 transition"/>
                        <div className="p-6">
                            <p className="text-sm text-gold font-semibold mb-2">Real Assets</p>
                            <h3 className="text-xl font-bold text-primary-dark mb-3">Industrial Real Estate: A New Era</h3>
                            <p className="text-gray-600 mb-4">Analyzing the trends in logistics and supply chain that are driving value in real assets.</p>
                            <a href="#" className="font-semibold text-gold link-arrow">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        
        <section className="bg-primary-dark text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <p className="text-4xl lg:text-5xl font-bold text-gold">$85B</p>
                        <p className="text-sm uppercase tracking-wider text-gray-300 mt-2">Assets Under Management</p>
                    </div>
                    <div>
                        <p className="text-4xl lg:text-5xl font-bold text-gold">25+</p>
                        <p className="text-sm uppercase tracking-wider text-gray-300 mt-2">Years of Experience</p>
                    </div>
                    <div>
                        <p className="text-4xl lg:text-5xl font-bold text-gold">150+</p>
                        <p className="text-sm uppercase tracking-wider text-gray-300 mt-2">Investment Professionals</p>
                    </div>
                    <div>
                        <p className="text-4xl lg:text-5xl font-bold text-gold">12</p>
                        <p className="text-sm uppercase tracking-wider text-gray-300 mt-2">Global Offices</p>
                    </div>
                </div>
            </div>
        </section>

        
        <section id="strategies" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="pr-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">A Disciplined, Contrarian Approach</h2>
                        <p className="text-lg text-gray-600 mb-6">Our investment philosophy is built on a foundation of risk control, consistency, and a commitment to fundamental analysis. We believe that superior returns are achieved by taking a patient, long-term view.</p>
                        <div className="space-y-4 mb-8">
                           <p className="font-semibold text-primary-dark text-lg">Our core strategies include:</p>
                           <ul className="list-disc list-inside text-gray-600 space-y-2">
                               <li>Corporate and Distressed Credit</li>
                               <li>Real Assets and Infrastructure</li>
                               <li>Private Equity and Special Situations</li>
                               <li>Listed Equities</li>
                           </ul>
                        </div>
                        <a href="#" className="bg-gold text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition inline-block">Explore Our Strategies</a>
                    </div>
                    <div>
                        <img src="https://placehold.co/600x500/1A2634/FFFFFF?text=Team+Strategy+Session" alt="Team discussing strategy" className="rounded-lg shadow-xl w-full"/>
                    </div>
                </div>
            </div>
        </section>

        
        <section id="about" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">About Ganetika Capital</h2>
                 <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                    Founded on the principle of placing capital where it is scarcest, Ganetika Capital has grown into a globally recognized leader in alternative investments. Our culture of shared success and intellectual rigor attracts exceptional talent and fosters the deep analysis that our clients expect.
                 </p>
                 <a href="#" className="border-2 border-gold text-gold font-semibold py-3 px-8 rounded-md hover:bg-gold hover:text-white transition duration-300">
                    Learn More About Our Firm
                </a>
            </div>
        </section>

    </main>
    
    <footer className="bg-primary-dark text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                
                <div className="col-span-2 lg:col-span-1">
                    <h3 className="text-xl font-bold text-white mb-4">Ganetika Capital</h3>
                    <p className="text-sm text-gray-400">Principled Investing. Enduring Value.</p>
                </div>
                
                <div>
                    <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#about" className="hover:text-gold transition text-sm">About Us</a></li>
                        <li><a href="#insights" className="hover:text-gold transition text-sm">Insights</a></li>
                        <li><a href="#" className="hover:text-gold transition text-sm">Careers</a></li>
                        <li><a href="#" className="hover:text-gold transition text-sm">Contact</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Strategies</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gold transition text-sm">Credit</a></li>
                        <li><a href="#" className="hover:text-gold transition text-sm">Real Assets</a></li>
                        <li><a href="#" className="hover:text-gold transition text-sm">Private Equity</a></li>
                        <li><a href="#" className="hover:text-gold transition text-sm">Listed Equities</a></li>
                    </ul>
                </div>
                
                <div>
                     <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gold transition text-sm">Terms of Use</a></li>
                        <li><a href="#" className="hover:text-gold transition text-sm">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-gold transition text-sm">Disclosures</a></li>
                    </ul>
                </div>
                
                 <div>
                    <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-sm">Access</h4>
                    <a href="#" className="bg-gold text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition inline-block">Client Login</a>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-500 mb-4 md:mb-0">&copy; 2025 Ganetika Capital Partners. All Rights Reserved.</p>
                
            </div>
        </div>
      </footer>
    </>
    
  );
}

function InsightCard(id: string | number, title: string, content: string, tags: string) {
  return (
    <div id="insight-card-${id}" className="bg-white rounded-lg overflow-hidden group">
      <img src="https://placehold.co/600x400/E2E8F0/1A2634?text=Abstract+Market+Graph" alt="${id}" className="w-full h-48 object-cover group-hover:opacity-90 transition"/>
      <div className="p-6">
        <p className="text-sm text-gold font-semibold mb-2">{tags}</p>
        <h3 className="text-xl font-bold text-primary-dark mb-3">{tags}</h3>
        <p className="text-gray-600 mb-4">{content}</p>
        <a href="#" className="font-semibold text-gold link-arrow">Read More</a>
      </div>
    </div>
  )
}