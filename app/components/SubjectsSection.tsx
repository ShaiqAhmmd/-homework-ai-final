// app/components/SubjectsSection.tsx

const subjects = [
  {
    icon: "👦🏻",
    title: "Math",
    desc: "Algebra • Calculus",
  },
  {
    icon: "👩‍🔬",
    title: "Science",
    desc: "Physics • Chemistry",
  },
  {
    icon: "🧑‍🏫",
    title: "History",
    desc: "World • US",
  },
  {
    icon: "👩‍🎓",
    title: "Literature",
    desc: "Analysis • Essays",
  },
  {
    icon: "🧑‍🗣️",
    title: "Languages",
    desc: "Spanish • French",
  },
];

export default function SubjectsSection() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Subjects We Cover
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {subjects.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-xl shadow p-8 flex flex-col items-center w-56 transition hover:scale-105"
          >
            <div className="text-5xl mb-3">{s.icon}</div>
            <div className="font-bold text-lg text-gray-900 mb-1">{s.title}</div>
            <div className="text-gray-500 text-sm">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}