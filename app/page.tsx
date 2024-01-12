import useTemplate from '@/hooks/useTemplate';

export default function Home() {
  const { fetchTemplate } = useTemplate();

  fetchTemplate();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hellow world
    </main>
  );
}
