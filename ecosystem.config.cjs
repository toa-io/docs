module.exports = {
	apps: [
		{
			name: 'toa',
			script: 'npm',
			args: 'run dev -- --host --port 5174 --strictPort',
			env: {
				NODE_ENV: 'development'
			},
			autorestart: true,
			max_memory_restart: '1G'
		}
	]
};
