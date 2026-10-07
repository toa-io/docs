import type { ButtonProps } from '#lib/components/ui/button/index.js';

export interface Props extends ButtonProps {
	text: Retriever;
	/** @default undefined */
	label?: string;
	oncopy?: () => void;
}

export type Retriever = (() => Promise<string>) | string;
