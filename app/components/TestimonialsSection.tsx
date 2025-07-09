const testimonials = [
  {
    stars: 5,
    text: `“Homework AI saved me so much time on my math assignments. The step-by-step explanations actually helped me understand the concepts!”`,
    name: "Sarah J.",
    role: "High School Junior",
  },
  {
    stars: 5,
    text: `“As a parent, I love how Homework AI helps my daughter learn while doing homework. It’s like having a personal tutor available 24/7.”`,
    name: "Michael T.",
    role: "Parent of 9th Grader",
  },
  {
    stars: 5,
    text: `“I use Homework AI to quickly check my work before submitting assignments. The explanations are clearer than my textbook!”`,
    name: "Emma R.",
    role: "College Freshman",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex mb-2">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        What Our Users Say
      </h2>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-8 w-full sm:w-80 flex flex-col"
          >
            <Stars count={t.stars} />
            <p className="text-gray-700 mb-6">{t.text}</p>
            <div>
              <div className="font-bold text-gray-900">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}