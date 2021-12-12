import { User } from 'firebase/auth';
import { createGlobalState } from 'react-hooks-global-state';

type Store = {
    user: User | null | undefined;
};

export const { useGlobalState } = createGlobalState<Store>({
    user: undefined,
});
