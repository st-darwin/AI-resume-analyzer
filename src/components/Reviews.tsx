

const Reviews = () => {
  const reviews = [
    {
      name: "Alex Rivera",
      role: "Frontend Developer",
      content: "NexaCV’s ATS analysis is scary accurate. I updated my resume based on the feedback and landed three interviews in one week.",
      rating: 5,
      avatar: "AR",
      color: "blue"
    },
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content: "The UI is so clean, but the logic underneath is the real winner. The feedback gave me specific keywords I was totally missing.",
      rating: 5,
      avatar: "SC",
      color: "indigo"
    },
    {
      name: "James Okafor",
      role: "Software Engineer",
      content: "Finally, a tool that doesn't just tell me my resume is 'bad' but actually shows me how to fix it for the bots. Game changer.",
      rating: 5,
      avatar: "JO",
      color: "emerald"
    }
  ];

  return (
    <section className="py-32 px-6 bg-[#FDFDFD] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-7xl">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white mb-6 shadow-xl shadow-slate-200">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
             </span>
             <span className="text-[10px] py-1 font-black uppercase tracking-[0.2em]">Community Feedback</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight max-w-4xl leading-[1.1]">
            What users think <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                about the app.
            </span>
          </h2>
          
          <div className="w-24 h-1.5 bg-blue-600 rounded-full mt-8" />
        </div>

        {/* --- TESTIMONIALS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className={`group relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 hover:-translate-y-3 
                ${index === 1 ? 'md:mt-12' : ''} // Staggered effect for middle card
              `}
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center justify-center text-slate-200 group-hover:text-blue-500 transition-colors duration-500">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.01705 21L3.01705 18C3.01705 16.8954 3.91248 16 5.01705 16H8.01705C8.56933 16 9.01705 15.5523 9.01705 15V9C9.01705 8.44772 8.56933 8 8.01705 8H4.01705C3.46477 8 3.01705 8.44772 3.01705 9V11C3.01705 11.5523 2.56933 12 2.01705 12H1.01705V5H11.017V15C11.017 18.3137 8.33075 21 5.01705 21H3.01705Z" />
                </svg>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1.5 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-slate-600 text-lg font-medium leading-relaxed mb-10 tracking-tight">
                "{review.content}"
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-slate-50 mb-8" />

              {/* User Info */}
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-inner
                  ${review.color === 'blue' ? 'bg-blue-600 text-white' : 
                    review.color === 'indigo' ? 'bg-indigo-600 text-white' : 
                    'bg-emerald-600 text-white'}`}
                >
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg leading-none">{review.name}</h4>
                  <p className="text-[11px] font-black text-blue-600 mt-2 uppercase tracking-[0.15em]">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews