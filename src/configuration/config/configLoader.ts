export type Configuration = {
  configVersion: string;
  host: string;
};

const configLoader = (): Configuration => {
  const configVersion = loadEnvConfiguration<string>('REACT_APP_CONFIG_VERSION', 'NOTFOUND');
  const host = loadEnvConfiguration<string>('REACT_APP_HOST', 'NOTFOUND');
  return {
    configVersion,
    host,
  };
};

const loadEnvConfiguration = <T>(configString: keyof NodeJS.ProcessEnv, defaultValue: T): T => {
  const config = process.env[configString];

  if (!config) {
    console.warn(
      'ENV CONFIGURATION LOADING FAILED, FALLBACK TO DEFAULT',
      configString,
      process.env,
    );
    return defaultValue as T;
  }

  return config as unknown as T;
};

export const configuration = configLoader();
