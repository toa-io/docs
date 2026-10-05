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
	'/model/running/halt/': 'halt, graceful stop, deployment',

	'/userspace/':
		'Toa, userspace, building applications, guide, components, operations, gateway, deployment',

	'/userspace/start/project/':
		'project structure, context.toa.yaml, manifest.toa.yaml, components, template',
	'/userspace/start/component/':
		'first component, entity, generic prototype, transit, observe, transition, tutorial',
	'/userspace/start/running/':
		'toa env, toa map, toa compose, toa call, toa mono, local development, composition',

	'/userspace/components/manifest/':
		'manifest, entity, JSON Schema, blank, system properties, VERSION, associated, moments, epoch-millis',
	'/userspace/components/operations/':
		'operations, transition, observation, assignment, computation, effect, unmanaged, scope, concurrency, input, output',
	'/userspace/components/errors/':
		'errors, exceptions, new Error, error codes, DISCARD, 422, refusal',
	'/userspace/components/requests/':
		'request, query, criteria, RSQL, sort, limit, omit, projection, version, context.remote, context.local',
	'/userspace/components/prototype/':
		'prototype, inheritance, transit, observe, enumerate, assign, terminate, forward, created, updated, deleted',
	'/userspace/components/events/':
		'events, condition, payload, trailers, TRAILERS, origin, state, publishing',
	'/userspace/components/receivers/':
		'receivers, events, request adapter, condition, arguments, foreign events, binding, source',
	'/userspace/components/context/':
		'operation context, context.local, context.remote, context.id, context.now, context.random, aspects, configuration',
	'/userspace/components/guards/': 'guards, invariants, origin, state, validation',
	'/userspace/components/lifecycle/':
		'run commands, rc, preflight, settle, ready, dispose, pause, resume, context.state, lifecycle',
	'/userspace/components/typescript/':
		'TypeScript, toa types, generated types, import type, erasable syntax, tsconfig, JSDoc',
	'/userspace/components/migrations/':
		'migrations, indexes, unique index, ttl, partial index, update, MongoDB, rolling update',

	'/userspace/reliability/delivery/':
		'delivery, retry, exception, at-least-once, parked, comq.parked, dead letter, backoff, receiver, repeat',
	'/userspace/reliability/committed-events/':
		'outbox, events, atomicity, trailers, TRAILERS, VERSION, ordering, origin, state, retention, replica set',
	'/userspace/reliability/idempotency/':
		'once, inbox, idempotency, idempotency-key, duplicate, identity, retention, retry, exactly once',
	'/userspace/reliability/tasks/':
		'task, background, queue, async, task true, local, remote, deadline, refusal',
	'/userspace/reliability/continuity/':
		'continuity, resume, effect, steps, saga, workflow, context.now, context.id, context.random, journal',
	'/userspace/reliability/call-chains/':
		'cycle, loop, chain, trail, unchained, readonly, safe, GET, LoopException, SafetyException, io:readonly',

	'/userspace/flow/pulses/':
		'cadence, pulse, cycle, intervals, scope, replica, group, periodic, sweep, atomicity',
	'/userspace/flow/schedules/':
		'cadence, schedule, cron, zone, overdue, at, region, calendar, timezone',
	'/userspace/flow/delays/':
		'cadence, delay, context.delay, cancel, interval, overdue, unchained, discreteness, regions, redis',
	'/userspace/flow/collection-streams/':
		'stream, scope, token, window, limit, stop, removed, entry, images, migration, replica set, sync',
	'/userspace/flow/streamed-calls/':
		'stream, streamed reply, streamed input, generator, readable, http binding, unreachable, upload',
	'/userspace/flow/stateful/':
		'stateful, instance, state, process memory, addressee, abandoned, timeout, signal, TOA_INSTANCE, addressed',

	'/userspace/gateway/exposing/':
		'exposition, gateway, http, route, authorities, mount, trailing slash, context routes, anonymous, io:output',
	'/userspace/gateway/routes/':
		'resource tree, routes, route variables, wildcard, forwarding, isolated, intermediate node, directives, inheritance, shortcuts, yaml anchors',
	'/userspace/gateway/methods/':
		'methods, GET, POST, PUT, PATCH, DELETE, HEAD, endpoint, input, query, readonly, io:readonly, status, 422, idempotency-key, once',
	'/userspace/gateway/queries/':
		'query, criteria, rsql, sort, omit, limit, range, search, projection, parameters, id, token, stop, pagination',
	'/userspace/gateway/protocol/':
		'content negotiation, json, yaml, msgpack, form, status codes, errors, debug, ray, traceparent, tracing, server-timing, multipart, ACK, FIN, cors, preflight, 503',
	'/userspace/gateway/io/':
		'io:output, io:input, io:status, io:throttle, output permissions, input permissions, throttling, rate limit, 429, retry-after, 204',
	'/userspace/gateway/mapping/':
		'map:headers, map:segments, map:language, map:languages, map:authority, map:claims, map:buffer, require:header, require:headers, authority, accept-language, webhook, vary',
	'/userspace/gateway/caching/':
		'cache:control, cache:exact, cache-control, private, no-store, vary, etag, if-none-match, 304, if-match, version, 412, optimistic concurrency',
	'/userspace/gateway/streams/':
		'reply stream, collection stream, token, entry, removed, stop, flow:compose, flow:fetch, map:stream, produces, accept, limit, map:instance, stateful, 410, 504',
	'/userspace/gateway/storages/':
		'storages, blob, entry, checksum, put, get, head, delete, provider, fs, tmp, s3, spaces, cloudinary, transformations, variants, secrets, toa conceal, toa npm',
	'/userspace/gateway/files/':
		'octets, octets:context, octets:put, octets:get, octets:head, octets:delete, octets:workflow, upload, download, location, accept, limit, trust, content-id, content-attributes, content-location, workflow, task, 413, 415',
	'/userspace/gateway/workflows/':
		'workflow, octets:put, octets:delete, octets:workflow, step, unit, task, multipart, flow:compose, storage, entry, 201, 202',
	'/userspace/gateway/realtime/':
		'realtime, realtime:stream, key, expose, literal key, events, sync, token, heartbeat, reconnect, stream, redis, expire, push',
	'/userspace/gateway/procedures/':
		'json-rpc, rpc, procedure, /.rpc, batch, notification, params, error codes, -32001, names',
	'/userspace/gateway/tools/':
		'mcp, model context protocol, mcp:tool, tools, /.mcp, instructions, anonymous, origins, hosts, manifest, icons, oauth, readOnlyHint, tools/list, tools/call',
	'/userspace/gateway/discovery/':
		'discovery, introspection, OPTIONS, /.discovery, help:node, help:method, help:route, help:query, schema, selection, allow, title, description',
	'/userspace/gateway/running/':
		'toa mono, toa compose, toa serve, port 8000, authorities, ingress, class, annotations, resources, protocol, h2c, probe, /.ready, ip, censor, 451, dev:stub, dev:sleep, dev:faulty, dev:throw, debug',

	'/userspace/identity/identities/':
		'identity, sign in, sign up, sign out, transient identity, auth:incept, auth:assert, inception, echo',
	'/userspace/identity/credentials/':
		'authorization header, Basic, password, username, pepper, principal, credentials, bouncer, 401, 429',
	'/userspace/identity/tokens/':
		'Token, refresh, lifetime, toa key, key rotation, revocation, custom token, scopes, permissions, identity.keys',
	'/userspace/identity/federation/':
		'OIDC, OpenID Connect, Bearer, id_token, trust, issuer, audience, authorization code, map:claims, Google, Apple',
	'/userspace/identity/passwordless/':
		'OTP, one-time password, passwordless, passkey, WebAuthn, challenge, identity.otp.issue',
	'/userspace/identity/access/':
		'authorization, auth directives, auth:id, auth:role, auth:rule, auth:claims, auth:scheme, auth:input, auth:delegate, 401, 403',
	'/userspace/identity/roles/':
		'roles, scopes, hierarchy, delegation, grant, revoke, principal, system role, ban',
	'/userspace/identity/authorities/':
		'authorities, host, domain, map:authority, ip, client address, censor, 451, require:header',
	'/userspace/identity/oauth/':
		'OAuth 2.1, authorization server, consent, PKCE, dynamic client registration, access token, audience, grants, MCP',
	'/userspace/identity/reference/':
		'reference, routes, configuration, annotation, secrets, status codes',

	'/userspace/services/extensions/':
		'extensions, aspects, annotations, manifest key, context annotation, @environment, shortcuts, predefined extensions, ports',
	'/userspace/services/configuration/':
		'configuration, schema, defaults, context.configuration, secrets, format secret, unwrap, toa conceal, TOA_CONFIGURATION, toa serve configuration',
	'/userspace/services/configuration-values/':
		'configuration values, runtime configuration, reset, epoch, revision, originator, system:configuration, /.configuration, configuration.values.created',
	'/userspace/services/fetch/':
		'fetch, context.fetch, HTTP client, external API, retry, attempts, Retry-After, toa.fetch',
	'/userspace/services/stash-and-state/':
		'stash, cache, redis, ioredis, store, fetch, context.stash, state, context.state, process memory',
	'/userspace/services/shared-decisions/':
		'atomicity, context.atom, lock, slots, partitioning, onassigned, meter, rate limit, redlock, replicas',
	'/userspace/services/logs/':
		'logs, context.logs, severity, level, trace_id, console exporter, otlp, Loki, Process failed, structured logging',
	'/userspace/services/traces/':
		'traces, spans, context.span, sampling, sample, rate, traceparent, Tempo, TOA_BOOT_TRACE',
	'/userspace/services/metrics/':
		'metrics, context.metrics, counter, gauge, histogram, labels, buckets, cardinality, UNDECLARED, toa.operation.duration, Prometheus',
	'/userspace/services/exporting-telemetry/':
		'telemetry, OTLP, exporters, endpoint, cooldown, headers, readiness probe, /.ready, Grafana, Tempo, Loki, Prometheus, trace to logs',
	'/userspace/services/introspection/':
		'introspection, topology, nodes, edges, /.introspection, system:introspection, interval, threshold',
	'/userspace/services/connectors/':
		'connectors, storage, mongodb, replica set, images, storage null, bindings, amqp, sources, http binding, bridge, bash',
	'/userspace/services/addresses-and-credentials/':
		'pointer, addresses, URL, credentials, secrets, toa conceal, toa export secrets, default namespace, shards',
	'/userspace/services/own-extensions/':
		'custom extension, Factory, aspect, context.aspects, tenant, service, resident, pause, custom storage, definition.js',

	'/userspace/running/context/':
		'context.toa.yaml, name, version, runtime, registry, annotations, shortcuts, amqp, mongodb, events, atomicity, outbox, inbox, addressed',
	'/userspace/running/environments/':
		'environment, @env, suffix, toa env, local, .env, --dev, --interactive, chain, staging:production, TOA_ENV',
	'/userspace/running/compositions/':
		'compositions, replicas, resources, cpu, memory, services, ports, evicted, mono, TOA_SERVICES, base image',
	'/userspace/running/contracts/':
		'contracts, map, .map.json, toa map, version, files, ignore, rolling upgrade, compatibility, foreign events',
	'/userspace/running/testing/':
		'testing, stage, userland, component, composition, remote, invoke, shutdown, integration tests, --kill, --dock',
	'/userspace/running/cli/':
		'cli, toa, env, map, npm, compose, mono, serve, call, types, export, build, push, deploy, conceal, reveal, key, shell',
	'/userspace/running/deployment/':
		'deployment, toa deploy, kubernetes, helm, rollout, probes, ingress, migrations, mono, --wait, --dry, namespace',
	'/userspace/running/images/':
		'images, registry, docker, tags, platforms, credentials, base image, build, run, arguments, published, toa build, toa push',
	'/userspace/running/secrets/':
		'secrets, variables, toa conceal, toa reveal, toa export secrets, credentials, pointer, addresses, .env, username, password',
	'/userspace/running/regions/':
		'regions, convergence, priority, rank, federation, toa export convergence, context.region, REGION, multi-region, conflicts',
	'/userspace/running/halt/':
		'halt, quiescence, introspection, signals, pause, resume, maintenance, 503, retry-after, system:halt',
	'/userspace/running/operating/':
		'operating, operations, parked, dead letter, outbox, toa shell, rollback, logs, labels, TOA_SUFFIX, alerts'
};
