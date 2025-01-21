import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
	port: string | undefined;
	env: string | undefined;
}

function loadAppConfig(): AppConfig {
	const { APP_PORT, APP_ENV, APP_URL } = process.env;
	return {
		port: APP_PORT || '',
		env: APP_ENV || ''
	};
}

export { AppConfig, loadAppConfig };
