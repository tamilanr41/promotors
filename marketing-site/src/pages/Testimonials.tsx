import ImageWithFallback from "@/components/ui/image-with-fallback";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Robert Chen",
    role: "CEO, Chen Development Group",
    content:
      "COS transformed our approach to project management. The AI-powered estimates saved us 40% in planning time and the execution was flawless. Our partnership with COS has been one of the best business decisions we've made.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    project: "The Horizon Tower",
  },
  {
    name: "Sarah Mitchell",
    role: "VP of Operations, UrbanBuild",
    content:
      "Working with COS was a game-changer for our commercial portfolio. Their integrated COS platform gave us real-time insights we never had before. The level of transparency and communication throughout the project was exceptional.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    project: "Riverside Office Park",
  },
  {
    name: "James Rodriguez",
    role: "Founder, Rodriguez Construction",
    content:
      "The AI Estimator alone is worth it. We've won 30% more bids since using COS. Their technology gives us a serious competitive edge in the market. I recommend COS to every contractor I know.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    project: "Phoenix Manufacturing Hub",
  },
  {
    name: "Emily Watson",
    role: "Director of Facilities, TechCorp",
    content:
      "COS delivered our corporate headquarters ahead of schedule and under budget. The AI project management system kept everything on track. We couldn't be happier with the result.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    project: "TechCorp HQ",
  },
  {
    name: "Michael Torres",
    role: "City Planning Director, Metro City",
    content:
      "The infrastructure project COS completed for us was managed with incredible precision. The COS platform provided unprecedented visibility into every phase of the project.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    project: "City Rail Transit Hub",
  },
  {
    name: "Lisa Park",
    role: "Homeowner",
    content:
      "Building our dream home with COS was an amazing experience. The AI estimator gave us accurate costs upfront, and the team kept us informed every step of the way. Our home is everything we imagined and more.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
    project: "Green Valley Estate",
  },
];

export default function Testimonials() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-cos-blue-dark via-cos-blue to-cos-blue-light text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">Testimonials</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from our clients about their experience working with COS and
            the impact of our AI-powered construction platform.
          </p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Quote className="w-8 h-8 text-cos-orange/20 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-cos-blue">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-cos-orange">
                      {testimonial.project}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-cos-orange to-cos-orange-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h3 className="text-3xl sm:text-4xl font-bold">
            Ready to Become Our Next Success Story?
          </h3>
          <p className="text-lg text-white/80">
            Join hundreds of satisfied clients who have transformed their
            construction projects with COS.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-cos-orange-dark px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all group"
          >
            Get Started Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
