// laconic anchors of the headings, by route and heading text;
// a heading that is not listed keeps the slug of its text
export const anchors: Record<string, Record<string, string>> = {
	'/model/': {
		'Chapter I. Foundations': 'foundations',
		'Chapter II. Basics': 'basics',
		'Chapter III. Reliability': 'reliability',
		'Chapter IV. Time and Flow': 'flow',
		'Chapter V. The Edge': 'edge',
		'Chapter VI. Platform Services': 'platform',
		'Chapter VII. Running': 'running'
	},

	'/userspace/': {
		'Chapter I. First Steps': 'start',
		'Chapter II. Business Logic': 'logic',
		'Chapter III. The API': 'api',
		'Chapter IV. Users and Access': 'access',
		'Chapter V. Platform Features': 'platform',
		'Chapter VI. Shipping': 'shipping',
		'Chapter VII. Patterns': 'patterns'
	},

	'/model/foundations/separation/': {
		'The problem': 'problem',
		'Operations and declarations': 'declarations'
	},
	'/model/foundations/overview/': {
		'Logical architecture: components': 'components',
		'Physical architecture: compositions': 'compositions',
		'Monolith and microservices become configurations': 'configurations',
		'One composition: monolithic deployment': 'monolith',
		'One composition per component: microservice deployment': 'microservices',
		'Mixed compositions: macroservice deployment': 'mixed',
		'The Context: application and environment': 'context',
		'Location-transparent calls': 'calls',
		'Integration through events': 'events',
		'The gateway is another physical edge': 'gateway'
	},
	'/model/foundations/component/': {
		State: 'state',
		Behavior: 'behavior',
		Operations: 'operations',
		'Transition: change the current state': 'transition',
		'Observation: read the current state': 'observation',
		'Assignment: describe a change': 'assignment',
		'Context: the gateway to the runtime': 'context',
		'Events: publishing and receiving changes': 'events'
	},
	'/model/foundations/prototype/': {
		'The generic prototype': 'generic',
		'Refinement and forwarding': 'refinement'
	},
	'/model/foundations/consistency/': {
		'One atomic change at a time': 'atomicity',
		'Agreement through events': 'agreement',
		'What the runtime guarantees': 'guarantees',
		'What the application models': 'modeling',
		'Why this model': 'why'
	},

	'/model/basics/calls/': {
		'Input/Query Segregation': 'segregation',
		Input: 'input',
		Query: 'query',
		'Local calls': 'local',
		'Calls nobody waits for': 'tasks'
	},
	'/model/basics/replies/': {
		Output: 'output',
		'An error is an answer': 'errors',
		'An exception is a failure': 'exceptions',
		'What a caller receives': 'caller',
		'Why the distinction matters': 'why'
	},
	'/model/basics/operations/': {
		Types: 'types',
		Transition: 'transition',
		Creation: 'creation',
		'Optimistic concurrency control': 'occ',
		'Pessimistic concurrency control': 'pcc',
		'Deciding not to commit': 'discard',
		Computation: 'computation',
		Effect: 'effect',
		Scope: 'scope',
		Safety: 'safety',
		'Genuine operations': 'genuine',
		'Leaving the model': 'exceptions',
		Unmanaged: 'unmanaged',
		Stateful: 'stateful'
	},
	'/model/basics/state/': {
		'The schema': 'schema',
		'System properties': 'system',
		Guards: 'guards',
		'Associated entities': 'associated',
		Deletion: 'deletion'
	},
	'/model/basics/events/': {
		'A consequence of a commit': 'commit',
		Condition: 'condition',
		Payload: 'payload',
		Trailers: 'trailers',
		'Inherited events': 'inherited',
		Receivers: 'receivers',
		'Direction of dependency': 'dependency',
		'Events from outside': 'external',
		'What delivery promises': 'delivery'
	},
	'/model/basics/context/': {
		'What it provides': 'provides',
		Aspects: 'aspects',
		'Why one door': 'why'
	},

	'/model/reliability/delivery/': {
		'Distributed exception handling': 'exceptions',
		'Two situations': 'situations',
		'When somebody is waiting': 'waiting',
		'When nobody is waiting': 'unattended',
		'At least once': 'at-least-once',
		'What this asks of an operation': 'obligation',
		Summary: 'summary'
	},
	'/model/reliability/outbox/': {
		'The gap': 'gap',
		'One commit': 'commit',
		'What a subscriber can rely on': 'guarantees',
		'What it requires': 'requirements',
		'More than events': 'beyond'
	},
	'/model/reliability/inbox/': {
		'The identity of a call': 'identity',
		'What once gives': 'once',
		'What it does not give': 'limits',
		'Which operations can ask': 'eligibility',
		'Calls from outside': 'external'
	},
	'/model/reliability/tasks/': {
		'Why not just an event': 'why',
		'What an accepted task can count on': 'guarantees',
		'What it asks': 'obligation',
		'What cannot be a task': 'limits',
		'Tasks and component boundaries': 'boundaries'
	},
	'/model/reliability/continuity/': {
		'Picking up where it failed': 'resuming',
		'What a step is': 'step',
		'What can be counted on': 'guarantees',
		'What cannot': 'limits',
		'Where it applies': 'scope'
	},
	'/model/reliability/chains/': {
		Cycles: 'cycles',
		'Readonly chains': 'read-only',
		'Reading methods of the gateway': 'gateway',
		'What a chain is not': 'limits',
		'The common idea': 'idea'
	},

	'/model/flow/cadence/': {
		Pulse: 'pulse',
		'Spreading a cycle': 'spreading',
		'What a pulse promises': 'pulse-guarantees',
		'In one replica, or in every one': 'replica',
		Schedule: 'schedule',
		'What a schedule promises': 'schedule-guarantees',
		'In one region, or in every one': 'regions',
		Delay: 'delay',
		'How late is too late': 'lateness',
		'How precise a delay is': 'discreteness',
		'What a delay promises': 'delay-guarantees',
		'Time and chains': 'chains',
		'What it rests on': 'atomicity'
	},
	'/model/flow/collections/': {
		'Reading without holding': 'reading',
		'Reading again': 'changes',
		Windows: 'windows',
		'What a reader can rely on': 'guarantees',
		'What it requires': 'requirements',
		'Streams and events': 'events'
	},
	'/model/flow/streams/': {
		'Streamed replies': 'replies',
		'Streamed input': 'input',
		'What streamed input gives up': 'tradeoffs',
		'When it is the right tool': 'usage',
		'The general point': 'idea'
	},
	'/model/flow/stateful/': {
		'Addressing a process': 'addressing',
		'What an addressed call gives up': 'tradeoffs',
		'Keeping the exception small': 'containment',
		'Process memory': 'memory'
	},

	'/model/edge/resources/': {
		'Declaring resources': 'declaration',
		'Requests become calls': 'requests',
		'What a route may narrow': 'narrowing',
		Directives: 'directives',
		'The gateway is not the application': 'gateway',
		'A description of itself': 'description'
	},
	'/model/edge/identity/': {
		Identity: 'identity',
		Authentication: 'authentication',
		'Linking identities to the domain': 'linking',
		Authorization: 'authorization',
		'Ownership by route': 'ownership',
		Roles: 'roles',
		'Why operations do not check': 'why',
		'Acting on behalf of an identity': 'delegation'
	},
	'/model/edge/realtime/': {
		Keys: 'keys',
		'What a stream exposes': 'exposure',
		'Serving a stream': 'serving',
		'One stream per interest': 'interest',
		'What a reader can rely on': 'guarantees',
		'Realtime and collection streams': 'collections'
	},
	'/model/edge/procedures/': {
		Procedures: 'procedures',
		Tools: 'tools',
		'The same rules': 'rules',
		'Describing what is offered': 'description',
		'Why this is possible': 'why'
	},
	'/model/edge/files/': {
		Storages: 'storages',
		Entries: 'entries',
		'Uploads without operations': 'uploads',
		Workflows: 'workflows',
		Variants: 'variants',
		'Files and streamed calls': 'streams'
	},

	'/model/platform/extensions/': {
		'What an extension contributes': 'contributions',
		'Two places to declare': 'declaration',
		'Supplied extensions': 'supplied',
		'The same mechanism for everyone': 'mechanism',
		'Extensions and guarantees': 'guarantees'
	},
	'/model/platform/configuration/': {
		'A contract for configuration': 'contract',
		'Layers of values': 'layers',
		Secrets: 'secrets',
		'Changing values while running': 'changes',
		'Schema changes': 'schema',
		'What configuration is not': 'limits'
	},
	'/model/platform/telemetry/': {
		Traces: 'traces',
		Sampling: 'sampling',
		Logs: 'logs',
		Metrics: 'metrics',
		'Where it goes': 'export',
		'What the application adds': 'application'
	},
	'/model/platform/introspection/': {
		'Declared and observed': 'topology',
		'What is and is not collected': 'collected',
		Uses: 'uses',
		'Why the platform can do this': 'why'
	},
	'/model/platform/atomicity/': {
		Partitioning: 'partitioning',
		Locking: 'locking',
		Metering: 'metering',
		'What does not need them': 'unneeded',
		'Their limits': 'limits'
	},
	'/model/platform/connectors/': {
		'Bridges: how logic runs': 'bridges',
		'Storages: how state is kept': 'storages',
		'Bindings: how calls travel': 'bindings',
		'Why the parts are separate': 'why',
		'An opinionated default': 'default'
	},

	'/model/running/environments/': {
		'One source': 'source',
		'Variation by suffix': 'suffix',
		'What an environment can change': 'variation',
		'Derived environments': 'derived',
		'The local environment': 'local',
		'Environments and guarantees': 'guarantees'
	},
	'/model/running/compositions/': {
		'The unit of deployment and scale': 'unit',
		'What grouping decides': 'grouping',
		Replicas: 'replicas',
		'Services in a composition': 'services',
		'Leaving things out': 'omission',
		Resources: 'resources'
	},
	'/model/running/contracts/': {
		'A contract is given, not asked for': 'contract',
		Versions: 'versions',
		'While two versions serve': 'rolling',
		'Changes that cannot be rolled': 'breaking',
		'Events from outside': 'external',
		'Why this matters': 'why'
	},
	'/model/running/deployment/': {
		'What a process needs': 'process',
		'The supplied tooling': 'tooling',
		'Derived, not written': 'derived',
		'Images follow content': 'images',
		Secrets: 'secrets',
		Migrations: 'migrations',
		'The single-process form': 'single-process',
		'What deployment does not decide': 'limits'
	},
	'/model/running/regions/': {
		'The same model, one level up': 'model',
		'Resolving concurrent writes': 'conflicts',
		'What convergence guarantees': 'guarantees',
		'What it asks of the application': 'obligation',
		'Regions and environments': 'environments',
		'What it requires': 'requirements'
	},
	'/model/running/halt/': {
		'What a halt does': 'effect',
		'What it gives': 'guarantees',
		'What it refuses to do': 'refusals',
		'What it asks of components': 'obligation',
		'Rolling what cannot be rolled': 'breaking',
		'A tool to rehearse': 'rehearsal'
	}
};
