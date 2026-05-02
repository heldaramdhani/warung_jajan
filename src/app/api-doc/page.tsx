import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from './react-swagger';

export const metadata = {
  title: 'API Documentation',
  description: 'Dokumentasi REST API Warung Jajan',
};

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container max-w-7xl mx-auto p-4 bg-white min-h-screen">
      <ReactSwagger spec={spec} />
    </section>
  );
}
