import { useMemo, useState } from 'react';

import type { PricingModel } from '@/features/models/pricing';
import {
  getModelPriceSummary,
  getTopTags,
  groupModelsByVendor,
} from '@/features/models/pricing';

interface ModelsCatalogProps {
  models: PricingModel[];
  fetchError?: string | null;
}

type BillingFilter = 'all' | 'ratio' | 'fixed';

const getVendorInitials = (name: string) => name.replace(/[^A-Za-z\u4e00-\u9fa5]/g, '').slice(0, 2).toUpperCase() || 'AI';

export const ModelsCatalog = ({ models, fetchError }: ModelsCatalogProps) => {
  const [keyword, setKeyword] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedBilling, setSelectedBilling] = useState<BillingFilter>('all');

  const topTags = useMemo(() => getTopTags(models, 8), [models]);
  const vendors = useMemo(
    () => [...new Set(models.map((model) => model.vendor_name))].sort((left, right) => left.localeCompare(right, 'zh-CN')),
    [models],
  );

  const filteredModels = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return models.filter((model) => {
      if (selectedVendor !== 'all' && model.vendor_name !== selectedVendor) {
        return false;
      }

      if (selectedTag !== 'all' && !model.tag_list.includes(selectedTag)) {
        return false;
      }

      if (selectedBilling === 'ratio' && model.quota_type !== 0) {
        return false;
      }

      if (selectedBilling === 'fixed' && model.quota_type !== 1) {
        return false;
      }

      if (normalizedKeyword && !model.search_text.includes(normalizedKeyword)) {
        return false;
      }

      return true;
    });
  }, [keyword, models, selectedBilling, selectedTag, selectedVendor]);

  const vendorSeries = useMemo(() => groupModelsByVendor(models).slice(0, 6), [models]);

  return (
    <>
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">先缩小范围，再做深入比较</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              企业选型往往不是单看模型能力，而是结合场景、成本与接入方式综合判断。你可以先按厂商、标签和计费方式快速筛出候选模型，再进入下一步方案评估。
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.6fr))]">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">搜索模型</span>
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="搜索模型名称、厂商或场景标签"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">厂商</span>
                <select
                  value={selectedVendor}
                  onChange={(event) => setSelectedVendor(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="all">全部厂商</option>
                  {vendors.map((vendor) => (
                    <option key={vendor} value={vendor}>
                      {vendor}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">场景标签</span>
                <select
                  value={selectedTag}
                  onChange={(event) => setSelectedTag(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="all">全部标签</option>
                  {topTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">计费方式</span>
                <select
                  value={selectedBilling}
                  onChange={(event) => setSelectedBilling(event.target.value as BillingFilter)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="all">全部</option>
                  <option value="ratio">按量计费</option>
                  <option value="fixed">按次计费</option>
                </select>
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-slate-700">热门标签</span>
              {topTags.map((tag) => {
                const active = selectedTag === tag;

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(active ? 'all' : tag)}
                    className={`rounded-full px-4 py-2 transition ${
                      active
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-slate-900'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 text-sm text-slate-500">
            <div>共找到 {filteredModels.length} 个可选模型</div>
            <div>价格默认按平台默认分组展示，仅作为当前口径下的参考价格</div>
          </div>

          {fetchError ? (
            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900">
              当前价格数据暂时无法读取：{fetchError}。你仍可先浏览模型目录；如需最新价格与可用配置，请联系商务团队。
            </div>
          ) : null}

          <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredModels.map((model) => {
              const price = getModelPriceSummary(model);

              return (
                <article
                  key={model.key}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700">
                        {getVendorInitials(model.vendor_name)}
                      </div>
                      <div className="text-sm font-medium text-blue-600">{model.vendor_name}</div>
                      <h3 className="mt-2 text-xl font-bold text-slate-900">{model.model_name}</h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        model.quota_type === 1
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-violet-50 text-violet-700'
                      }`}
                    >
                      {price.billingLabel}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {model.tag_list.length > 0 ? (
                      model.tag_list.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">企业可用模型</span>
                    )}
                  </div>

                  <p className="mt-5 flex-1 text-sm leading-7 text-slate-600">
                    {model.description || '该模型已接入平台，可用于企业应用验证、场景测试与价格对比。'}
                  </p>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {price.fixedPrice ? (
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">固定价格</div>
                          <div className="mt-2 text-2xl font-bold text-slate-900">{price.fixedPrice}</div>
                        </div>
                        <div className="text-xs text-slate-500">{price.note}</div>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">输入价格</div>
                          <div className="mt-2 text-xl font-bold text-slate-900">{price.inputPrice}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-[0.18em] text-slate-400">输出价格</div>
                          <div className="mt-2 text-xl font-bold text-slate-900">{price.outputPrice}</div>
                        </div>
                      </div>
                    )}

                    {(price.cachePrice || price.audioInputPrice || price.audioOutputPrice) && !price.fixedPrice ? (
                      <div className="mt-4 grid gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:grid-cols-2">
                        {price.cachePrice ? <div>缓存写入：{price.cachePrice}</div> : null}
                        {price.audioInputPrice ? <div>语音输入：{price.audioInputPrice}</div> : null}
                        {price.audioOutputPrice ? <div>语音输出：{price.audioOutputPrice}</div> : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500">
                    <span>分组：{model.enable_groups.join(' / ') || model.default_group}</span>
                    <span>端点：{model.supported_endpoint_types.join(' / ') || 'openai'}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {!filteredModels.length ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
              <div className="text-lg font-semibold text-slate-900">没有找到符合条件的模型</div>
              <p className="mt-3 text-sm leading-7 text-slate-500">你可以尝试放宽筛选条件，或直接联系团队，我们会根据业务场景、预算范围与部署要求推荐候选模型。</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">按厂商与系列浏览，建立更清晰的选型框架</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              如果你已经有偏好的模型生态，可以直接从厂商或系列切入。这样更适合做供应商比较、能力分层和成本范围判断，也方便销售与客户在沟通中快速对齐候选名单。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {vendorSeries.map((series) => (
              <div key={series.vendorName} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-blue-600">系列 / 厂商</div>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">{series.vendorName}</h3>
                  </div>
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">{series.count} 个模型</div>
                </div>

                <p className="mt-5 min-h-[72px] text-sm leading-7 text-slate-600">
                  {series.description || `${series.vendorName} 已有多个模型接入平台，便于团队围绕能力方向、成本范围与候选名单做进一步比较。`}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {series.models.slice(0, 4).map((model) => (
                    <span key={model.model_name} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                      {model.model_name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
