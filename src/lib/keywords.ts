// keywords of the pages, by route
export const keywords: Record<string, string> = {
	'/': 'Toa, application runtime, low-code, eventual consistency, distributed systems',

	'/foundations/separation/':
		'product–platform separation, business logic, low-code, operations, declarations',
	'/foundations/overview/':
		'components, compositions, Context, logical boundaries, distribution, deployment',
	'/foundations/component/':
		'component, entity state, state ownership, operations, operation context, events, receivers',
	'/foundations/prototype/': 'prototype, inheritance, generic prototype, refinement, forwarding',
	'/foundations/consistency/':
		'eventual consistency, atomic change, events, guarantees, domain modeling',

	'/basics/calls/': 'calls, logical addresses, input/query segregation, query, local calls',
	'/basics/replies/': 'replies, output, errors, exceptions, error handling',
	'/basics/operations/': 'operations, computations, effects, scopes, safety, unmanaged operations',
	'/basics/state/':
		'state, identity, validation, versions, optimistic concurrency control, guards, deletion',
	'/basics/events/':
		'events, committed changes, conditions, payloads, trailers, receivers, external events',
	'/basics/context/': 'operation context, remote calls, configuration, aspects',

	'/reliability/delivery/': 'delivery, distributed exception handling, retries, at-least-once',
	'/reliability/outbox/':
		'committed events, transactional outbox, at-least-once delivery, unordered events, recovery',
	'/reliability/idempotency/': 'idempotency, call identity, repeated calls, deduplication',
	'/reliability/tasks/': 'tasks, asynchronous calls, background work, delivery guarantees',
	'/reliability/continuity/': 'continuity, resumable effects, steps, recovery',
	'/reliability/chains/': 'call chains, call path, cycle detection, read-only chains',

	'/flow/cadence/': 'cadence, scheduling, pulses, delayed calls',
	'/flow/collections/':
		'collection streams, large collections, change streams, incremental reading',
	'/flow/streams/': 'streamed calls, streaming replies, streaming input',
	'/flow/stateful/': 'stateful operations, process memory, process-addressed calls',

	'/edge/resources/': 'HTTP gateway, resources, resource tree, directives, routes, REST',
	'/edge/identity/': 'identity, credentials, authentication, authorization, access control, roles',
	'/edge/realtime/': 'realtime, event routing, streams, server-sent events, subscriptions',
	'/edge/procedures/': 'procedures, RPC, tools, model tool calling, MCP',
	'/edge/files/': 'files, storages, entries, uploads, workflows',

	'/platform/extensions/': 'extensions, aspects, services, manifests, annotations',
	'/platform/configuration/':
		'configuration, configuration contract, value layers, secrets, runtime changes',
	'/platform/telemetry/': 'telemetry, traces, logs, metrics, observability',
	'/platform/introspection/': 'introspection, topology, declared topology, observed topology',
	'/platform/atomicity/': 'shared decisions, replicas, partitioning, locking, metering',
	'/platform/connectors/': 'connectors, bridges, storages, bindings, capabilities, guarantees',

	'/running/environments/': 'environments, Context, staging, production, environment variation',
	'/running/compositions/': 'compositions, unit of deployment, scaling, grouping, services',
	'/running/contracts/': 'contracts, versions, compatibility, rolling upgrade',
	'/running/deployment/': 'deployment, tooling, container images, secrets, migrations, Kubernetes',
	'/running/regions/': 'regions, multi-region, convergence, conflicts',
	'/running/halt/': 'halt, graceful stop, deployment'
};
