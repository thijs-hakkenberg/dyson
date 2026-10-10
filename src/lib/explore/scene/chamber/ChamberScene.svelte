<script lang="ts">
	/** Deliberation Chamber: replays one discussion round by round. */
	import { T, useTask } from '@threlte/core';
	import { CameraControls, interactivity, type CameraControlsRef } from '@threlte/extras';
	import {
		AdditiveBlending,
		CatmullRomCurve3,
		DoubleSide,
		MeshBasicMaterial,
		TubeGeometry,
		Vector3,
		type Group
	} from 'three';
	import WbLabel from '../workbench/WbLabel.svelte';
	import MilkyWay from '../MilkyWay.svelte';
	import { explorer } from '../../core/state.svelte';
	import { delib } from '../../core/delibstore.svelte';
	import {
		ROUND_HEIGHT,
		SEAT_RADIUS,
		VOTE_COLORS,
		familyOf,
		roundScores,
		roundVotes,
		seatPosition
	} from '../../core/deliberation';
	import { MODEL_COLORS } from '../../core/theme';
	import { DISCUSSION_MODELS, MODEL_DISPLAY_NAMES, type DiscussionModelId } from '$lib/types/discussion';

	interactivity();

	const thread = $derived(delib.thread);
	const rounds = $derived(thread?.rounds ?? []);
	const shown = $derived(Math.min(explorer.delibRound, rounds.length));
	const concluded = $derived(!!thread && explorer.delibRound > rounds.length && thread.status === 'concluded');
	const pick = (id: string) => (explorer.delibPick = explorer.delibPick === id ? null : id);

	const v = (p: [number, number, number]) => new Vector3(p[0], p[1], p[2]);

	/** Vote arc between two seats on a round's layer, bowing toward the centre and up. */
	function arcGeo(voter: DiscussionModelId, target: DiscussionModelId, round: number, k: number) {
		const a = v(seatPosition(voter, round - 1)).add(new Vector3(0, 0.8, 0));
		const b = v(seatPosition(target, round - 1)).add(new Vector3(0, 0.8, 0));
		const mid = a.clone().lerp(b, 0.5).multiplyScalar(0.35 + 0.08 * k);
		mid.y = (round - 1) * ROUND_HEIGHT + 1.6 + 0.25 * k;
		return new TubeGeometry(new CatmullRomCurve3([a, mid, b]), 32, 0.045, 6);
	}

	const roundArcs = $derived(
		rounds.slice(0, shown).map((r) => {
			const votes = roundVotes(r).map((a, k) => ({ a, geo: a.self ? null : arcGeo(a.voter, a.target, r.roundNumber, k % 3) }));
			return { r, votes, scores: roundScores(r, thread?.config?.selfVoteWeight ?? 0.5) };
		})
	);
	const maxWords = $derived(Math.max(1, ...rounds.flatMap((r) => r.responses.map((x) => x.wordCount || x.content.split(/\s+/).length))));
	const words = (x: { wordCount: number; content: string }) => x.wordCount || x.content.split(/\s+/).length;

	// ── Camera ────────────────────────────────────────────────────────────
	let controls = $state.raw<CameraControlsRef>();
	let framedFor = '';
	$effect(() => {
		const slug = explorer.delibSlug ?? '';
		if (!controls || framedFor === slug) return;
		framedFor = slug;
		controls.minDistance = 4;
		controls.maxDistance = 120;
		controls.smoothTime = 0.6;
		controls.setLookAt(0, 26, 40, 0, 2, 0, false);
		controls.setLookAt(0, 9, 21, 0, 1.5, 0, true);
	});
	// Keep the active round in view
	$effect(() => {
		const y = (Math.min(explorer.delibRound, Math.max(1, rounds.length)) - 1) * ROUND_HEIGHT;
		controls?.setTarget(0, y + 1, 0, true);
	});

	let crystal = $state.raw<Group>();
	let grow = 0;
	useTask((dt) => {
		if (crystal) {
			grow = concluded ? Math.min(1, grow + dt * 0.8) : Math.max(0, grow - dt * 2);
			crystal.scale.setScalar(0.001 + grow);
			crystal.rotation.y += dt * 0.4;
		}
	});
	const arcMat = (vote: keyof typeof VOTE_COLORS, faded: boolean) =>
		new MeshBasicMaterial({ color: VOTE_COLORS[vote], transparent: true, opacity: faded ? 0.12 : 0.85, depthWrite: false });
</script>

<T.PerspectiveCamera makeDefault fov={45} near={0.05} far={1000}>
	<CameraControls bind:ref={controls} />
</T.PerspectiveCamera>

{#if explorer.layers.sky}<MilkyWay intensity={0.18} />{/if}
<T.AmbientLight intensity={0.6} />
<T.PointLight position={[0, 14, 0]} intensity={300} decay={1.4} />

<!-- Chamber floor -->
<T.Mesh rotation.x={-Math.PI / 2} position.y={-0.05}>
	<T.RingGeometry args={[SEAT_RADIUS - 0.4, SEAT_RADIUS + 0.4, 96]} />
	<T.MeshBasicMaterial color="#1e3a5f" transparent opacity={0.6} side={DoubleSide} />
</T.Mesh>
<T.GridHelper args={[30, 30, '#16304d', '#0c1d30']} position.y={-0.06} />

{#if thread}
	<!-- Round layers -->
	{#each rounds as r, i (r.roundNumber)}
		{@const active = i + 1 === explorer.delibRound}
		<T.Mesh rotation.x={-Math.PI / 2} position.y={i * ROUND_HEIGHT}>
			<T.CircleGeometry args={[SEAT_RADIUS + 1.2, 96]} />
			<T.MeshBasicMaterial
				color="#7dd3fc"
				transparent
				opacity={i < shown ? (active ? 0.06 : 0.025) : 0.008}
				side={DoubleSide}
				depthWrite={false}
			/>
		</T.Mesh>
		<T.Group position={[-(SEAT_RADIUS + 1.6), i * ROUND_HEIGHT, 0]}>
			<WbLabel
				id="round:{r.roundNumber}"
				label="Round {r.roundNumber}"
				sub={i < shown ? `winner ${MODEL_DISPLAY_NAMES[r.winnerId] ?? r.winnerId}` : ''}
				color={active ? '#ffffff' : '#64748b'}
				selected={active}
				onpick={() => (explorer.delibRound = r.roundNumber)}
			/>
		</T.Group>
	{/each}

	<!-- Seats -->
	{#each DISCUSSION_MODELS as m (m)}
		{@const p = seatPosition(m, 0)}
		{@const c = MODEL_COLORS[familyOf(m)]}
		<T.Group position={p}>
			<T.Mesh position.y={0.6}>
				<T.SphereGeometry args={[0.55, 32, 16]} />
				<T.MeshStandardMaterial color={c} emissive={c} emissiveIntensity={0.4} roughness={0.35} />
			</T.Mesh>
			<T.Mesh rotation.x={-Math.PI / 2} position.y={0.02}>
				<T.RingGeometry args={[0.8, 0.95, 48]} />
				<T.MeshBasicMaterial color={c} side={DoubleSide} />
			</T.Mesh>
			<T.Group position.y={-0.6}>
				<WbLabel id="seat:{m}" label={MODEL_DISPLAY_NAMES[m]} color={c} selected={false} onpick={() => {}} />
			</T.Group>
		</T.Group>
		<!-- Seat column through all shown rounds -->
		{#if shown > 1}
			<T.Mesh position={[p[0], ((shown - 1) * ROUND_HEIGHT) / 2 + 0.6, p[2]]}>
				<T.CylinderGeometry args={[0.03, 0.03, (shown - 1) * ROUND_HEIGHT, 6]} />
				<T.MeshBasicMaterial color={c} transparent opacity={0.4} />
			</T.Mesh>
		{/if}
	{/each}

	<!-- Responses, votes, winners, termination votes per shown round -->
	{#each roundArcs as ra (ra.r.roundNumber)}
		{@const i = ra.r.roundNumber - 1}
		{@const active = ra.r.roundNumber === explorer.delibRound}
		{#each ra.r.responses as resp (resp.modelId)}
			{@const p = seatPosition(resp.modelId, i)}
			{@const h = 0.4 + 1.6 * (words(resp) / maxWords)}
			{@const c = MODEL_COLORS[familyOf(resp.modelId)]}
			<T.Mesh
				position={[p[0] * 0.82, p[1] + h / 2 + 0.2, p[2] * 0.82]}
				onclick={(e: { stopPropagation: () => void }) => {
					e.stopPropagation();
					explorer.delibRound = ra.r.roundNumber;
					pick(`resp:${ra.r.roundNumber}:${resp.modelId}`);
				}}
			>
				<T.BoxGeometry args={[0.35, h, 0.35]} />
				<T.MeshBasicMaterial color={c} transparent opacity={active ? 0.9 : 0.3} blending={AdditiveBlending} depthWrite={false} />
			</T.Mesh>
			{#if ra.r.winnerId === resp.modelId}
				<T.Mesh position={[p[0], p[1] + 1.6, p[2]]} rotation.x={Math.PI / 2}>
					<T.TorusGeometry args={[0.55, 0.06, 8, 32]} />
					<T.MeshBasicMaterial color="#fde68a" transparent opacity={active ? 1 : 0.35} />
				</T.Mesh>
			{/if}
			{@const tv = ra.r.terminationVotes?.find((x) => x.modelId === resp.modelId)}
			{#if tv}
				<T.Mesh position={[p[0] * 1.12, p[1] + 0.35, p[2] * 1.12]}>
					<T.OctahedronGeometry args={[0.16]} />
					<T.MeshBasicMaterial color={tv.vote === 'CONCLUDE' ? '#34d399' : '#64748b'} transparent opacity={active ? 1 : 0.4} />
				</T.Mesh>
			{/if}
			{#if active}
				<T.Group position={[p[0] * 0.82, p[1] + h + 0.5, p[2] * 0.82]}>
					<WbLabel
						id="resp:{ra.r.roundNumber}:{resp.modelId}"
						label="{(ra.scores[resp.modelId] ?? 0).toFixed(1)} pts"
						sub="{words(resp)} words{tv ? ` · ${tv.vote.toLowerCase()}` : ''}"
						color={c}
						selected={explorer.delibPick === `resp:${ra.r.roundNumber}:${resp.modelId}`}
						onpick={() => pick(`resp:${ra.r.roundNumber}:${resp.modelId}`)}
					/>
				</T.Group>
			{/if}
		{/each}
		{#each ra.votes as { a, geo } (a.id)}
			{#if geo}
				<T.Mesh
					geometry={geo}
					material={arcMat(a.vote, !active)}
					onclick={(e: { stopPropagation: () => void }) => {
						e.stopPropagation();
						explorer.delibRound = ra.r.roundNumber;
						pick(`vote:${a.id}`);
					}}
				/>
			{:else}
				{@const p = seatPosition(a.voter, i)}
				<T.Mesh position={[p[0], p[1] + 1.15, p[2]]} rotation.x={Math.PI / 2}>
					<T.TorusGeometry args={[0.8, 0.03, 6, 40]} />
					<T.MeshBasicMaterial color={VOTE_COLORS[a.vote]} transparent opacity={active ? 0.7 : 0.15} />
				</T.Mesh>
			{/if}
		{/each}
	{/each}

	<!-- Conclusion crystal -->
	<T.Group bind:ref={crystal} position={[0, Math.max(0, rounds.length - 1) * ROUND_HEIGHT + 2.6, 0]}>
		<T.Mesh
			onclick={(e: { stopPropagation: () => void }) => {
				e.stopPropagation();
				pick('conclusion');
			}}
		>
			<T.IcosahedronGeometry args={[1.1, 0]} />
			<T.MeshStandardMaterial color="#e0f2fe" emissive="#7dd3fc" emissiveIntensity={0.6} flatShading roughness={0.2} transparent opacity={0.9} />
		</T.Mesh>
		<T.Mesh>
			<T.IcosahedronGeometry args={[1.5, 1]} />
			<T.MeshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.3} />
		</T.Mesh>
	</T.Group>
	{#if concluded}
		<T.Group position={[0, Math.max(0, rounds.length - 1) * ROUND_HEIGHT + 4.4, 0]}>
			<WbLabel
				id="conclusion"
				label="Conclusion"
				sub={thread.terminationReason ?? ''}
				color="#e0f2fe"
				selected={explorer.delibPick === 'conclusion'}
				onpick={() => pick('conclusion')}
			/>
		</T.Group>
	{/if}
{/if}
