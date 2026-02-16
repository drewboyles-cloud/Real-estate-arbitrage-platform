const stats = [
  { value: "$2.4B+", label: "Deal volume analyzed" },
  { value: "12.8%", label: "Avg. investor return" },
  { value: "50+", label: "Markets tracked" },
  { value: "3,200+", label: "Active investors" },
];

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center md:py-12">
            <p className="font-mono text-3xl font-bold text-foreground md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
