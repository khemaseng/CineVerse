export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <section className="pt-24 pb-16 min-h-screen">
      {children}
    </section>
  );
}