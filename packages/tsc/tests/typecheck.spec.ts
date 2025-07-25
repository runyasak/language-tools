import * as path from 'node:path';
import { describe, expect, test } from 'vitest';
import { run } from '..';

describe(`vue-tsc`, () => {
	test(`TypeScript - Stable`, () => {
		expect(
			getTscOutput().sort(),
		).toMatchInlineSnapshot(`
			[
			  "test-workspace/tsc/failureFixtures/#3632/both.vue(3,1): error TS1109: Expression expected.",
			  "test-workspace/tsc/failureFixtures/#3632/both.vue(7,1): error TS1109: Expression expected.",
			  "test-workspace/tsc/failureFixtures/#3632/script.vue(3,1): error TS1109: Expression expected.",
			  "test-workspace/tsc/failureFixtures/#3632/scriptSetup.vue(3,1): error TS1109: Expression expected.",
			  "test-workspace/tsc/failureFixtures/#5071/withScript.vue(1,19): error TS1005: ';' expected.",
			  "test-workspace/tsc/failureFixtures/#5071/withoutScript.vue(2,26): error TS1005: ';' expected.",
			  "test-workspace/tsc/failureFixtures/directives/main.vue(12,2): error TS2578: Unused '@ts-expect-error' directive.",
			  "test-workspace/tsc/failureFixtures/directives/main.vue(4,6): error TS2339: Property 'notExist' does not exist on type 'CreateComponentPublicInstanceWithMixins<Readonly<{} & {} & {}>, { exist: {}; }, {}, {}, {}, {}, {}, {}, PublicProps, {}, true, {}, {}, GlobalComponents, GlobalDirectives, ... 12 more ..., {}>'.",
			  "test-workspace/tsc/failureFixtures/directives/main.vue(9,6): error TS2339: Property 'notExist' does not exist on type 'CreateComponentPublicInstanceWithMixins<Readonly<{} & {} & {}>, { exist: {}; }, {}, {}, {}, {}, {}, {}, PublicProps, {}, true, {}, {}, GlobalComponents, GlobalDirectives, ... 12 more ..., {}>'.",
			]
		`);
	});
});

function getTscOutput() {
	const consoleOutput: string[] = [];
	const originalConsoleLog = process.stdout.write;
	const originalArgv = process.argv;
	process.stdout.write = output => {
		consoleOutput.push(String(output).trim());
		return true;
	};
	process.argv = [
		...originalArgv,
		'--build',
		path.resolve(__dirname, '../../../test-workspace/tsc'),
		'--pretty',
		'false',
	];
	try {
		const tscPath = require.resolve(
			`typescript/lib/tsc`,
			{ paths: [path.resolve(__dirname, '../../../test-workspace')] },
		);
		run(tscPath);
	}
	catch {}
	process.stdout.write = originalConsoleLog;
	process.argv = originalArgv;
	return consoleOutput;
}
