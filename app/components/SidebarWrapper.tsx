'use client'
export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Header always on top */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <h1 className="text-2xl font-bold">Homework AI</h1>
        </div>
        <div className="text-sm md:text-base text-white/90">
          Your Intelligent Study Assistant
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-10">
        {children}
      </main>
    </>
  )
}