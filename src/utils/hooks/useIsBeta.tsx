import { getStage } from '../environment';

export function useIsBeta(): boolean {
	return getStage() === 'beta';
}
