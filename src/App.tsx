import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ChevronRight, ChevronLeft, Upload, Sparkles, CheckCircle } from 'lucide-react';

const carouselItems = [
  {
    id: 1,
    image: "/images/textured.png",
    style: "Textured Crop",
    hairType: "Thick & Straight"
  },
  {
    id: 2,
    image: "/images/pompadour.png",
    style: "Classic Pompadour",
    hairType: "Medium & Wavy"
  },
  {
    id: 3,
    image: "/images/natural-curls.png",
    style: "Natural Curls",
    hairType: "Curly"
  },
  {
    id: 4,
    image: "/images/slickback.png",
    style: "Slick Back",
    hairType: "Fine & Straight"
  }
];

const testimonials = [
  {
    quote: "The matte clay completely changed my routine. It holds my thick hair all day through intense humidity without ever looking greasy or stiff. Finally, a clean product that actually works.",
    name: "Marcus T.",
    type: "Thick & Wavy",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "I've always struggled with my fine hair falling flat by noon. The sea salt spray gives me incredible texture and volume that lasts all day without drying my scalp.",
    name: "David R.",
    type: "Fine & Straight",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Finding products without harsh chemicals that can actually tame my curls felt impossible until now. The styling cream defines my hair perfectly while keeping it soft.",
    name: "James L.",
    type: "Curly Texture",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=150"
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1000px]">
      {carouselItems.map((item, index) => {
        const offset = (index - currentIndex + carouselItems.length) % carouselItems.length;
        const half = Math.floor(carouselItems.length / 2);
        let normalizedOffset = offset;
        if (offset > half) {
          normalizedOffset = offset - carouselItems.length;
        }

        const isActive = normalizedOffset === 0;
        const zIndex = 50 - Math.abs(normalizedOffset);
        const scale = isActive ? 1 : 0.85;
        const x = normalizedOffset * (isMobile ? 80 : 200);
        const rotateY = normalizedOffset * -15;
        const opacity = Math.abs(normalizedOffset) > 1 ? 0 : 1 - Math.abs(normalizedOffset) * 0.4;

        return (
          <motion.div
            key={item.id}
            className="absolute w-[260px] md:w-[350px] h-[380px] md:h-[420px] rounded-2xl overflow-hidden glass border-white/20 shadow-2xl group cursor-grab active:cursor-grabbing"
            initial={false}
            animate={{
              x,
              scale,
              rotateY,
              zIndex,
              opacity
            }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, info) => {
              if (info.offset.x < -50) next();
              if (info.offset.x > 50) prev();
            }}
          >
            <div className="w-full h-[70%] overflow-hidden">
              <img src={item.image} alt={item.style} className="w-full h-full object-cover object-top md:group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6 h-[30%] flex flex-col justify-center bg-gradient-to-t from-black/90 to-black/40 relative z-10">
              <h3 className="text-xl font-display font-semibold text-white">{item.style}</h3>
              <p className="text-sm text-gray-400">{item.hairType}</p>
            </div>
          </motion.div>
        );
      })}
      
      <div className="absolute -bottom-6 flex flex-col items-center gap-6 z-50">
        <div className="flex gap-4">
          <button onClick={prev} className="p-3 rounded-full glass hover:bg-white/10 transition-colors text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="p-3 rounded-full glass hover:bg-white/10 transition-colors text-white">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex gap-2 md:hidden">
          {carouselItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setIsSubmitted(true);
    
    // Reset the button state and form after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-display font-bold tracking-tighter text-white">APEX.</div>
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-medium text-white hover:text-gray-300 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=2000" 
            alt="Stylish man with intense gaze and styled hair" 
            className="w-full h-full object-cover opacity-40 object-top"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Toxin-Free Styling for <br className="hidden md:block" />
            <span className="text-gray-300">Every Hair Type.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light"
          >
            Clean, natural grooming engineered for men. Zero parabens, zero damage, 100% style.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="glow-button bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Early Access
            </button>
          </motion.div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Engineered for Performance</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">No compromises. Just clean ingredients and superior hold.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-500">
              <div className="w-full h-72 mb-8 rounded-2xl overflow-hidden relative">
                 <img src="/images/apex-cream.png" alt="Universal Fit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">Universal Fit</h3>
              <p className="text-gray-400 leading-relaxed">A specialized product line for every texture and style. Because your hair is unique, and your styling tools should be too</p>
            </div>
            
            <div className="glass rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-500">
              <div className="w-full h-72 mb-8 rounded-2xl overflow-hidden relative">
                 <img src="/images/salt-spray.png" alt="100% Clean" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">100% Clean</h3>
              <p className="text-gray-400 leading-relaxed">Zero parabens, zero sulfates. Style today, save your hair for tomorrow.</p>
            </div>
            
            <div className="glass rounded-3xl p-8 flex flex-col items-center text-center group hover:bg-white/5 transition-colors duration-500">
              <div className="w-full h-72 mb-8 rounded-2xl overflow-hidden relative">
                 <img src="/images/apex-matte.png" alt="APEX Matte Clay Styler" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">The Matte Line</h3>
              <p className="text-gray-400 leading-relaxed">Featuring our specialized climate-proof clay for a perfect, no-shine hold in hot and humid weather.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-32 px-6 relative z-10 overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Styles That Speak</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">Real results on every hair type.</p>
          </div>
          <Carousel />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-6 relative z-10 bg-charcoal/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-4">Real Results</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Don't Just Take Our Word For It</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-3xl p-10 flex flex-col justify-between hover:bg-white/5 transition-colors duration-500">
                <div>
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed mb-10 font-light">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-5">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover grayscale border border-white/10" />
                  <div>
                    <h4 className="text-white font-semibold text-lg">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Delighter Section (AI Stylist) */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-[3rem] p-10 md:p-20 relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-sm text-gray-300 mb-8">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium tracking-wide uppercase text-xs">Coming Soon</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">The Future of Grooming.</h2>
                <p className="text-gray-400 text-xl leading-relaxed mb-10 font-light">
                  Not sure what works for you? Upload a selfie and a reference photo. Our upcoming AI Stylist will match your hair type with the exact product and styling routine you need.
                </p>
                <button className="flex items-center gap-3 text-white font-semibold hover:text-gray-300 transition-colors group">
                  <div className="p-3 rounded-full glass group-hover:bg-white/10 transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-lg">Try the Beta</span>
                </button>
              </div>
              
              <div className="relative h-[450px] rounded-3xl overflow-hidden glass border-white/10 flex shadow-2xl">
                <div className="w-1/2 h-full relative border-r border-white/10">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" alt="Selfie" className="w-full h-full object-cover opacity-60 grayscale" />
                  <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-lg text-xs font-medium text-white tracking-wide uppercase">Input: Selfie</div>
                </div>
                <div className="w-1/2 h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white/5 to-transparent relative">
                  <img src="/images/apex-matte.png" alt="Product Match" className="w-40 h-40 object-cover rounded-2xl mb-6 shadow-2xl border border-white/10" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=200" }} />
                  <h4 className="text-white font-display font-semibold text-xl text-center mb-2">Matte Clay Styler</h4>
                  <p className="text-sm text-gray-400 text-center">98% Match for Medium Wavy</p>
                  <div className="absolute bottom-6 right-6 glass px-4 py-2 rounded-lg text-xs font-medium text-white tracking-wide uppercase">Output: Routine</div>
                </div>
                
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="waitlist" className="py-32 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black">
        <div className="max-w-xl mx-auto">
          <div className="glass rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Secure Your Spot</h2>
              <p className="text-gray-400 text-lg font-light">Join the waitlist for early access and exclusive early member perks.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleWaitlistSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="hairType" className="block text-sm font-medium text-gray-300 mb-2">What's your hair type?</label>
                <div className="relative">
                  <select 
                    id="hairType" 
                    name="hairType"
                    defaultValue=""
                    className="w-full bg-[#121212] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="straight">Straight</option>
                    <option value="wavy">Wavy</option>
                    <option value="curly">Curly</option>
                    <option value="notsure">Not Sure</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitted}
                className={`w-full glow-button font-semibold rounded-xl px-4 py-4 mt-4 transition-all duration-300 text-lg flex items-center justify-center gap-2 ${
                  isSubmitted 
                    ? 'bg-white/5 text-green-400 cursor-not-allowed border border-green-500/30' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                    <span>You're on the list!</span>
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-sm bg-black">
        <p>&copy; 2026 APEX Grooming Co. All rights reserved.</p>
      </footer>
    </div>
  );
}
