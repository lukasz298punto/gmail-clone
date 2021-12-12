import { render } from '@testing-library/react';
import { PrivateRoute } from '..';

it('renders app', () => {
    render(
        <PrivateRoute>
            <div>test test</div>
        </PrivateRoute>
    );
});
