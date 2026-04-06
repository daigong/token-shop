export interface PricingVendor {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

export interface PricingModelRaw {
  model_name: string;
  description?: string;
  icon?: string;
  tags?: string;
  vendor_id?: number;
  quota_type: number;
  model_ratio: number;
  model_price: number;
  owner_by: string;
  completion_ratio: number;
  cache_ratio?: number | null;
  create_cache_ratio?: number | null;
  image_ratio?: number | null;
  audio_ratio?: number | null;
  audio_completion_ratio?: number | null;
  enable_groups: string[];
  supported_endpoint_types: string[];
  pricing_version?: string;
}

export interface PricingApiResponse {
  success: boolean;
  data: PricingModelRaw[];
  vendors: PricingVendor[];
  group_ratio: Record<string, number>;
  usable_group: Record<string, string>;
  supported_endpoint: Record<string, { path: string; method: string }>;
  auto_groups: string[];
  pricing_version?: string;
}

export interface PricingModel extends PricingModelRaw {
  key: string;
  vendor_name: string;
  vendor_description: string;
  tag_list: string[];
  default_group: string;
  default_group_ratio: number;
  search_text: string;
}

export interface ModelPriceSummary {
  billingLabel: string;
  fixedPrice?: string;
  inputPrice?: string;
  outputPrice?: string;
  cachePrice?: string;
  audioInputPrice?: string;
  audioOutputPrice?: string;
  note: string;
}

const INPUT_BASE_PRICE_USD = 2;

const splitTags = (value?: string) => {
  if (!value) {
    return [];
  }

  return value
    .split(/[,，|/]+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const trimTrailingZeros = (value: string) => value.replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/g, '');

export const formatUsdPrice = (value: number, suffix: string) => {
  if (!Number.isFinite(value)) {
    return '-';
  }

  const digits = value >= 100 ? 0 : value >= 10 ? 2 : 3;
  return `$${trimTrailingZeros(value.toFixed(digits))} ${suffix}`;
};

const normalizeVendorName = (model: PricingModelRaw, vendor?: PricingVendor) => {
  if (vendor?.name) {
    return vendor.name;
  }

  if (model.owner_by) {
    return model.owner_by;
  }

  const [namespace] = model.model_name.split('/');
  return namespace || '平台模型';
};

export const normalizePricingResponse = (response: PricingApiResponse): PricingModel[] => {
  const vendorMap = new Map((response.vendors || []).map((vendor) => [vendor.id, vendor]));
  const defaultGroup = response.auto_groups?.[0] || Object.keys(response.usable_group || {})[0] || 'default';
  const defaultGroupRatio = response.group_ratio?.[defaultGroup] ?? 1;

  return [...(response.data || [])]
    .map((model) => {
      const vendor = model.vendor_id ? vendorMap.get(model.vendor_id) : undefined;
      const vendorName = normalizeVendorName(model, vendor);
      const tagList = splitTags(model.tags);

      return {
        ...model,
        key: model.model_name,
        vendor_name: vendorName,
        vendor_description: vendor?.description || '',
        tag_list: tagList,
        default_group: defaultGroup,
        default_group_ratio: defaultGroupRatio,
        search_text: [model.model_name, model.description, vendorName, model.tags]
          .filter(Boolean)
          .join(' ')
          .toLowerCase(),
      };
    })
    .sort((left, right) => left.model_name.localeCompare(right.model_name, 'zh-CN'));
};

export const getModelPriceSummary = (model: PricingModel): ModelPriceSummary => {
  const appliedRatio = model.default_group_ratio || 1;

  if (model.quota_type === 1) {
    return {
      billingLabel: '按次计费',
      fixedPrice: formatUsdPrice(model.model_price * appliedRatio, '/ 次'),
      note: `按 ${model.default_group} 分组展示`,
    };
  }

  const inputBase = model.model_ratio * INPUT_BASE_PRICE_USD * appliedRatio;
  const hasValue = (value?: number | null) => typeof value === 'number' && Number.isFinite(value);

  return {
    billingLabel: '按量计费',
    inputPrice: formatUsdPrice(inputBase, '/ M Tokens'),
    outputPrice: formatUsdPrice(inputBase * model.completion_ratio, '/ M Tokens'),
    cachePrice: hasValue(model.cache_ratio)
      ? formatUsdPrice(inputBase * Number(model.cache_ratio), '/ M Tokens')
      : undefined,
    audioInputPrice: hasValue(model.audio_ratio)
      ? formatUsdPrice(inputBase * Number(model.audio_ratio), '/ M Tokens')
      : undefined,
    audioOutputPrice: hasValue(model.audio_ratio) && hasValue(model.audio_completion_ratio)
      ? formatUsdPrice(
          inputBase * Number(model.audio_ratio) * Number(model.audio_completion_ratio),
          '/ M Tokens',
        )
      : undefined,
    note: `按 ${model.default_group} 分组展示`,
  };
};

export const getTopTags = (models: PricingModel[], limit = 10) => {
  const counter = new Map<string, number>();

  models.forEach((model) => {
    model.tag_list.forEach((tag) => {
      counter.set(tag, (counter.get(tag) || 0) + 1);
    });
  });

  return [...counter.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], 'zh-CN'))
    .slice(0, limit)
    .map(([tag]) => tag);
};

export const groupModelsByVendor = (models: PricingModel[]) => {
  const vendorGroups = new Map<string, PricingModel[]>();

  models.forEach((model) => {
    const list = vendorGroups.get(model.vendor_name) || [];
    list.push(model);
    vendorGroups.set(model.vendor_name, list);
  });

  return [...vendorGroups.entries()]
    .map(([vendorName, vendorModels]) => ({
      vendorName,
      description: vendorModels.find((item) => item.vendor_description)?.vendor_description || '',
      count: vendorModels.length,
      models: vendorModels.sort((left, right) => left.model_name.localeCompare(right.model_name, 'zh-CN')),
    }))
    .sort((left, right) => right.count - left.count || left.vendorName.localeCompare(right.vendorName, 'zh-CN'));
};
