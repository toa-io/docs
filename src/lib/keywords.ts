// keywords of the pages, by route
export const keywords: Record<string, string> = {
	'/': 'Toa, application runtime, low-code, eventual consistency, distributed systems',
	'/model/':
		'Toa, mental model, concepts, architecture, components, operations, events, guarantees',

	'/model/foundations/separation/':
		'product–platform separation, business logic, low-code, operations, declarations',
	'/model/foundations/overview/':
		'components, compositions, Context, logical boundaries, distribution, deployment',
	'/model/foundations/component/':
		'component, entity state, state ownership, operations, operation context, events, receivers',
	'/model/foundations/prototype/':
		'prototype, inheritance, generic prototype, refinement, forwarding',
	'/model/foundations/consistency/':
		'eventual consistency, atomic change, events, guarantees, domain modeling',

	'/model/basics/calls/': 'calls, logical addresses, input/query segregation, query, local calls',
	'/model/basics/replies/': 'replies, output, errors, exceptions, error handling',
	'/model/basics/operations/':
		'operations, computations, effects, scopes, safety, unmanaged operations',
	'/model/basics/state/':
		'state, identity, validation, versions, optimistic concurrency control, guards, deletion',
	'/model/basics/events/':
		'events, committed changes, conditions, payloads, trailers, receivers, external events',
	'/model/basics/context/': 'operation context, remote calls, configuration, aspects',

	'/model/reliability/delivery/':
		'delivery, distributed exception handling, retries, at-least-once',
	'/model/reliability/outbox/':
		'committed events, transactional outbox, at-least-once delivery, unordered events, recovery',
	'/model/reliability/idempotency/': 'idempotency, call identity, repeated calls, deduplication',
	'/model/reliability/tasks/': 'tasks, asynchronous calls, background work, delivery guarantees',
	'/model/reliability/continuity/': 'continuity, resumable effects, steps, recovery',
	'/model/reliability/chains/': 'call chains, call path, cycle detection, read-only chains',

	'/model/flow/cadence/': 'cadence, scheduling, pulses, delayed calls',
	'/model/flow/collections/':
		'collection streams, large collections, change streams, incremental reading',
	'/model/flow/streams/': 'streamed calls, streaming replies, streaming input',
	'/model/flow/stateful/': 'stateful operations, process memory, process-addressed calls',

	'/model/edge/resources/': 'HTTP gateway, resources, resource tree, directives, routes, REST',
	'/model/edge/identity/':
		'identity, credentials, authentication, authorization, access control, roles',
	'/model/edge/realtime/': 'realtime, event routing, streams, server-sent events, subscriptions',
	'/model/edge/procedures/': 'procedures, RPC, tools, model tool calling, MCP',
	'/model/edge/files/': 'files, storages, entries, uploads, workflows',

	'/model/platform/extensions/': 'extensions, aspects, services, manifests, annotations',
	'/model/platform/configuration/':
		'configuration, configuration contract, value layers, secrets, runtime changes',
	'/model/platform/telemetry/': 'telemetry, traces, logs, metrics, observability',
	'/model/platform/introspection/': 'introspection, topology, declared topology, observed topology',
	'/model/platform/atomicity/': 'shared decisions, replicas, partitioning, locking, metering',
	'/model/platform/connectors/':
		'connectors, bridges, storages, bindings, capabilities, guarantees',

	'/model/running/environments/':
		'environments, Context, staging, production, environment variation',
	'/model/running/compositions/': 'compositions, unit of deployment, scaling, grouping, services',
	'/model/running/contracts/': 'contracts, versions, compatibility, rolling upgrade',
	'/model/running/deployment/':
		'deployment, tooling, container images, secrets, migrations, Kubernetes',
	'/model/running/regions/': 'regions, multi-region, convergence, conflicts',
	'/model/running/halt/': 'halt, graceful stop, deployment'
};
