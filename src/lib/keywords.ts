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
		'transactional outbox, committed events, at-least-once delivery, unordered events, recovery',
	'/model/reliability/inbox/':
		'transactional inbox, once, idempotency, call identity, repeated calls, deduplication',
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
		'Toa, userspace, building applications, guide, components, operations, API, testing, deployment, patterns',

	'/userspace/start/application/':
		'toa create, npx, Node.js, Docker, PM2, npm install, npm run dock, npm run env, npm start, sys, app, gateway, hello, notes, npm run restart, npm stop, pm2 logs, context.toa.yaml, ecosystem.config.js, docker-compose',
	'/userspace/start/component/':
		'component, manifest.toa.yaml, entity, blank, namespace, transit, forward, transition, concurrency, query, errors, toa export manifest, toa call, CodedError, RequestContractException, State',
	'/userspace/start/running/':
		'operation, computation, TypeScript, npm run restart, toa call, npx toa, manifest.toa.yaml, input, output, entity, blank, observe, enumerate, transit, assign, terminate, forward, query, criteria, toa types, toa env, toa map, .env, .map.json, RequestContractException',
	'/userspace/start/api/':
		'exposition, gateway, route, io:output, anonymous, sys, port 8000, curl, accept, content-type, 422, 400, 401, 404, trailing slash',
	'/userspace/start/testing/':
		'test, cucumber, gherkin, feature, scenario, stage, @toa.io/userland, @toa.io/agent, compose, remote, invoke, shutdown, npm run sys, pm2 stop app, captures, ${{ }}, #{{ }}, responseIncludes, pipeline',
	'/userspace/start/configuration/':
		'configuration, schema, defaults, context.configuration, limit, @environment, @local, toa env, staging, secret, LIMIT_EXCEEDED',

	'/userspace/logic/state/':
		'manifest, entity, properties, required, blank, id, VERSION, CREATED, UPDATED, DELETED, REGION, associated, date-time, epoch-millis, storage, namespace',
	'/userspace/logic/operations/':
		'operation, transition, observation, assignment, computation, effect, unmanaged, entry, entries, changeset, scope, input, output, concurrency, retry, query, description, mount, factory',
	'/userspace/logic/errors/':
		'error, errors, code, instanceof, exception, throw, 422, 400, 404, 409, 412, 500, DISCARD, refusal',
	'/userspace/logic/calls/':
		'request, context.remote, context.local, query, criteria, rsql, sort, omit, limit, sample, projection, version, deleted, search, output, create',
	'/userspace/logic/prototype/':
		'prototype, transit, observe, enumerate, stream, assign, terminate, ensure, forward, created, updated, deleted, sync, inheritance',
	'/userspace/logic/guards/': 'guard, guards, invariant, origin, constraint, validation, 213',
	'/userspace/logic/events/':
		'event, events, condition, payload, origin, state, trailers, TRAILERS, publish, context events, subscriber',
	'/userspace/logic/receivers/':
		'receiver, receivers, request, condition, arguments, binding, source, amqp, subscribe, foreign events',
	'/userspace/logic/tasks/':
		'task, background, async, queue, null reply, context.local, context.remote, refund, deadline',
	'/userspace/logic/repeats/':
		'idempotency, once, duplicate, retry, VERSION, inbox, retention, idempotency-key, call id, charge twice',
	'/userspace/logic/external/':
		'fetch, http, provider, api key, secret, stub, retry, timeout, signal, Retry-After, toa.fetch',
	'/userspace/logic/workflows/':
		'continuity, workflow, saga, steps, resume, effect, context.now, context.id, context.random, Unrecordable',
	'/userspace/logic/schedules/':
		'cadence, pulse, schedule, cron, cycle, intervals, zone, overdue, scope replica, region, atomicity, periodic',
	'/userspace/logic/delays/':
		'delay, context.delay, cancel, interval, overdue, unchained, discreteness, timeout, reminder, expire, deadline',
	'/userspace/logic/collections/':
		'stream, collection, export, sync, token, entry, removed, limit, sort, stop, images, StateHistory, search index',
	'/userspace/logic/streams/':
		'stream, generator, Readable, streamed reply, streamed input, upload, import, http binding, Unreachable, RequestContract',
	'/userspace/logic/processes/':
		'rc, run commands, preflight, settle, ready, dispose, pause, resume, state, stateful, instance, TOA_INSTANCE, Addressee, Abandoned, addressed timeout',
	'/userspace/logic/chains/':
		'LoopException, SafetyException, cycle, loop, trail, unchained, readonly, GET, TOA_TRAIL_REPEATS, TOA_TRAIL_DEPTH, io:readonly',
	'/userspace/logic/typescript/':
		'typescript, ts, toa types, toa.d.ts, index.d.ts, Entity, State, Context, jsdoc, tsc, tsconfig, import type, enum',
	'/userspace/logic/migrations/':
		'migration, migrations, index, dropIndex, unique, partial, sparse, ttl, text, update, delete, images, backfill',
	'/userspace/logic/context/':
		'context, local, remote, id, now, random, env, name, region, instance, configuration, fetch, delay, state, stash, atom, storages, logs, span, metrics, aspects',

	'/userspace/api/exposing/':
		'exposition, route, method, io:output, anonymous, 204, 401, trailing slash, authorities, mount, context routes, endpoint',
	'/userspace/api/routes/':
		'route, variable, :id, wildcard, *, **, forwarding, intermediate, directive, inheritance, isolated, shortcut, yaml anchor, Route not found',
	'/userspace/api/methods/':
		'GET, POST, PUT, PATCH, DELETE, HEAD, endpoint, assign, input, 201, 404, 405, 422, 501, io:readonly, idempotency-key, once',
	'/userspace/api/queries/':
		'query, criteria, rsql, sort, omit, limit, range, search, projection, parameters, token, stop, 400, 410, paging, filter',
	'/userspace/api/protocol/':
		'content-type, accept, json, yaml, msgpack, form, status, 406, 422, 500, 503, debug, ray, traceparent, server-timing, multipart, ACK, FIN, heartbeat, cors, preflight, retry-after',
	'/userspace/api/io/':
		'io:output, io:input, io:status, io:throttle, io:readonly, key, requests, interval, condition, 429, retry-after, Unexpected input',
	'/userspace/api/mapping/':
		'map:headers, map:segments, map:languages, map:language, map:authority, map:claims, map:buffer, map:stream, map:instance, require:header, require:headers, accept-language, webhook, signature, vary',
	'/userspace/api/caching/':
		'cache:control, cache:exact, cache-control, max-age, private, no-store, etag, if-none-match, 304, VERSION, if-match, 412, Invalid ETag',
	'/userspace/api/streams/':
		'stream, multipart, entry, removed, token, stop, flow:compose, map:stream, accept, produces, limit, 413, 415, map:instance, stateful, 504, flow:fetch',
	'/userspace/api/storages/':
		'storages, context.storages, entry, put, head, get, delete, TYPE_MISMATCH, NOT_ACCEPTABLE, NOT_FOUND, fs, tmp, s3, spaces, cloudinary, transformations, variant, toa conceal, toa npm',
	'/userspace/api/files/':
		'octets:context, octets:put, octets:get, octets:head, octets:delete, accept, limit, location, trust, meta, content-id, content-attributes, content-location, 413, 415, range, 206, upload, download',
	'/userspace/api/workflows/':
		'workflow, octets:workflow, step, unit, task:, entry, parameters, steps, 201, 202, flow:compose, status, completed, exception',
	'/userspace/api/realtime/':
		'realtime, key, expose, realtime:stream, sync, /realtime/:id/, literal key, token, heartbeat, FIN, reconnect, streams, expire, redis, live updates',
	'/userspace/api/procedures/':
		'rpc, json-rpc, /.rpc, procedure, params, query, batch, notification, -32601, -32602, -32000, -32001, -32603, -32002, no-store',
	'/userspace/api/tools/':
		'mcp, /.mcp, mcp:tool, help:method, tools/list, tools/call, instructions, anonymous, origins, hosts, manifest, oauth, structuredContent, isError, readOnlyHint, model context protocol',
	'/userspace/api/discovery/':
		'OPTIONS, /.discovery, Allow, selection, input, output, errors, help:node, help:method, help:route, help:query, title, description, introspection',
	'/userspace/api/running/':
		'toa mono, toa serve exposition, --service, 8000, 8004, authorities, class, annotations, resources, protocol, h2c, /.ready, ip, censor, 451, debug, dev:stub, dev:sleep, dev:faulty, dev:throw',

	'/userspace/access/identities/':
		'identity, sign up, sign in, auth:incept, auth:assert, auth:delegate, auth:id, GET /identity/, POST /identity/, Basic, Token, transient identity, guest, account, 401, 403',
	'/userspace/access/credentials/':
		'password, username, identity.basic, INVALID_PASSWORD, INVALID_USERNAME, EXISTS, PRINCIPAL_LOCKED, principal, pepper, rounds, bouncer, 429, retry-after, credentials, schemes, Basic, Bearer, Code, OTP',
	'/userspace/access/tokens/':
		'token, authorization header, lifetime, refresh, identity.tokens, keys, toa key, rotation, paseto, custom token, scopes, permissions, INACCESSIBLE_SCOPE, kid, revoke, sign out, cache.ttl',
	'/userspace/access/federation/':
		'federation, OpenID Connect, OIDC, Google, Apple, id_token, Bearer, Code, identity.federation, trust, iss, aud, sub, assert, secret, signature, map:claims, principal, TRUST, NOT_FOUND',
	'/userspace/access/passwordless/':
		'OTP, one-time password, code, email, identity.otp.issue, map:authority, map:segments, lifetime, attempts, passkey, WebAuthn, challenge, navigator.credentials, origin, residence, verification, FAILED, MISS',
	'/userspace/access/access/':
		'access, authorization, auth:id, auth:anonymous, auth:anyone, auth:role, auth:rule, auth:input, auth:scheme, auth:delegate, auth:claims, auth:echo, owner, 401, 403, isolated, inheritance, private, protected',
	'/userspace/access/roles/':
		'role, staff, admin, auth:role, principal, system, grant, revoke, delegation, system:identity:roles, INACCESSIBLE_SCOPE, hierarchy, scope, ban, PUT /identity/bans/, refresh',
	'/userspace/access/authorities/':
		'authority, authorities, domain, host, map:authority, ip, client address, x-forwarded-for, bouncer, censor, 451, country, require:header, require:headers, if-match, 400',
	'/userspace/access/oauth/':
		'OAuth, OAuth 2.1, authorization server, consent, PKCE, client, registration, client_id, identity.clients, identity.grants, code, access token, Bearer, scope, resource, audience, MCP, AI, well-known, invalid_grant',
	'/userspace/access/reference/':
		'reference, /identity/, resources, directives, annotation, configuration, secrets, statuses, 401, 403, 409, 422, 429, 451, system roles',

	'/userspace/platform/extensions/':
		'extension, aspect, annotation, manifest key, context.toa.yaml, @environment, extensions, annotations, ports',
	'/userspace/platform/configuration/':
		'configuration, secret, format secret, unwrap, REDACTED, toa conceal, defaults, schema, TOA_CONFIGURATION, toa serve configuration',
	'/userspace/platform/configuration-values/':
		'configuration.values, runtime configuration, epoch, revision, reset, originator, system:configuration:get, system:configuration:create, /.configuration/',
	'/userspace/platform/stash/':
		'stash, cache, redis, context.stash, ioredis, store, fetch, multi, pipeline, expiry',
	'/userspace/platform/shared-decisions/':
		'context.atom, atomicity, lock, slots, onassigned, meter, rate limit, replicas, partitioning, AbortSignal',
	'/userspace/platform/logs/':
		'logs, context.logs, debug, info, warn, error, level, trace_id, console, otlp, loki, Process failed',
	'/userspace/platform/traces/':
		'traces, span, context.span, trace_id, traceparent, sample, rate, tempo, otlp, TOA_BOOT_TRACE',
	'/userspace/platform/metrics/':
		'metrics, context.metrics, counter, histogram, gauge, labels, UNDECLARED, buckets, interval, prometheus, toa.operation.duration',
	'/userspace/platform/exporting-telemetry/':
		'telemetry, otlp, exporter, endpoint, headers, cooldown, timeout, grafana, tempo, loki, prometheus, readiness, /.ready',
	'/userspace/platform/introspection/':
		'introspection, topology, nodes, edges, graph, system:introspection, /.introspection/, interval, threshold, ui',
	'/userspace/platform/connectors/':
		'connectors, storage, binding, bridge, mongodb, amqp, http, bash, replica set, images, sources, storage null',
	'/userspace/platform/addresses-and-credentials/':
		'addresses, credentials, pointer, mongodb, amqp, stash, secrets, toa conceal, toa export secrets, toa env, username, password',
	'/userspace/platform/own-extensions/':
		'own extension, Factory, aspect, context.aspects, Connector, deployment, manifest, tenant, service, resident, pause, definition.js',

	'/userspace/shipping/context/':
		'context, context.toa.yaml, name, version, registry, runtime, amqp, mongodb, annotations, addresses, events, atomicity, outbox, inbox',
	'/userspace/shipping/environments/':
		'environment, suffix, local, staging, production, toa env, chain, derived, TOA_ENV, context.env',
	'/userspace/shipping/compositions/':
		'compositions, replicas, resources, cpu, memory, services, ports, evicted, mono, base image, TOA_SERVICES',
	'/userspace/shipping/deployment/':
		'deploy, toa deploy, kubernetes, helm, kubectl, namespace, wait, dry, ingress, hosts, labels, mono, pipeline, rollout',
	'/userspace/shipping/images/':
		'images, registry, docker, toa build, toa push, tags, platforms, credentials, base image, build, run, arguments, npm, published, retention',
	'/userspace/shipping/secrets/':
		'secrets, toa export secrets, toa conceal, toa reveal, credentials, username, password, .env, dev, interactive, configuration secrets',
	'/userspace/shipping/upgrades/':
		'release, upgrade, rolling update, contract, compatibility, toa map, .map.json, version, files, ignore, migrations, rollback, evicted',
	'/userspace/shipping/regions/':
		'regions, convergence, priority, rank, federation, toa export convergence, replica set, context.region, REGION, unique index',
	'/userspace/shipping/halt/':
		'halt, maintenance, introspection, signals, seconds, quiescence, grace, system:halt, pause, resume, preflight, 503, retry-after',
	'/userspace/shipping/operating/':
		'operating, troubleshooting, kubectl, logs, Process failed, parked, comq.parked, AMQP message discarded, outbox, unpublished events, rollback, toa shell, TOA_SUFFIX, alerts',
	'/userspace/shipping/cli/':
		'cli, toa, env, map, npm, compose, mono, serve, call, types, export, build, push, deploy, conceal, reveal, key, shell',

	'/userspace/patterns/call-event-task/':
		'call, event, task, receiver, synchronous, asynchronous, eventual consistency, at least once, decision, consequence, webhook, coupling',
	'/userspace/patterns/reply-first/':
		'background, slow, long-running, own event, receiver, assign, realtime, sync, progress, failure, invoice, pending',
	'/userspace/patterns/events/':
		'event design, condition, origin, state, edge, trailers, payload, contract, receiver, request, updated, sync, loop, subscriber',
	'/userspace/patterns/repeats/':
		'idempotent, duplicate, repeat, redelivery, at least once, once, idempotency-key, DISCARD, natural key, associated, charge twice, dedupe',
	'/userspace/patterns/concurrency/':
		'race, concurrency, retry, compare-and-set, double spend, lost update, version, if-match, 409, 412, lock, stock, oversell',
	'/userspace/patterns/order/':
		'order, ordering, out of order, VERSION, stale, obsolete, signal, re-read, monotonic, copy, late event',
	'/userspace/patterns/refusing/':
		'error, refusal, exception, guard, schema, DISCARD, 422, 400, 403, 404, 500, validation, invariant, receiver, task',
	'/userspace/patterns/ownership/':
		'ownership, owner, copy, mirror, read model, eventual consistency, snapshot, associated, blank, counter, limit, quota, voucher, OBSOLETE',
	'/userspace/patterns/associated/':
		'associated, blank, entity, customer id, wallet, loyalty, accounts, sign-up, no creation, VERSION 0, StateNotFoundException, auth:id, namespace',
	'/userspace/patterns/processes/':
		'saga, process, steps, status, compensation, refund, rollback, orchestration, choreography, report back, forward, cancelled, workflow',
	'/userspace/patterns/reservations/':
		'reservation, hold, release, settle, charge, held, balance, double spend, ref, key, idempotent, compensation, guard, stock, overspend',
	'/userspace/patterns/time/':
		'time, expiry, deadline, timeout, pulse, sweep, cadence, delay, schedule, reconcile, watchdog, monthly, allowance, grace period, cron, timer',
	'/userspace/patterns/gateways/':
		'gateway, external service, payment provider, api key, secret, stub, UNAVAILABLE, context.fetch, metadata, composition, anti-corruption',
	'/userspace/patterns/webhooks/':
		'webhook, notification, signature, map:buffer, anonymous, duplicate, retry for days, natural key, associated, origin null, once, deduplicate',
	'/userspace/patterns/mirrors/':
		'mirror, subscription, membership, signal, merge, out of order, re-read, timestamp, OBSOLETE, sync, expires, eventual consistency',
	'/userspace/patterns/wallet/':
		'wallet, balance, ledger, double spend, once, concurrency, guard, trailers, VERSION, unique index, entity, minor units, refund, audit',
	'/userspace/patterns/payments/':
		'payment, checkout, top-up, redirect url, webhook, confirmation, reconciliation, pulse, exactly once, idempotent, realtime, receipt, refund'
};
