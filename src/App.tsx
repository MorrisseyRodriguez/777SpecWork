import { Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const reviews = [
  {
    text: "Hiring the 1965 Mustang with a chauffeur was the best decision. Josue made everything effortless and the car was perfect.",
    author: "Danielle Wainwright"
  },
  {
    text: "The car was immaculate and Ethan made our wedding day run so smoothly. Friendly, professional, and stress-free.",
    author: "MW"
  },
  {
    text: "They made our elopement completely stress-free. From planning in the UK to the wedding day itself, everything was flawless.",
    author: "Sam Morely"
  },
  {
    text: "The white 1965 Mustang was stunning. Communication was excellent and the whole experience felt easy and special.",
    author: "Aimee Tait"
  },
  {
    text: "They went above and beyond. Genuine care, great communication, and made our wedding unforgettable.",
    author: "Dustin Griswold"
  }
];

const images = [
  {
    url: "/images/Screenshot_20260223_172624_Instagram.jpg",
    alt: "Bride and groom with vintage Mustang"
  },
  {
    url: "/images/Screenshot_20260223_172653_Instagram.jpg",
    alt: "Wedding exit moment"
  },
  {
    url: "/images/Screenshot_20260223_172724_Instagram.jpg",
    alt: "Ceremony arrival"
  },
  {
    url: "/images/Screenshot_20260223_172759_Instagram.jpg",
    alt: "Luxury wedding car"
  }
];

function ReviewCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div
      className="overflow-hidden bg-[#f8fafc] py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[420px] bg-white rounded-xl p-8 shadow-sm border border-[#e2e2e2]"
          >
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d5691b] text-[#d5691b]" />
              ))}
            </div>
            <p className="text-[#333] text-[15px] leading-[1.6] mb-6 font-normal">
              "{review.text}"
            </p>
            <p className="text-[#5d5d5d] text-sm font-medium">
              – {review.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000000] text-center mb-6 leading-[1.15] tracking-tight">
            You've Planned Everything.<br />Don't Forget The Getaway Car.
          </h1>

          <div className="max-w-3xl mx-auto mt-10 mb-16">
            <p className="text-lg md:text-xl text-[#333] text-center leading-[1.65] font-normal">
              Your wedding day isn't just another event.<br />
              It's the story you'll replay for the rest of your life.<br />
              Make the arrival and the getaway unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-[#f8fafc] shadow-sm"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewCarousel />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-[#333] mb-8 leading-relaxed font-normal">
            See which vehicles couples in Las Vegas choose most for their big day.
          </p>
          <button className="bg-[#fe0100] text-white px-10 py-3.5 rounded-full text-base font-semibold hover:bg-[#dc2b2b] transition-all duration-300 shadow-md hover:shadow-lg">
            Browse Cars Picked Most Often For Weddings
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
