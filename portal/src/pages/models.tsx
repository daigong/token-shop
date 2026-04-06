import Head from 'next/head';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { normalizePricingResponse, type PricingApiResponse } from '@/features/models/pricing';
import { ModelsCTA } from '@/sections/ModelsCTA';
import { ModelsCatalog } from '@/sections/ModelsCatalog';
import { ModelsHero } from '@/sections/ModelsHero';

interface ModelsPageProps {
  models: ReturnType<typeof normalizePricingResponse>;
  defaultGroup: string;
  fetchedAt: string;
  fetchError: string | null;
}

export default function ModelsPage({
  models,
  defaultGroup,
  fetchedAt,
  fetchError,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const allTags = new Set(models.flatMap((model) => model.tag_list));
  const vendorCount = new Set(models.map((model) => model.vendor_name)).size;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <Head>
        <title>模型中心 - 企业级模型选型与价格总览</title>
        <meta
          name="description"
          content="集中展示平台已接入模型、适用场景与价格口径，帮助企业团队更快完成模型筛选、能力比较与采购沟通。"
        />
      </Head>

      <Header />

      <main>
        <ModelsHero
          modelCount={models.length}
          vendorCount={vendorCount}
          tagCount={allTags.size}
          defaultGroup={defaultGroup}
          fetchedAt={fetchedAt}
          hasError={Boolean(fetchError)}
        />
        <ModelsCatalog models={models} fetchError={fetchError} />
        <ModelsCTA />
      </main>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ModelsPageProps> = async () => {
  const endpoint = 'http://43.108.19.237:3100/api/pricing';
  const fetchedAt = new Date().toISOString();

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = (await response.json()) as PricingApiResponse;
    const models = normalizePricingResponse(payload);
    const defaultGroup = payload.auto_groups?.[0] || Object.keys(payload.usable_group || {})[0] || 'default';

    return {
      props: {
        models,
        defaultGroup,
        fetchedAt,
        fetchError: null,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown pricing error';

    return {
      props: {
        models: [],
        defaultGroup: 'default',
        fetchedAt,
        fetchError: message,
      },
    };
  }
};
