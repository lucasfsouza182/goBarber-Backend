import { container } from 'tsyringe';

import IChacheProvider from './models/IChacheProvider';
import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<IChacheProvider>('CacheProvider', providers.redis);
